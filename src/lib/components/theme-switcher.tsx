"use client";

import { useEffect, useState } from "react";
import { Check, Palette } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/lib/components/ui/dropdown-menu";
import { Button } from "@/lib/components/ui/button";
import { cn } from "@/lib/utility";
import { DEFAULT_THEME, THEME_KEYS, THEME_STORAGE_KEY, THEME_SWATCH, type ThemeKey } from "@/lib/theme";

export function ThemeSwitcher({ label, names }: { label: string; names: Record<ThemeKey, string> }) {
	const [theme, setTheme] = useState<ThemeKey>(DEFAULT_THEME);
	
	useEffect(() => {
		const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
		if (stored && (THEME_KEYS as readonly string[]).includes(stored)) {
			setTheme(stored as ThemeKey);
		}
	}, []);
	
	function choose(next: ThemeKey) {
		setTheme(next);
		document.documentElement.setAttribute("data-theme", next);
		window.localStorage.setItem(THEME_STORAGE_KEY, next);
	}
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" aria-label={label} title={label}>
					<Palette className="size-4"/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{THEME_KEYS.map((key) => (
					<DropdownMenuItem key={key} onSelect={() => choose(key)}>
						<Check className={cn("size-4", key === theme ? "opacity-100" : "opacity-0")}/>
						<span
							className="size-3 shrink-0 rounded-full border border-border"
							style={{ backgroundColor: THEME_SWATCH[key] }}
						/>
						{names[key]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
