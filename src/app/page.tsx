import Link from "next/link";
import { AlertTriangle, ArrowRight, FileText } from "lucide-react";
import { listPapers, pickTranslation } from "@/lib/papers";
import { getI18n } from "@/lib/i18n/locale";
import { formatDate } from "@/lib/utility";

export default async function HomePage() {
	const { locale, dict } = await getI18n();
	const papers = await listPapers();
	
	return (
		<div className="mx-auto w-full max-w-5xl px-4 py-10">
			{/* Non-quotable banner -> about */}
			<Link
				href="/about"
				className="group mb-10 flex items-start gap-3 rounded-xl border border-accent/30 bg-accent/5 p-4 transition-colors hover:bg-accent/10"
			>
				<AlertTriangle className="mt-0.5 size-5 shrink-0 text-accent"/>
				<div className="flex-1">
					<p className="font-medium text-ink">{dict.home.bannerTitle}</p>
					<p className="text-sm text-ink-muted">{dict.home.bannerText}</p>
				</div>
				<ArrowRight className="mt-1 size-4 shrink-0 text-accent transition-transform group-hover:translate-x-1"/>
			</Link>
			
			<header className="mb-10">
				<h1 className="font-serif text-4xl font-semibold text-ink">{dict.home.heading}</h1>
				<p className="mt-2 text-lg text-ink-muted">{dict.home.intro}</p>
			</header>
			
			{papers.length === 0 ? (
				<p className="rounded-xl border border-dashed border-border p-10 text-center text-ink-muted">
					{dict.home.empty}
				</p>
			) : (
				<ul className="grid gap-5 sm:grid-cols-2">
					{papers.map((paper) => {
						const t = pickTranslation(paper.translations, locale);
						if (!t) {
							return null;
						}
						return (
							<li key={paper.id}>
								<Link
									href={`/paper/${paper.id}`}
									className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
								>
									<div className="mb-3 flex items-center gap-3">
										{paper.iconMime ? (
											// eslint-disable-next-line @next/next/no-img-element
											<img
												src={`/api/papers/${paper.id}/icon`}
												alt=""
												className="size-10 rounded-lg object-cover"
											/>
										) : (
											<span className="flex size-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
												<FileText className="size-5"/>
											</span>
										)}
										<div className="flex flex-wrap gap-1">
											{paper.translations.map((tr) => (
												<span
													key={tr.id}
													className="rounded border border-border px-1.5 py-0.5 text-[10px] font-medium uppercase text-ink-subtle"
												>
													{tr.language.code}
												</span>
											))}
										</div>
									</div>
									<h2 className="font-serif text-xl font-semibold text-ink group-hover:text-accent">
										{t.title}
									</h2>
									<p className="mt-1 line-clamp-3 flex-1 text-sm text-ink-muted">{t.description}</p>
									<div className="mt-4 flex items-center justify-between text-xs text-ink-subtle">
										<span>{formatDate(paper.publishedAt, locale)}</span>
										<span className="inline-flex items-center gap-1 text-accent">
											{dict.home.readMore}
											<ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5"/>
										</span>
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
