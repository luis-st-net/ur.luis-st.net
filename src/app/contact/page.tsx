import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/locale";
import { ContactForm } from "./contact-form";

export async function generateMetadata(): Promise<Metadata> {
	const { dict } = await getI18n();
	return { title: dict.contact.title };
}

export default async function ContactPage() {
	const { dict } = await getI18n();

	return (
		<div className="mx-auto w-full max-w-2xl px-4 py-12">
			<h1 className="font-serif text-4xl font-semibold text-ink">{dict.contact.title}</h1>
			<p className="mt-4 max-w-prose text-ink-muted">{dict.contact.lead}</p>

			<ContactForm dict={dict} />
		</div>
	);
}
