import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n/locale";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { createLanguageAction } from "../actions";
import { DeleteLanguageButton } from "./delete-language-button";

export const dynamic = "force-dynamic";

export default async function LanguagesPage() {
	const { dict } = await getI18n();
	const lm = dict.admin.languageManager;
	
	const languages = await prisma.language.findMany({
		orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
		include: { _count: { select: { translations: true } } },
	});
	
	return (
		<div className="mx-auto w-full max-w-2xl px-4 py-10">
			<Link
				href="/admin"
				className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
			>
				<ArrowLeft className="size-4"/>
				{dict.admin.title}
			</Link>
			
			<h1 className="font-serif text-3xl font-semibold text-ink">{lm.heading}</h1>
			<p className="mt-2 text-sm text-ink-muted">{lm.hint}</p>
			
			<ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-surface">
				{languages.map((l) => (
					<li key={l.id} className="flex items-center gap-4 p-4">
						<div className="flex-1">
							<p className="font-medium text-ink">
								{l.name}{" "}
								<span className="text-xs font-normal uppercase text-ink-subtle">({l.code})</span>
							</p>
							<p className="text-xs text-ink-subtle">
								{lm.translationKey}: {l.translationKey} · {l._count.translations} ×
							</p>
						</div>
						<DeleteLanguageButton
							id={l.id}
							disabled={l._count.translations > 0}
							label={lm.remove}
						/>
					</li>
				))}
			</ul>
			
			<form action={createLanguageAction} className="mt-8 rounded-xl border border-border bg-surface p-5">
				<h2 className="font-serif text-lg font-semibold text-ink">{lm.add}</h2>
				<div className="mt-4 grid gap-4 sm:grid-cols-3">
					<div className="space-y-1.5">
						<Label htmlFor="code">{lm.code}</Label>
						<Input id="code" name="code" placeholder="FR" required/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="name">{lm.name}</Label>
						<Input id="name" name="name" placeholder="Français" required/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="translationKey">{lm.translationKey}</Label>
						<Input id="translationKey" name="translationKey" placeholder="fr"/>
					</div>
				</div>
				<div className="mt-4 flex justify-end">
					<Button type="submit">{lm.add}</Button>
				</div>
			</form>
		</div>
	);
}
