"use client";

import * as React from "react";
import { cn } from "@/lib/utility";

const Textarea = React.forwardRef<
	HTMLTextAreaElement,
	React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
	return (
		<textarea
			ref={ref}
			className={cn(
				"flex min-h-24 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink shadow-sm transition-colors",
				"placeholder:text-ink-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
				"disabled:cursor-not-allowed disabled:opacity-50",
				// keep author line breaks readable
				"whitespace-pre-wrap font-mono",
				className,
			)}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
