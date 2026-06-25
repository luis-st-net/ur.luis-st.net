import "server-only";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

// Binary blobs (pdf, icon) are never selected here — they are streamed through
// dedicated route handlers. These selects keep list/detail queries light.

const languageSelect = {
	id: true,
	code: true,
	name: true,
	translationKey: true,
} satisfies Prisma.LanguageSelect;

const sourceSelect = {
	id: true,
	order: true,
	citationKey: true,
	entryType: true,
	title: true,
	authors: true,
	year: true,
	journal: true,
	publisher: true,
	doi: true,
	url: true,
	fields: true,
	raw: true,
} satisfies Prisma.SourceSelect;

const translationSelect = {
	id: true,
	title: true,
	description: true,
	abstract: true,
	content: true,
	pdfHash: true,
	pdfFileName: true,
	updatedAt: true,
	createdAt: true,
	language: { select: languageSelect },
	sources: { select: sourceSelect, orderBy: { order: "asc" } },
} satisfies Prisma.PaperTranslationSelect;

const paperSelect = {
	id: true,
	iconMime: true,
	publishedAt: true,
	translations: {
		select: translationSelect,
		orderBy: { createdAt: "asc" },
	},
} satisfies Prisma.PaperSelect;

export type PaperData = Prisma.PaperGetPayload<{ select: typeof paperSelect }>;
export type TranslationData = PaperData["translations"][number];
export type SourceData = TranslationData["sources"][number];

/** All paper languages, ordered for display. */
export function getLanguages() {
	return prisma.language.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
}

/**
 * Picks the translation best matching the active website locale, falling back
 * to the first available language. Matches by translationKey, then code.
 */
export function pickTranslation(
	translations: TranslationData[],
	locale: string,
): TranslationData | undefined {
	if (translations.length === 0) {
		return undefined;
	}
	return (
		translations.find((t) => t.language.translationKey === locale) ??
		translations.find((t) => t.language.code === locale) ??
		translations[0]
	);
}

/** Loads all papers with their translations + languages (for the home page). */
export function listPapers(): Promise<PaperData[]> {
	return prisma.paper.findMany({
		orderBy: { publishedAt: "desc" },
		select: paperSelect,
	});
}

/** Loads a single paper with everything needed for the detail page. */
export function getPaper(id: string): Promise<PaperData | null> {
	return prisma.paper.findUnique({
		where: { id },
		select: paperSelect,
	});
}
