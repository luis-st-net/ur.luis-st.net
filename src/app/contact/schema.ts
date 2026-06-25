import { z } from "zod";

export type ContactFormMessages = {
	nameRequired: string;
	mailInvalid: string;
	subjectRequired: string;
	messageRequired: string;
	acceptTermsRequired: string;
	codeLength: string;
};

/** English defaults, used server-side where messages are not surfaced to users. */
const defaultMessages: ContactFormMessages = {
	nameRequired: "Name is required",
	mailInvalid: "Invalid mail address",
	subjectRequired: "Subject is required",
	messageRequired: "Message is required",
	acceptTermsRequired: "You must accept the contact conditions",
	codeLength: "Verification code must be 6 digits",
};

export function buildContactFormSchema(m: ContactFormMessages = defaultMessages) {
	return z.object({
		name: z.string().min(1, m.nameRequired),
		mail: z.string().email(m.mailInvalid),
		subject: z.string().min(1, m.subjectRequired),
		message: z.string().min(1, m.messageRequired),
		acceptTerms: z.boolean().refine((value) => value, m.acceptTermsRequired),
		bot: z.boolean().optional(),
	});
}

export function buildVerificationFormSchema(m: ContactFormMessages = defaultMessages) {
	return z.object({
		verificationToken: z.string(),
		verificationCode: z.string().length(6, m.codeLength),
	});
}

export const contactFormSchema = buildContactFormSchema();
export const verificationFormSchema = buildVerificationFormSchema();

export type ContactFormValues = z.infer<ReturnType<typeof buildContactFormSchema>>;
export type VerificationFormValues = z.infer<ReturnType<typeof buildVerificationFormSchema>>;
