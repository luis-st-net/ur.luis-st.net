"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { deletePaperAction } from "./actions";

export function DeletePaperButton({
									  paperId,
									  confirmText,
									  label,
								  }: {
	paperId: string;
	confirmText: string;
	label: string;
}) {
	const [pending, startTransition] = useTransition();
	
	function onDelete() {
		if (!window.confirm(confirmText)) {
			return;
		}
		const formData = new FormData();
		formData.set("paperId", paperId);
		startTransition(() => deletePaperAction(formData));
	}
	
	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={onDelete}
			disabled={pending}
			aria-label={label}
			className="text-ink-muted hover:text-red-600"
		>
			<Trash2 className="size-4"/>
		</Button>
	);
}
