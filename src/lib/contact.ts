import "server-only";

export interface ContactInformation {
	name: string;
	street: string;
	city: string;
	country: string;
	mail: string;
}

/** Owner / imprint details, sourced from environment variables. */
export function getContactInformation(): ContactInformation {
	return {
		name: process.env.WEBSITE_OWNER || "",
		street: process.env.OWNER_STREET || "",
		city: process.env.OWNER_CITY || "",
		country: process.env.OWNER_COUNTRY || "",
		mail: process.env.OWNER_MAIL || "",
	};
}
