"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/lib/components/ui/dialog";
import { Button } from "@/lib/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/lib/components/ui/select";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function AddPaperDialog({
								   languages,
								   dict,
							   }: {
	languages: { id: string; code: string; name: string }[];
	dict: Dictionary;
}) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [code, setCode] = useState(languages[0]?.code ?? "");
	
	function proceed() {
		if (!code) {
			return;
		}
		setOpen(false);
		router.push(`/admin/papers/new?lang=${encodeURIComponent(code)}`);
	}
	
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="size-4"/>
					{dict.admin.addPaper}
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{dict.admin.pickLanguage}</DialogTitle>
					<DialogDescription>{dict.admin.pickLanguageHint}</DialogDescription>
				</DialogHeader>
				
				<Select value={code} onValueChange={setCode}>
					<SelectTrigger>
						<SelectValue/>
					</SelectTrigger>
					<SelectContent>
						{languages.map((l) => (
							<SelectItem key={l.id} value={l.code}>
								{l.name} ({l.code})
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				
				<DialogFooter>
					<Button variant="ghost" onClick={() => setOpen(false)}>
						{dict.admin.cancel}
					</Button>
					<Button onClick={proceed} disabled={!code}>
						{dict.admin.continue}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
