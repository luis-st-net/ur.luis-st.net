import type { Metadata } from "next";
import Link from "next/link";
import { getI18n } from "@/lib/i18n/locale";
import { getContactInformation } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
	const { dict } = await getI18n();
	return { title: dict.imprint.title };
}

export default async function ImprintPage() {
	const { dict } = await getI18n();
	const contact = getContactInformation();
	
	return (
		<div className="mx-auto w-full max-w-2xl px-4 py-12">
			<h1 className="font-serif text-4xl font-semibold text-ink">{dict.imprint.title}</h1>
			
			<div className="mt-8 space-y-1 text-ink">
				<p className="font-medium">{contact.name}</p>
				<p className="text-ink-muted">
					{contact.street && (
						<>
							{contact.street}
							<br/>
						</>
					)}
					{contact.city && (
						<>
							{contact.city}
							<br/>
						</>
					)}
					{contact.country}
				</p>
			</div>
			
			{contact.representedBy && (
				<div className="mt-8">
					<p className="font-medium text-ink">{dict.imprint.representedBy}</p>
					<p className="text-ink-muted">{contact.representedBy}</p>
				</div>
			)}

			<div className="mt-8">
				<p className="font-medium text-ink">{dict.imprint.contact}</p>
				{contact.mail && (
					<p className="text-ink-muted">
						{dict.imprint.mail}{" "}
						<Link href={`mailto:${contact.mail}`} className="text-accent underline">
							{contact.mail}
						</Link>
					</p>
				)}
			</div>
			
			<div className="mt-12">
				<h2 className="font-serif text-2xl font-semibold text-ink">{dict.imprint.disclaimerTitle}</h2>
				<div className="mt-4 space-y-6">
					{dict.imprint.disclaimers.map((d) => (
						<div key={d.title}>
							<h3 className="font-medium text-ink">{d.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
