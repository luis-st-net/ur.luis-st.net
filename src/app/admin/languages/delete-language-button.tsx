"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { deleteLanguageAction } from "../actions";

export function DeleteLanguageButton({
										 id,
										 disabled,
										 label,
									 }: {
	id: string;
	disabled: boolean;
	label: string;
}) {
	const [pending, startTransition] = useTransition();
	
	function onDelete() {
		const formData = new FormData();
		formData.set("id", id);
		startTransition(() => deleteLanguageAction(formData));
	}
	
	return (
		<Button
			variant="ghost"
			size="sm"
			disabled={disabled || pending}
			onClick={onDelete}
			className="text-ink-muted hover:text-red-600"
		>
			<Trash2 className="size-4"/>
			{label}
		</Button>
	);
}
