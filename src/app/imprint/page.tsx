import type { Metadata } from "next";
import Link from "next/link";
import { getI18n } from "@/lib/i18n/locale";
import { getContactInformation } from "@/lib/contact";

export async function generateMetadata(): Promise<Metadata> {
	const { dict } = await getI18n();
	return { title: dict.imprint.title };
}

const disclaimers = [
	{
		title: "Liability for content",
		body: "The contents of this website have been created with the greatest care. However, I cannot assume any liability for the correctness, completeness and topicality of the contents. As the operator of this private website, I am responsible for my own content in accordance with general legislation. However, as a private individual, I am not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. As soon as I become aware of such infringements, I will remove this content immediately.",
	},
	{
		title: "Liability for links",
		body: "This website contains links to external websites of third parties over whose content I have no influence. Therefore, I cannot accept any liability for this third-party content. The respective provider or operator of the pages is always responsible for the content of the linked pages. If I become aware of any legal infringements, I will remove such links immediately.",
	},
	{
		title: "Copyright",
		body: "The content and works on this site created by me as the site operator are subject to German copyright law. Reproduction, editing, distribution and any kind of exploitation outside the limits of copyright law require my written consent. The white papers published here are explicitly not intended to be cited as academic sources.",
	},
];

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
				<div className="mt-4 divide-y divide-border rounded-xl border border-border bg-surface">
					{disclaimers.map((d) => (
						<details key={d.title} className="group p-4">
							<summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
								{d.title}
							</summary>
							<p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.body}</p>
						</details>
					))}
				</div>
			</div>
		</div>
	);
}
