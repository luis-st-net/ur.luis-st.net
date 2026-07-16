import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/** Formats a date for display, locale-aware. */
export function formatDate(date: Date | string, locale: string = "en"): string {
	const d = typeof date === "string" ? new Date(date) : date;
	return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(d);
}

/** Shortens a sha-256 hash for compact display, keeping head and tail. */
export function shortHash(hash: string, head: number = 10, tail: number = 8): string {
	if (hash.length <= head + tail + 1) {
		return hash;
	}
	return `${hash.slice(0, head)}…${hash.slice(-tail)}`;
}

/** Turns arbitrary text into a lowercase, hyphenated slug. */
const DIACRITICS_RE = new RegExp("[\\u0300-\\u036f]", "g");

export function slugify(text: string): string {
	return text
		.normalize("NFKD")
		.replace(DIACRITICS_RE, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

/** Generates a default PDF file name from a paper title and language code. */
export function generatePdfFileName(title: string, langCode: string): string {
	const slug = slugify(title) || "paper";
	return `${langCode}-${slug}.pdf`;
}

/** Ensures a user-provided file name ends with .pdf. */
export function normalizePdfFileName(name: string): string {
	const trimmed = name.trim();
	if (!trimmed) {
		return trimmed;
	}
	return /\.pdf$/i.test(trimmed) ? trimmed : `${trimmed}.pdf`;
}
