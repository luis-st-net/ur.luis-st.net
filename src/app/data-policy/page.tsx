import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/locale";

export async function generateMetadata(): Promise<Metadata> {
	const { dict } = await getI18n();
	return { title: dict.dataPolicy.title };
}

export default async function DataPolicyPage() {
	const { dict } = await getI18n();
	
	return (
		<div className="mx-auto w-full max-w-2xl px-4 py-12">
			<h1 className="font-serif text-4xl font-semibold text-ink">{dict.dataPolicy.title}</h1>
			<p className="mt-3 text-lg text-ink-muted">{dict.dataPolicy.intro}</p>
			
			<div className="mt-8 space-y-6">
				{dict.dataPolicy.sections.map((section) => (
					<section key={section.title}>
						<h2 className="font-serif text-xl font-semibold text-ink">{section.title}</h2>
						<p className="mt-1 leading-relaxed text-ink-muted">{section.body}</p>
					</section>
				))}
			</div>
		</div>
	);
}
