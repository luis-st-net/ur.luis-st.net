import Link from "next/link";
import { FileText, Languages, Pencil } from "lucide-react";
import { getLanguages, listPapers } from "@/lib/papers";
import { getI18n } from "@/lib/i18n/locale";
import { Button } from "@/lib/components/ui/button";
import { formatDate } from "@/lib/utility";
import { AddPaperDialog } from "./add-paper-dialog";
import { DeletePaperButton } from "./delete-paper-button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
	const { locale, dict } = await getI18n();
	const [papers, languages] = await Promise.all([listPapers(), getLanguages()]);
	
	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-10">
			<div className="mb-8 flex flex-wrap items-center justify-between gap-3">
				<h1 className="font-serif text-3xl font-semibold text-ink">{dict.admin.title}</h1>
				<div className="flex items-center gap-2">
					<Button asChild variant="outline">
						<Link href="/admin/languages">
							<Languages className="size-4"/>
							{dict.admin.manageLanguages}
						</Link>
					</Button>
					<AddPaperDialog
						languages={languages.map((l) => ({ id: l.id, code: l.code, name: l.name }))}
						dict={dict}
					/>
				</div>
			</div>
			
			{papers.length === 0 ? (
				<p className="rounded-xl border border-dashed border-border p-10 text-center text-ink-muted">
					{dict.admin.noPapers}
				</p>
			) : (
				<ul className="divide-y divide-border rounded-xl border border-border bg-surface">
					{papers.map((paper) => {
						const main = paper.translations[0];
						return (
							<li key={paper.id} className="flex items-center gap-4 p-4">
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
								
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium text-ink">{main?.title ?? "—"}</p>
									<p className="text-xs text-ink-subtle">
										{formatDate(paper.publishedAt, locale)} ·{" "}
										{paper.translations.map((t) => t.language.code).join(", ")}
									</p>
								</div>
								
								<div className="flex items-center gap-1">
									<Button asChild variant="ghost" size="sm">
										<Link href={`/admin/papers/${paper.id}/edit`}>
											<Pencil className="size-4"/>
											<span className="hidden sm:inline">{dict.admin.edit}</span>
										</Link>
									</Button>
									<DeletePaperButton
										paperId={paper.id}
										confirmText={dict.admin.deleteConfirm}
										label={dict.admin.delete}
									/>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
