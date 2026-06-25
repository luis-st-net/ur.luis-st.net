"use client";

import * as React from "react";
import { cn } from "@/lib/utility";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				ref={ref}
				className={cn(
					"flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink shadow-sm transition-colors",
					"placeholder:text-ink-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
					"file:mr-3 file:rounded file:border-0 file:bg-ink/5 file:px-3 file:py-1 file:text-sm file:text-ink",
					"disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
