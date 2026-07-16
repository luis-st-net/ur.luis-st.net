"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { sha256 } from "@/lib/hash";
import { normalizePdfFileName } from "@/lib/utility";
import { parseBibtex, type ParsedSource } from "@/lib/bibtex";

function str(formData: FormData, key: string): string {
	const value = formData.get(key);
	return typeof value === "string" ? value : "";
}

function fileOrNull(formData: FormData, key: string): File | null {
	const value = formData.get(key);
	if (value instanceof File && value.size > 0) {
		return value;
	}
	return null;
}

async function fileToBuffer(file: File): Promise<Uint8Array<ArrayBuffer>> {
	const buffer = await file.arrayBuffer();
	return new Uint8Array(buffer);
}

/** Reads the markdown content for a language: uploaded .md takes precedence. */
async function resolveContent(formData: FormData, code: string): Promise<string> {
	const file = fileOrNull(formData, `lang.${code}.contentFile`);
	if (file) {
		return await file.text();
	}
	return str(formData, `lang.${code}.contentText`);
}

async function resolveSources(formData: FormData, code: string): Promise<ParsedSource[] | null> {
	const file = fileOrNull(formData, `lang.${code}.bibtex`);
	if (!file) {
		return null;
	}
	const text = await file.text();
	return parseBibtex(text);
}

function sourcesToCreate(sources: ParsedSource[]) {
	return sources.map((s, index) => ({
		order: index,
		citationKey: s.citationKey,
		entryType: s.entryType,
		title: s.title ?? null,
		authors: s.authors ?? null,
		year: s.year ?? null,
		journal: s.journal ?? null,
		publisher: s.publisher ?? null,
		doi: s.doi ?? null,
		url: s.url ?? null,
		fields: s.fields,
		raw: s.raw,
	}));
}

function parseCodes(formData: FormData): string[] {
	try {
		const raw = str(formData, "languages");
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((c) => typeof c === "string") : [];
	} catch {
		return [];
	}
}

export async function createPaperAction(formData: FormData): Promise<void> {
	const codes = parseCodes(formData);
	if (codes.length === 0) {
		throw new Error("At least one language is required.");
	}
	
	const icon = fileOrNull(formData, "iconFile");
	const iconBuffer = icon ? await fileToBuffer(icon) : null;
	
	const translations = [];
	for (const code of codes) {
		const languageId = str(formData, `lang.${code}.languageId`);
		const title = str(formData, `lang.${code}.title`).trim();
		const description = str(formData, `lang.${code}.description`).trim();
		const abstract = str(formData, `lang.${code}.abstract`);
		if (!languageId || !title || !description) {
			throw new Error(`Missing required fields for language "${code}".`);
		}
		
		const pdfFile = fileOrNull(formData, `lang.${code}.pdf`);
		if (!pdfFile) {
			throw new Error(`A PDF is required for language "${code}".`);
		}
		const pdf = await fileToBuffer(pdfFile);
		const content = await resolveContent(formData, code);
		const sources = (await resolveSources(formData, code)) ?? [];
		const pdfFileNameRaw = str(formData, `lang.${code}.pdfFileName`).trim();
		
		translations.push({
			language: { connect: { id: languageId } },
			title,
			description,
			abstract,
			content,
			pdf,
			pdfHash: sha256(pdf),
			pdfFileName: normalizePdfFileName(pdfFileNameRaw) || pdfFile.name || null,
			sources: { create: sourcesToCreate(sources) },
		});
	}
	
	await prisma.paper.create({
		data: {
			icon: iconBuffer,
			iconMime: icon?.type || null,
			translations: { create: translations },
		},
	});
	
	revalidatePath("/");
	revalidatePath("/admin");
	redirect("/admin");
}

export async function updatePaperAction(formData: FormData): Promise<void> {
	const paperId = str(formData, "paperId");
	if (!paperId) {
		throw new Error("Missing paper id.");
	}
	const codes = parseCodes(formData);
	if (codes.length === 0) {
		throw new Error("At least one language is required.");
	}
	
	// Shared icon: replace, remove, or leave untouched.
	const icon = fileOrNull(formData, "iconFile");
	const removeIcon = str(formData, "removeIcon") === "1";
	if (icon) {
		const buffer = await fileToBuffer(icon);
		await prisma.paper.update({
			where: { id: paperId },
			data: { icon: buffer, iconMime: icon.type || null },
		});
	} else if (removeIcon) {
		await prisma.paper.update({
			where: { id: paperId },
			data: { icon: null, iconMime: null },
		});
	}
	
	// Delete removed language variants.
	let removed: string[] = [];
	try {
		removed = JSON.parse(str(formData, "removedTranslations") || "[]");
	} catch {
		removed = [];
	}
	if (removed.length > 0) {
		await prisma.paperTranslation.deleteMany({
			where: { id: { in: removed }, paperId },
		});
	}
	
	const now = new Date();
	for (const code of codes) {
		const translationId = str(formData, `lang.${code}.translationId`);
		const languageId = str(formData, `lang.${code}.languageId`);
		const title = str(formData, `lang.${code}.title`).trim();
		const description = str(formData, `lang.${code}.description`).trim();
		const abstract = str(formData, `lang.${code}.abstract`);
		if (!languageId || !title || !description) {
			throw new Error(`Missing required fields for language "${code}".`);
		}
		
		const content = await resolveContent(formData, code);
		const newSources = await resolveSources(formData, code);
		const pdfFile = fileOrNull(formData, `lang.${code}.pdf`);
		const pdfFileNameRaw = str(formData, `lang.${code}.pdfFileName`).trim();
		const pdfFileName = pdfFileNameRaw ? normalizePdfFileName(pdfFileNameRaw) : undefined;
		
		if (translationId) {
			// Update existing variant.
			const pdfData = pdfFile
				? await (async () => {
					const pdf = await fileToBuffer(pdfFile);
					return { pdf, pdfHash: sha256(pdf), pdfFileName: pdfFileName ?? pdfFile.name ?? null };
				})()
				: pdfFileName !== undefined
					? { pdfFileName }
					: {};
			
			await prisma.paperTranslation.update({
				where: { id: translationId },
				data: {
					title,
					description,
					abstract,
					content,
					updatedAt: now,
					...pdfData,
				},
			});
			
			if (newSources) {
				await prisma.source.deleteMany({ where: { translationId } });
				if (newSources.length > 0) {
					await prisma.source.createMany({
						data: sourcesToCreate(newSources).map((s) => ({ ...s, translationId })),
					});
				}
			}
		} else {
			// New language added during edit — PDF is required.
			if (!pdfFile) {
				throw new Error(`A PDF is required for the new language "${code}".`);
			}
			const pdf = await fileToBuffer(pdfFile);
			await prisma.paperTranslation.create({
				data: {
					paperId,
					languageId,
					title,
					description,
					abstract,
					content,
					pdf,
					pdfHash: sha256(pdf),
					pdfFileName: pdfFileName ?? pdfFile.name ?? null,
					sources: { create: sourcesToCreate(newSources ?? []) },
				},
			});
		}
	}
	
	revalidatePath("/");
	revalidatePath("/admin");
	revalidatePath(`/paper/${paperId}`);
	redirect("/admin");
}

export async function deletePaperAction(formData: FormData): Promise<void> {
	const paperId = str(formData, "paperId");
	if (!paperId) {
		throw new Error("Missing paper id.");
	}
	await prisma.paper.delete({ where: { id: paperId } });
	revalidatePath("/");
	revalidatePath("/admin");
}

// ---- Language management ----

export async function createLanguageAction(formData: FormData): Promise<void> {
	const code = str(formData, "code").trim().toLowerCase();
	const name = str(formData, "name").trim();
	const translationKey = str(formData, "translationKey").trim() || code;
	if (!code || !name) {
		throw new Error("Code and name are required.");
	}
	
	const count = await prisma.language.count();
	await prisma.language.create({
		data: { code, name, translationKey, sortOrder: count },
	});
	revalidatePath("/admin/languages");
}

export async function deleteLanguageAction(formData: FormData): Promise<void> {
	const id = str(formData, "id");
	if (!id) {
		throw new Error("Missing language id.");
	}
	const inUse = await prisma.paperTranslation.count({ where: { languageId: id } });
	if (inUse > 0) {
		throw new Error("Language is in use and cannot be removed.");
	}
	await prisma.language.delete({ where: { id } });
	revalidatePath("/admin/languages");
}
