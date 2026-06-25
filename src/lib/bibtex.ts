import { type Creator, type Entry, parse } from "@retorquere/bibtex-parser";

export interface ParsedSource {
	citationKey: string;
	entryType: string;
	title?: string;
	authors?: string;
	year?: string;
	journal?: string;
	publisher?: string;
	doi?: string;
	url?: string;
	fields: Record<string, string>;
	raw: string;
}

/** Coerces a parsed bibtex field (string | string[] | creators) to a string. */
function fieldToString(value: unknown): string | undefined {
	if (value === undefined || value === null) {
		return undefined;
	}
	if (typeof value === "string") {
		return value.trim() || undefined;
	}
	if (typeof value === "number") {
		return String(value);
	}
	if (Array.isArray(value)) {
		const parts = value.map((item) => creatorOrStringToString(item)).filter(Boolean);
		return parts.length ? parts.join(", ") : undefined;
	}
	return creatorOrStringToString(value) || undefined;
}

function creatorOrStringToString(item: unknown): string {
	if (typeof item === "string") {
		return item.trim();
	}
	if (item && typeof item === "object") {
		const c = item as Creator;
		if (c.name) {
			return c.name.trim();
		}
		const parts = [c.prefix, c.firstName, c.lastName, c.suffix].filter(Boolean);
		return parts.join(" ").trim();
	}
	return "";
}

/**
 * Splits raw bibtex into per-entry source strings keyed by citation key, using
 * brace matching so nested braces are handled. Used to keep a verbatim copy of
 * each entry alongside the parsed fields.
 */
function extractRawEntries(text: string): Map<string, string> {
	const result = new Map<string, string>();
	const entryStart = /@(\w+)\s*\{\s*([^,\s}]+)\s*,/g;
	let match: RegExpExecArray | null;
	while ((match = entryStart.exec(text)) !== null) {
		const key = match[2];
		const openIndex = text.indexOf("{", match.index);
		if (openIndex === -1) {
			continue;
		}
		let depth = 0;
		let end = -1;
		for (let i = openIndex; i < text.length; i++) {
			const ch = text[i];
			if (ch === "{") {
				depth++;
			} else if (ch === "}") {
				depth--;
				if (depth === 0) {
					end = i;
					break;
				}
			}
		}
		if (end !== -1) {
			result.set(key, text.slice(match.index, end + 1).trim());
		}
	}
	return result;
}

const KNOWN_FIELDS = new Set([
	"title",
	"author",
	"year",
	"journal",
	"booktitle",
	"publisher",
	"doi",
	"url",
]);

/** Parses a bibtex string into structured sources, preserving the raw entry. */
export function parseBibtex(text: string): ParsedSource[] {
	const trimmed = text.trim();
	if (!trimmed) {
		return [];
	}
	
	let bib: { entries: Entry[] };
	try {
		bib = parse(trimmed);
	} catch {
		return [];
	}
	
	const rawEntries = extractRawEntries(trimmed);
	
	return bib.entries.map((entry) => {
		const f = entry.fields;
		const extra: Record<string, string> = {};
		for (const [name, value] of Object.entries(f)) {
			if (KNOWN_FIELDS.has(name)) {
				continue;
			}
			const str = fieldToString(value);
			if (str) {
				extra[name] = str;
			}
		}
		
		return {
			citationKey: entry.key,
			entryType: entry.type,
			title: fieldToString(f.title),
			authors: fieldToString(f.author),
			year: fieldToString(f.year),
			journal: fieldToString(f.journal) ?? fieldToString(f.booktitle),
			publisher: fieldToString(f.publisher),
			doi: fieldToString(f.doi),
			url: fieldToString(f.url),
			fields: extra,
			raw: rawEntries.get(entry.key) ?? "",
		};
	});
}
