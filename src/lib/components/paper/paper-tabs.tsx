"use client";

import { useState } from "react";
import { Download, Expand, ExternalLink, Hash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/lib/components/ui/tabs";
import { Button } from "@/lib/components/ui/button";
import { Reader } from "@/lib/components/paper/reader";
import { shortHash } from "@/lib/utility";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export interface SourceItem {
	id: string;
	citationKey: string;
	entryType: string;
	title?: string | null;
	authors?: string | null;
	year?: string | null;
	journal?: string | null;
	publisher?: string | null;
	doi?: string | null;
	url?: string | null;
}

export interface DownloadItem {
	code: string;
	name: string;
	href: string;
	hash: string;
	fileName?: string | null;
}

export function PaperTabs({
							  title,
							  abstract,
							  content,
							  hasContent,
							  sources,
							  downloads,
							  dict,
						  }: {
	title: string;
	abstract: React.ReactNode;
	content: React.ReactNode;
	hasContent: boolean;
	sources: SourceItem[];
	downloads: DownloadItem[];
	dict: Dictionary;
}) {
	const [readerOpen, setReaderOpen] = useState(false);
	const hasSources = sources.length > 0;
	
	return (
		<>
			<Tabs defaultValue="abstract" className="w-full">
				<TabsList className="flex-wrap">
					<TabsTrigger value="abstract">{dict.paper.tabs.abstract}</TabsTrigger>
					<TabsTrigger value="content">{dict.paper.tabs.content}</TabsTrigger>
					<TabsTrigger value="sources" disabled={!hasSources}>
						{dict.paper.tabs.sources}
					</TabsTrigger>
					<TabsTrigger value="download">{dict.paper.tabs.download}</TabsTrigger>
				</TabsList>
				
				<TabsContent value="abstract">{abstract}</TabsContent>
				
				<TabsContent value="content">
					{hasContent ? (
						<div>
							<div className="content-fade rounded-lg border border-border bg-surface p-5">
								{content}
							</div>
							<div className="mt-3 flex items-center justify-between">
								<p className="text-xs text-ink-subtle">{dict.paper.content.previewNote}</p>
								<Button variant="outline" size="sm" onClick={() => setReaderOpen(true)}>
									<Expand className="size-4"/>
									{dict.paper.content.expand}
								</Button>
							</div>
						</div>
					) : (
						<p className="rounded-lg border border-dashed border-border p-8 text-center text-ink-muted">
							{dict.paper.content.empty}
						</p>
					)}
				</TabsContent>
				
				<TabsContent value="sources">
					{hasSources ? (
						<ol className="space-y-3">
							{sources.map((s) => (
								<li
									key={s.id}
									className="rounded-lg border border-border bg-surface p-4 text-sm"
								>
									<p className="font-medium text-ink">{s.title || s.citationKey}</p>
									<p className="text-ink-muted">
										{[s.authors, s.journal || s.publisher, s.year].filter(Boolean).join(" · ")}
									</p>
									{(s.doi || s.url) && (
										<a
											href={s.url || `https://doi.org/${s.doi}`}
											target="_blank"
											rel="noreferrer"
											className="mt-1 inline-flex items-center gap-1 text-accent hover:underline"
										>
											{s.doi ? `doi:${s.doi}` : s.url}
											<ExternalLink className="size-3"/>
										</a>
									)}
								</li>
							))}
						</ol>
					) : (
						<p className="text-ink-muted">{dict.paper.sources.empty}</p>
					)}
				</TabsContent>
				
				<TabsContent value="download">
					<ul className="space-y-3">
						{downloads.map((d) => (
							<li
								key={d.code}
								className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
							>
								<div className="min-w-0">
									<p className="font-medium text-ink">{d.name}</p>
									<p className="mt-0.5 inline-flex items-center gap-1 font-mono text-xs text-ink-subtle">
										<Hash className="size-3"/>
										<span className="break-all" title={d.hash}>
											{dict.paper.download.sha256}: {shortHash(d.hash, 16, 12)}
										</span>
									</p>
								</div>
								<Button asChild size="sm" className="shrink-0">
									<a href={d.href}>
										<Download className="size-4"/>
										{dict.paper.download.pdf}
									</a>
								</Button>
							</li>
						))}
					</ul>
				</TabsContent>
			</Tabs>
			
			<Reader
				open={readerOpen}
				onClose={() => setReaderOpen(false)}
				title={title}
				dict={dict}
			>
				{content}
			</Reader>
		</>
	);
}
