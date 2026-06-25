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
