"use client";

import { useRef, useState } from "react";
import { FileText, FileUp, Pencil } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/lib/components/ui/dialog";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { Textarea } from "@/lib/components/ui/textarea";
import { cn, shortHash } from "@/lib/utility";
import type { Dictionary } from "@/lib/i18n/dictionaries";

/** Matches a Markdown H1/H2 heading line (e.g. "# Title" or "## Title"). */
const ABSTRACT_HEADING_RE = /^[ \t]*#{1,2}[ \t]+\S/m;

export interface LanguageInitial {
	translationId?: string;
	languageId: string;
	code: string;
	title?: string;
	description?: string;
	abstract?: string;
	content?: string;
	pdfFileName?: string | null;
	pdfHash?: string | null;
	hasSources?: boolean;
}

export function LanguagePanel({
								  data,
								  active,
								  dict,
							  }: {
	data: LanguageInitial;
	active: boolean;
	dict: Dictionary;
}) {
	const f = dict.admin.fields;
	const code = data.code;
	const isNew = !data.translationId;
	
	const [abstractText, setAbstractText] = useState(data.abstract ?? "");
	const [abstractWarningOpen, setAbstractWarningOpen] = useState(false);
	const [contentText, setContentText] = useState(data.content ?? "");
	const [contentFileName, setContentFileName] = useState<string | null>(null);
	const [pdfFileName, setPdfFileName] = useState<string | null>(null);
	const [bibtexFileName, setBibtexFileName] = useState<string | null>(null);
	const [contentDialogOpen, setContentDialogOpen] = useState(false);
	const [draftText, setDraftText] = useState(contentText);
	
	const contentFileRef = useRef<HTMLInputElement>(null);
	
	const hasContent = contentFileName || contentText.trim().length > 0;
	
	return (
		<div className={cn("space-y-6", !active && "hidden")}>
			{/* Hidden identity fields */}
			<input type="hidden" name={`lang.${code}.languageId`} value={data.languageId}/>
			{data.translationId && (
				<input type="hidden" name={`lang.${code}.translationId`} value={data.translationId}/>
			)}
			
			<div className="space-y-1.5">
				<Label htmlFor={`${code}-title`}>
					{f.title} <span className="text-red-500">*</span>
				</Label>
				<Input
					id={`${code}-title`}
					name={`lang.${code}.title`}
					defaultValue={data.title}
					required
				/>
			</div>
			
			<div className="space-y-1.5">
				<Label htmlFor={`${code}-description`}>
					{f.description} <span className="text-red-500">*</span>
				</Label>
				<Input
					id={`${code}-description`}
					name={`lang.${code}.description`}
					defaultValue={data.description}
					required
				/>
			</div>
			
			<div className="space-y-1.5">
				<Label htmlFor={`${code}-abstract`}>{f.abstract}</Label>
				<p className="text-xs text-ink-subtle">{f.abstractHint}</p>
				<Textarea
					id={`${code}-abstract`}
					name={`lang.${code}.abstract`}
					value={abstractText}
					onChange={(e) => setAbstractText(e.target.value)}
					onBlur={() => {
						if (ABSTRACT_HEADING_RE.test(abstractText)) {
							setAbstractWarningOpen(true);
						}
					}}
					rows={5}
				/>
			</div>
			
			{/* Content: upload .md OR type text */}
			<div className="space-y-1.5">
				<Label>{f.content}</Label>
				<input type="hidden" name={`lang.${code}.contentText`} value={contentFileName ? "" : contentText}/>
				<input
					ref={contentFileRef}
					type="file"
					accept=".md,text/markdown,text/plain"
					name={`lang.${code}.contentFile`}
					className="hidden"
					onChange={(e) => {
						const file = e.target.files?.[0];
						setContentFileName(file ? file.name : null);
					}}
				/>
				<div className="flex flex-col gap-2 rounded-lg border border-dashed border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-sm text-ink-muted">
						{contentFileName ? (
							<span className="inline-flex items-center gap-1.5 text-ink">
								<FileText className="size-4"/> {contentFileName}
							</span>
						) : hasContent ? (
							<span className="text-ink">{contentText.length} chars</span>
						) : (
							dict.common.none
						)}
					</p>
					<div className="flex gap-2">
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => contentFileRef.current?.click()}
						>
							<FileUp className="size-4"/>
							{f.contentUpload}
						</Button>
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={() => {
								setDraftText(contentText);
								setContentDialogOpen(true);
							}}
						>
							<Pencil className="size-4"/>
							{f.contentType}
						</Button>
					</div>
				</div>
			</div>
			
			{/* PDF */}
			<div className="space-y-1.5">
				<Label htmlFor={`${code}-pdf`}>
					{f.pdf} {isNew && <span className="text-red-500">*</span>}
				</Label>
				{!isNew && data.pdfHash && (
					<p className="text-xs text-ink-subtle">
						{f.pdfCurrent}: {data.pdfFileName || "paper.pdf"} · SHA-256 {shortHash(data.pdfHash, 12, 8)}
						{pdfFileName && <span className="ml-1 text-accent">→ {pdfFileName}</span>}
					</p>
				)}
				<Input
					id={`${code}-pdf`}
					type="file"
					accept="application/pdf,.pdf"
					name={`lang.${code}.pdf`}
					required={isNew}
					onChange={(e) => setPdfFileName(e.target.files?.[0]?.name ?? null)}
				/>
			</div>
			
			{/* BibTeX */}
			<div className="space-y-1.5">
				<Label htmlFor={`${code}-bibtex`}>{f.bibtex}</Label>
				{!isNew && data.hasSources && !bibtexFileName && (
					<p className="text-xs text-ink-subtle">✓ sources present</p>
				)}
				<Input
					id={`${code}-bibtex`}
					type="file"
					accept=".bib,text/x-bibtex,text/plain"
					name={`lang.${code}.bibtex`}
					onChange={(e) => setBibtexFileName(e.target.files?.[0]?.name ?? null)}
				/>
			</div>
			
			<Dialog open={abstractWarningOpen} onOpenChange={setAbstractWarningOpen}>
				<DialogContent className="max-w-md">
					<DialogHeader>
						<DialogTitle>{dict.admin.abstractWarning.title}</DialogTitle>
					</DialogHeader>
					<p className="text-sm text-ink-muted">{dict.admin.abstractWarning.body}</p>
					<DialogFooter>
						<Button onClick={() => setAbstractWarningOpen(false)}>
							{dict.admin.abstractWarning.dismiss}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			<Dialog open={contentDialogOpen} onOpenChange={setContentDialogOpen}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>{f.contentModalTitle}</DialogTitle>
					</DialogHeader>
					<Textarea
						value={draftText}
						onChange={(e) => setDraftText(e.target.value)}
						rows={18}
						className="max-h-[60vh]"
						placeholder="# Heading…"
					/>
					<DialogFooter>
						<Button variant="ghost" onClick={() => setContentDialogOpen(false)}>
							{dict.admin.cancel}
						</Button>
						<Button
							onClick={() => {
								setContentText(draftText);
								// typed text wins over a previously chosen file
								setContentFileName(null);
								if (contentFileRef.current) {
									contentFileRef.current.value = "";
								}
								setContentDialogOpen(false);
							}}
						>
							{dict.admin.save}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
