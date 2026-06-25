import { cookies } from "next/headers";
import { DEFAULT_LOCALE, dictionaries, getDictionary } from "./dictionaries";

export const LOCALE_COOKIE = "locale";

/** Reads the active website locale from the cookie (server components). */
export async function getLocale(): Promise<string> {
	const store = await cookies();
	const value = store.get(LOCALE_COOKIE)?.value;
	if (value && dictionaries[value]) {
		return value;
	}
	return DEFAULT_LOCALE;
}

/** Reads the active locale together with its dictionary. */
export async function getI18n() {
	const locale = await getLocale();
	return { locale, dict: getDictionary(locale) };
}
