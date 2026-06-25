import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLanguages, getPaper } from "@/lib/papers";
import { getI18n } from "@/lib/i18n/locale";
import { PaperForm } from "../../paper-form";
import { updatePaperAction } from "../../../actions";
import type { LanguageInitial } from "../../language-panel";

export const dynamic = "force-dynamic";

export default async function EditPaperPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const { dict } = await getI18n();
	
	const [paper, languages] = await Promise.all([getPaper(id), getLanguages()]);
	if (!paper) {
		notFound();
	}
	
	const panels: LanguageInitial[] = paper.translations.map((t) => ({
		translationId: t.id,
		languageId: t.language.id,
		code: t.language.code,
		title: t.title,
		description: t.description,
		abstract: t.abstract,
		content: t.content,
		pdfFileName: t.pdfFileName,
		pdfHash: t.pdfHash,
		hasSources: t.sources.length > 0,
	}));
	
	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-10">
			<Link
				href="/admin"
				className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
			>
				<ArrowLeft className="size-4"/>
				{dict.admin.title}
			</Link>
			
			<h1 className="mb-8 font-serif text-3xl font-semibold text-ink">{dict.admin.editPaper}</h1>
			
			<PaperForm
				mode="edit"
				action={updatePaperAction}
				allLanguages={languages.map((l) => ({ id: l.id, code: l.code, name: l.name }))}
				initial={{ paperId: paper.id, hasIcon: !!paper.iconMime, panels }}
				dict={dict}
			/>
		</div>
	);
}
