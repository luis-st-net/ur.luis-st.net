"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/lib/components/ui/button";
import { Input } from "@/lib/components/ui/input";
import { Textarea } from "@/lib/components/ui/textarea";
import { Label } from "@/lib/components/ui/label";
import { cn } from "@/lib/utility";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { buildContactFormSchema, buildVerificationFormSchema, type ContactFormValues, type VerificationFormValues } from "./schema";
import { initiateMailVerification, verifyAndSendContactMail } from "./actions";

export function ContactForm({ dict }: { dict: Dictionary }) {
	const t = dict.contact;
	
	const contactSchema = React.useMemo(() => buildContactFormSchema(t.validation), [t.validation]);
	const verificationSchema = React.useMemo(() => buildVerificationFormSchema(t.validation), [t.validation]);
	
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [verification, setVerification] = React.useState({ isVerifying: false, token: "" });
	
	const contactForm = useForm<ContactFormValues>({
		resolver: zodResolver(contactSchema),
		defaultValues: { name: "", mail: "", subject: "", message: "", acceptTerms: false, bot: true },
	});
	
	const verificationForm = useForm<VerificationFormValues>({
		resolver: zodResolver(verificationSchema),
		defaultValues: { verificationToken: "", verificationCode: "" },
	});
	
	function describe(code: string): string {
		const status = t.status as Record<string, string>;
		return status[code] ?? t.status.unexpected;
	}
	
	async function onContactSubmit(data: ContactFormValues) {
		setIsSubmitting(true);
		try {
			const result = await initiateMailVerification(data);
			if (result.success) {
				toast.success(t.status.verificationSentTitle, { description: t.status.verificationSentBody });
				verificationForm.reset({ verificationToken: result.verificationToken, verificationCode: "" });
				setVerification({ isVerifying: true, token: result.verificationToken });
			} else {
				toast.error(t.status.errorTitle, { description: describe(result.message) });
			}
		} catch {
			toast.error(t.status.errorTitle, { description: t.status.unexpected });
		} finally {
			setIsSubmitting(false);
		}
	}
	
	async function onVerificationSubmit(data: VerificationFormValues) {
		setIsSubmitting(true);
		try {
			const result = await verifyAndSendContactMail(data);
			if (result.success) {
				toast.success(t.status.successTitle, { description: t.status.successBody });
				setVerification({ isVerifying: false, token: "" });
				contactForm.reset();
				verificationForm.reset();
			} else {
				toast.error(t.status.errorTitle, { description: describe(result.message) });
			}
		} catch {
			toast.error(t.status.errorTitle, { description: t.status.unexpected });
		} finally {
			setIsSubmitting(false);
		}
	}
	
	function backToForm() {
		setVerification({ isVerifying: false, token: "" });
		verificationForm.reset();
	}
	
	if (verification.isVerifying) {
		const codeError = verificationForm.formState.errors.verificationCode?.message;
		return (
			<form onSubmit={verificationForm.handleSubmit(onVerificationSubmit)} className="mt-8 space-y-6">
				<div>
					<h2 className="font-serif text-2xl font-semibold text-ink">{t.verify.title}</h2>
					<p className="mt-1 text-sm text-ink-muted">{t.verify.description}</p>
				</div>
				
				<input type="hidden" {...verificationForm.register("verificationToken")} />
				
				<div className="space-y-2">
					<Label htmlFor="verificationCode">{t.verify.label}</Label>
					<Input
						id="verificationCode"
						inputMode="numeric"
						autoComplete="one-time-code"
						maxLength={6}
						placeholder={t.verify.placeholder}
						className="text-center font-mono text-lg tracking-[0.5em]"
						{...verificationForm.register("verificationCode")}
					/>
					<FieldError message={codeError}/>
				</div>
				
				<div className="flex items-center gap-3">
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? t.verify.submitting : t.verify.submit}
					</Button>
					<Button type="button" variant="ghost" onClick={backToForm} disabled={isSubmitting}>
						{t.verify.back}
					</Button>
				</div>
			</form>
		);
	}
	
	const errors = contactForm.formState.errors;
	return (
		<form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="mt-8 space-y-6">
			<div className="space-y-2">
				<Label htmlFor="name">{t.form.name}</Label>
				<Input id="name" placeholder={t.form.namePlaceholder} {...contactForm.register("name")} />
				<FieldError message={errors.name?.message}/>
			</div>
			
			<div className="space-y-2">
				<Label htmlFor="mail">{t.form.mail}</Label>
				<Input id="mail" type="email" placeholder={t.form.mailPlaceholder} {...contactForm.register("mail")} />
				<FieldError message={errors.mail?.message}/>
			</div>
			
			<div className="space-y-2">
				<Label htmlFor="subject">{t.form.subject}</Label>
				<Input id="subject" placeholder={t.form.subjectPlaceholder} {...contactForm.register("subject")} />
				<FieldError message={errors.subject?.message}/>
			</div>
			
			<div className="space-y-2">
				<Label htmlFor="message">{t.form.message}</Label>
				<Textarea id="message" placeholder={t.form.messagePlaceholder} className="min-h-32" {...contactForm.register("message")} />
				<FieldError message={errors.message?.message}/>
			</div>
			
			<div className="space-y-2">
				<CheckboxField id="acceptTerms" label={t.form.acceptTerms} {...contactForm.register("acceptTerms")} />
				<FieldError message={errors.acceptTerms?.message}/>
			</div>
			
			<CheckboxField id="bot" label={t.form.bot} {...contactForm.register("bot")} />
			
			<Button type="submit" className="w-full" disabled={isSubmitting}>
				{isSubmitting ? t.form.submitting : t.form.submit}
			</Button>
		</form>
	);
}

function FieldError({ message }: { message?: string }) {
	if (!message) {
		return null;
	}
	return <p className="text-sm text-red-600">{message}</p>;
}

const CheckboxField = React.forwardRef<
	HTMLInputElement,
	React.InputHTMLAttributes<HTMLInputElement> & { label: string; id: string }
>(({ label, id, className, ...props }, ref) => {
	return (
		<div className="flex items-start gap-3">
			<input
				ref={ref}
				id={id}
				type="checkbox"
				className={cn(
					"mt-0.5 size-4 shrink-0 cursor-pointer rounded border border-border bg-surface accent-accent",
					"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
					className,
				)}
				{...props}
			/>
			<Label htmlFor={id} className="cursor-pointer text-ink-muted">
				{label}
			</Label>
		</div>
	);
});
CheckboxField.displayName = "CheckboxField";
