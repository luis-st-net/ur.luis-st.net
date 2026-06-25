"use server";

import { cookies } from "next/headers";
import { DEFAULT_LOCALE, dictionaries } from "./dictionaries";
import { LOCALE_COOKIE } from "./locale";

/** Persists the chosen website language in a long-lived cookie. */
export async function setLocale(locale: string): Promise<void> {
	const value = dictionaries[locale] ? locale : DEFAULT_LOCALE;
	const store = await cookies();
	store.set(LOCALE_COOKIE, value, {
		path: "/",
		maxAge: 60 * 60 * 24 * 365,
		sameSite: "lax",
	});
}
