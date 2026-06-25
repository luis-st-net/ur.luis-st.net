import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, FileText } from "lucide-react";
import { getPaper, pickTranslation } from "@/lib/papers";
import { getI18n } from "@/lib/i18n/locale";
import { Markdown } from "@/lib/markdown";
import { PaperTabs } from "@/lib/components/paper/paper-tabs";
import { cn, formatDate } from "@/lib/utility";

export async function generateMetadata({
										   params,
									   }: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const { id } = await params;
	const paper = await getPaper(id);
	const t = paper?.translations[0];
	return {
		title: t?.title ?? "Paper",
		description: t?.description,
	};
}

export default async function PaperPage({
											params,
											searchParams,
										}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ lang?: string }>;
}) {
	const { id } = await params;
	const { lang } = await searchParams;
	const { locale, dict } = await getI18n();
	
	const paper = await getPaper(id);
	if (!paper || paper.translations.length === 0) {
		notFound();
	}
	
	const active =
		(lang && paper.translations.find((t) => t.language.code === lang)) ||
		pickTranslation(paper.translations, locale)!;
	
	const downloads = paper.translations.map((t) => ({
		code: t.language.code,
		name: t.language.name,
		href: `/api/papers/${paper.id}/pdf?lang=${t.language.code}`,
		hash: t.pdfHash,
		fileName: t.pdfFileName,
	}));
	
	const hasContent = active.content.trim().length > 0;
	
	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-10">
			<Link
				href="/"
				className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
			>
				<ArrowLeft className="size-4"/>
				{dict.paper.backToHome}
			</Link>
			
			<header className="mb-8">
				<div className="flex items-start gap-4">
					{paper.iconMime ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={`/api/papers/${paper.id}/icon`}
							alt=""
							className="size-14 rounded-xl object-cover"
						/>
					) : (
						<span className="flex size-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
							<FileText className="size-7"/>
						</span>
					)}
					<div className="min-w-0 flex-1">
						<h1 className="font-serif text-3xl font-semibold text-ink">{active.title}</h1>
						<p className="mt-1 text-ink-muted">{active.description}</p>
					</div>
				</div>
				
				<div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-subtle">
					<span>
						{dict.paper.published}: {formatDate(paper.publishedAt, locale)}
					</span>
					{active.updatedAt && (
						<span>
							{dict.paper.updated}: {formatDate(active.updatedAt, locale)}
						</span>
					)}
				</div>
				
				{paper.translations.length > 1 && (
					<div className="mt-4 flex flex-wrap items-center gap-1.5">
						<span className="text-xs text-ink-subtle">{dict.paper.availableIn}:</span>
						{paper.translations.map((t) => (
							<Link
								key={t.id}
								href={`/paper/${paper.id}?lang=${t.language.code}`}
								scroll={false}
								className={cn(
									"rounded border px-2 py-0.5 text-xs font-medium uppercase transition-colors",
									t.id === active.id
										? "border-accent bg-accent/10 text-accent"
										: "border-border text-ink-subtle hover:text-ink",
								)}
							>
								{t.language.code}
							</Link>
						))}
					</div>
				)}
			</header>
			
			<PaperTabs
				title={active.title}
				abstract={<Markdown>{active.abstract}</Markdown>}
				content={hasContent ? <Markdown>{active.content}</Markdown> : null}
				hasContent={hasContent}
				sources={active.sources}
				downloads={downloads}
				dict={dict}
			/>
		</div>
	);
}
