import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import Prism from "prismjs";

// Languages bundled for syntax highlighting. Order matters for languages that
// extend others (e.g. tsx depends on jsx -> typescript -> javascript).
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-markdown";

import { cn } from "@/lib/utility";

const LANGUAGE_ALIASES: Record<string, string> = {
	js: "javascript",
	ts: "typescript",
	py: "python",
	sh: "bash",
	shell: "bash",
	html: "markup",
	xml: "markup",
	"c++": "cpp",
	cs: "csharp",
	yml: "yaml",
};

function highlight(code: string, language: string | undefined): { html: string; lang: string } {
	const lang = language ? LANGUAGE_ALIASES[language] ?? language : "";
	const grammar = lang ? Prism.languages[lang] : undefined;
	if (grammar) {
		return { html: Prism.highlight(code, grammar, lang), lang };
	}
	// Fall back to escaped plain text.
	const escaped = code
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	return { html: escaped, lang: lang || "text" };
}

type CodeProps = React.ComponentPropsWithoutRef<"code"> & { node?: unknown };

function Code({ className, children, ...props }: CodeProps) {
	const match = /language-(\w[\w+-]*)/.exec(className || "");
	const raw = String(children ?? "");
	
	// Inline code: no language class and single line.
	if (!match && !raw.includes("\n")) {
		return (
			<code className={className} {...props}>
				{children}
			</code>
		);
	}
	
	const code = raw.replace(/\n$/, "");
	const { html, lang } = highlight(code, match?.[1]);
	return (
		<code
			className={cn(className, `language-${lang}`)}
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}

export function Markdown({ children, className }: { children: string; className?: string }) {
	return (
		<div className={cn("prose", className)}>
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkMath]}
				rehypePlugins={[rehypeRaw, rehypeKatex]}
				components={{ code: Code }}
			>
				{children}
			</ReactMarkdown>
		</div>
	);
}
