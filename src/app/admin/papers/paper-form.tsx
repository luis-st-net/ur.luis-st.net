"use client";

import { useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { ImageIcon, Plus, Save, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/lib/components/ui/dropdown-menu";
import { Button } from "@/lib/components/ui/button";
import { Label } from "@/lib/components/ui/label";
import { Input } from "@/lib/components/ui/input";
import { cn } from "@/lib/utility";
import { type LanguageInitial, LanguagePanel } from "./language-panel";
import type { Dictionary } from "@/lib/i18n/dictionaries";

interface LanguageOption {
	id: string;
	code: string;
	name: string;
}

function SubmitButton({ label, savingLabel }: { label: string; savingLabel: string }) {
	const { pending } = useFormStatus();
	return (
		<Button type="submit" disabled={pending}>
			<Save className="size-4"/>
			{pending ? savingLabel : label}
		</Button>
	);
}

export function PaperForm({
							  mode,
							  action,
							  allLanguages,
							  initial,
							  dict,
						  }: {
	mode: "create" | "edit";
	action: (formData: FormData) => void | Promise<void>;
	allLanguages: LanguageOption[];
	initial: { paperId?: string; hasIcon?: boolean; panels: LanguageInitial[] };
	dict: Dictionary;
}) {
	const [panels, setPanels] = useState<LanguageInitial[]>(initial.panels);
	const [activeCode, setActiveCode] = useState(initial.panels[0]?.code ?? "");
	const [removed, setRemoved] = useState<string[]>([]);
	const [removeIcon, setRemoveIcon] = useState(false);
	const [iconFileName, setIconFileName] = useState<string | null>(null);
	const iconRef = useRef<HTMLInputElement>(null);
	
	const codeName = useMemo(() => {
		const map = new Map<string, string>();
		allLanguages.forEach((l) => map.set(l.code, l.name));
		return map;
	}, [allLanguages]);
	
	const remaining = allLanguages.filter((l) => !panels.some((p) => p.code === l.code));
	
	function addLanguage(lang: LanguageOption) {
		setPanels((prev) => [...prev, { languageId: lang.id, code: lang.code }]);
		setActiveCode(lang.code);
	}
	
	function removeLanguage(code: string) {
		const panel = panels.find((p) => p.code === code);
		if (!panel || panels.length <= 1) {
			return;
		}
		if (panel.translationId) {
			setRemoved((prev) => [...prev, panel.translationId!]);
		}
		const next = panels.filter((p) => p.code !== code);
		setPanels(next);
		if (activeCode === code) {
			setActiveCode(next[0]?.code ?? "");
		}
	}
	
	const showIconPreview = mode === "edit" && initial.hasIcon && !removeIcon && !iconFileName;
	
	return (
		<form action={action} className="space-y-8">
			{initial.paperId && <input type="hidden" name="paperId" value={initial.paperId}/>}
			<input type="hidden" name="languages" value={JSON.stringify(panels.map((p) => p.code))}/>
			<input type="hidden" name="removedTranslations" value={JSON.stringify(removed)}/>
			{removeIcon && <input type="hidden" name="removeIcon" value="1"/>}
			
			{/* Shared icon */}
			<div className="space-y-1.5">
				<Label>{dict.admin.fields.icon}</Label>
				<p className="text-xs text-ink-subtle">{dict.admin.fields.iconHint}</p>
				<div className="flex items-center gap-4">
					{showIconPreview ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={`/api/papers/${initial.paperId}/icon`}
							alt=""
							className="size-14 rounded-xl object-cover"
						/>
					) : (
						<span className="flex size-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
							<ImageIcon className="size-6"/>
						</span>
					)}
					<Input
						ref={iconRef}
						type="file"
						accept="image/*"
						name="iconFile"
						className="max-w-xs"
						onChange={(e) => {
							setIconFileName(e.target.files?.[0]?.name ?? null);
							if (e.target.files?.[0]) {
								setRemoveIcon(false);
							}
						}}
					/>
					{mode === "edit" && initial.hasIcon && !removeIcon && (
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => {
								setRemoveIcon(true);
								setIconFileName(null);
								if (iconRef.current) {
									iconRef.current.value = "";
								}
							}}
						>
							<X className="size-4"/>
							{dict.admin.delete}
						</Button>
					)}
				</div>
			</div>
			
			{/* Language tabs */}
			<div>
				<div className="flex flex-wrap items-center gap-1 border-b border-border pb-2">
					{panels.map((p) => (
						<div
							key={p.code}
							className={cn(
								"flex items-center gap-1 rounded-t-md px-3 py-1.5 text-sm font-medium transition-colors",
								activeCode === p.code
									? "bg-accent/10 text-accent"
									: "text-ink-muted hover:text-ink",
							)}
						>
							<button type="button" onClick={() => setActiveCode(p.code)}>
								{codeName.get(p.code) ?? p.code}{" "}
								<span className="uppercase text-ink-subtle">({p.code})</span>
							</button>
							{panels.length > 1 && (
								<button
									type="button"
									aria-label={dict.admin.removeLanguageTab}
									title={dict.admin.removeLanguageTab}
									onClick={() => removeLanguage(p.code)}
									className="rounded p-0.5 text-ink-subtle hover:text-red-600"
								>
									<X className="size-3.5"/>
								</button>
							)}
						</div>
					))}
					
					{remaining.length > 0 && (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									aria-label={dict.admin.addLanguageTab}
									title={dict.admin.addLanguageTab}
								>
									<Plus className="size-4"/>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="start">
								{remaining.map((l) => (
									<DropdownMenuItem key={l.id} onSelect={() => addLanguage(l)}>
										{l.name} <span className="uppercase text-ink-subtle">({l.code})</span>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)}
				</div>
				
				<div className="pt-6">
					{panels.map((p) => (
						<LanguagePanel key={p.code} data={p} active={activeCode === p.code} dict={dict}/>
					))}
				</div>
			</div>
			
			<div className="flex items-center justify-end gap-2 border-t border-border pt-6">
				<SubmitButton label={dict.admin.save} savingLabel={dict.admin.saving}/>
			</div>
		</form>
	);
}
