import type { Metadata } from "next";
import { Compass, Quote, Rabbit } from "lucide-react";
import { getI18n } from "@/lib/i18n/locale";

export async function generateMetadata(): Promise<Metadata> {
	const { dict } = await getI18n();
	return { title: dict.about.title };
}

export default async function AboutPage() {
	const { dict } = await getI18n();
	
	return (
		<div className="mx-auto w-full max-w-2xl px-4 py-12">
			<div className="mb-8 flex items-center gap-3 text-accent">
				<Compass className="size-7"/>
				<Rabbit className="size-7"/>
			</div>
			
			<h1 className="font-serif text-4xl font-semibold text-ink">{dict.about.title}</h1>
			<p className="mt-3 text-xl text-ink-muted">{dict.about.lead}</p>
			
			<div className="prose mt-8">
				{dict.about.body.map((paragraph, i) => (
					<p key={i}>{paragraph}</p>
				))}
			</div>
			
			<div className="mt-10 rounded-xl border border-accent/30 bg-accent/5 p-6">
				<h2 className="flex items-center gap-2 font-serif text-xl font-semibold text-ink">
					<Quote className="size-5 text-accent"/>
					{dict.about.quotableTitle}
				</h2>
				<p className="mt-2 text-ink-muted">{dict.about.quotableBody}</p>
			</div>
			
			<p className="mt-10 text-center font-serif text-lg italic text-ink-subtle">
				“{dict.site.tagline}”
			</p>
		</div>
	);
}
