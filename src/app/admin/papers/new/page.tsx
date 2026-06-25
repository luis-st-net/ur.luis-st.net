import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLanguages } from "@/lib/papers";
import { getI18n } from "@/lib/i18n/locale";
import { PaperForm } from "../paper-form";
import { createPaperAction } from "../../actions";

export const dynamic = "force-dynamic";

export default async function NewPaperPage({
											   searchParams,
										   }: {
	searchParams: Promise<{ lang?: string }>;
}) {
	const { lang } = await searchParams;
	const { dict } = await getI18n();
	const languages = await getLanguages();
	
	const chosen = languages.find((l) => l.code === lang) ?? languages[0];
	if (!chosen) {
		// No languages configured yet — send to language management.
		redirect("/admin/languages");
	}
	
	return (
		<div className="mx-auto w-full max-w-3xl px-4 py-10">
			<Link
				href="/admin"
				className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
			>
				<ArrowLeft className="size-4"/>
				{dict.admin.title}
			</Link>
			
			<h1 className="mb-8 font-serif text-3xl font-semibold text-ink">{dict.admin.newPaper}</h1>
			
			<PaperForm
				mode="create"
				action={createPaperAction}
				allLanguages={languages.map((l) => ({ id: l.id, code: l.code, name: l.name }))}
				initial={{ panels: [{ languageId: chosen.id, code: chosen.code }] }}
				dict={dict}
			/>
		</div>
	);
}
