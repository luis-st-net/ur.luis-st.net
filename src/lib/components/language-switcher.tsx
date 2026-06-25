"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/lib/components/ui/dropdown-menu";
import { Button } from "@/lib/components/ui/button";
import { setLocale } from "@/lib/i18n/actions";
import { websiteLocales } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utility";

export function LanguageSwitcher({ locale, label }: { locale: string; label: string }) {
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	
	function choose(next: string) {
		if (next === locale) {
			return;
		}
		startTransition(async () => {
			await setLocale(next);
			router.refresh();
		});
	}
	
	const current = websiteLocales.find((l) => l.key === locale) ?? websiteLocales[0];
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm" aria-label={label} disabled={pending}>
					<Globe className="size-4"/>
					<span className="hidden sm:inline">{current.name}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{websiteLocales.map((l) => (
					<DropdownMenuItem key={l.key} onSelect={() => choose(l.key)}>
						<Check className={cn("size-4", l.key === locale ? "opacity-100" : "opacity-0")}/>
						{l.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
