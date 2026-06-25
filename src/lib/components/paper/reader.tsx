"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Monitor, Moon, Sun, X } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { cn } from "@/lib/utility";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ThemeMode = "system" | "light" | "dark";

export function Reader({
						   open,
						   onClose,
						   title,
						   children,
						   dict,
					   }: {
	open: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	dict: Dictionary;
}) {
	const [mounted, setMounted] = useState(false);
	const [mode, setMode] = useState<ThemeMode>("system");
	const [systemDark, setSystemDark] = useState(false);
	
	useEffect(() => {
		setMounted(true);
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		setSystemDark(mq.matches);
		const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, []);
	
	useEffect(() => {
		if (!open) {
			return;
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		document.addEventListener("keydown", onKey);
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prevOverflow;
		};
	}, [open, onClose]);
	
	if (!mounted || !open) {
		return null;
	}
	
	const isDark = mode === "dark" || (mode === "system" && systemDark);
	
	const themes: { key: ThemeMode; icon: React.ReactNode; label: string }[] = [
		{ key: "system", icon: <Monitor className="size-4"/>, label: dict.reader.theme.system },
		{ key: "light", icon: <Sun className="size-4"/>, label: dict.reader.theme.light },
		{ key: "dark", icon: <Moon className="size-4"/>, label: dict.reader.theme.dark },
	];
	
	return createPortal(
		<div className={cn(isDark && "dark")}>
			<div className="fixed inset-0 z-[60] overflow-y-auto bg-base text-ink">
				<div className="sticky top-0 z-10 border-b border-border bg-base/90 backdrop-blur">
					<div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 py-3">
						<p className="truncate font-serif text-sm font-medium text-ink-muted">{title}</p>
						<div className="flex items-center gap-2">
							<div className="flex items-center rounded-md border border-border p-0.5">
								{themes.map((t) => (
									<button
										key={t.key}
										type="button"
										aria-label={t.label}
										title={t.label}
										onClick={() => setMode(t.key)}
										className={cn(
											"flex size-7 items-center justify-center rounded transition-colors cursor-pointer",
											mode === t.key ? "bg-ink/10 text-ink" : "text-ink-subtle hover:text-ink",
										)}
									>
										{t.icon}
									</button>
								))}
							</div>
							<Button variant="ghost" size="icon" onClick={onClose} aria-label={dict.reader.close}>
								<X className="size-5"/>
							</Button>
						</div>
					</div>
				</div>
				
				<article className="mx-auto w-full max-w-3xl px-4 py-10">
					<h1 className="mb-8 font-serif text-3xl font-semibold text-ink">{title}</h1>
					{children}
				</article>
			</div>
		</div>,
		document.body,
	);
}
