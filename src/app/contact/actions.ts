"use server";

import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { contactFormSchema, type ContactFormValues, verificationFormSchema, type VerificationFormValues } from "./schema";
import { generateVerificationCode, generateVerificationToken, verifyToken } from "@/lib/verification-token";

const contactTransporter = nodemailer.createTransport({
	host: process.env.CONTACT_SMTP_HOST,
	port: Number(process.env.CONTACT_SMTP_PORT),
	secure: process.env.CONTACT_SMTP_SECURE === "true",
	auth: {
		user: process.env.CONTACT_SMTP_USER,
		pass: process.env.CONTACT_SMTP_PASSWORD,
	},
});

const verificationTransporter = nodemailer.createTransport({
	host: process.env.VERIFICATION_SMTP_HOST,
	port: Number(process.env.VERIFICATION_SMTP_PORT),
	secure: process.env.VERIFICATION_SMTP_SECURE === "true",
	auth: {
		user: process.env.VERIFICATION_SMTP_USER,
		pass: process.env.VERIFICATION_SMTP_PASSWORD,
	},
});

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

export async function initiateMailVerification(contactData: ContactFormValues) {
	try {
		const result = contactFormSchema.safeParse(contactData);
		if (!result.success) {
			return { success: false, verificationToken: "", message: "validation" };
		}
		if (contactData.bot === true) {
			return { success: false, verificationToken: "", message: "bot" };
		}
		
		const verificationCode = generateVerificationCode();
		const token = generateVerificationToken({
			mail: contactData.mail,
			code: verificationCode,
			formData: contactData,
		});
		
		const mailOptions: Mail.Options = {
			from: process.env.VERIFICATION_SMTP_USER,
			to: contactData.mail,
			subject: "Unserious Research – verification code " + verificationCode,
			text: `Your verification code is: ${verificationCode}\nThis code will expire in 15 minutes.`,
			html: `
				<div>
					<h2>Mail verification</h2>
					<p>Your verification code is: <strong>${verificationCode}</strong></p>
					<p>This code will expire in 15 minutes.</p>
				</div>
			`,
		};
		
		await verificationTransporter.sendMail(mailOptions);
		
		return {
			success: true,
			verificationToken: token,
			message: "sent",
		};
	} catch (error) {
		console.error("Error initiating verification:", error);
		return { success: false, verificationToken: "", message: "failed" };
	}
}

export async function verifyAndSendContactMail(verificationData: VerificationFormValues) {
	try {
		const result = verificationFormSchema.safeParse(verificationData);
		if (!result.success) {
			return { success: false, message: "validation" };
		}
		
		const payload = verifyToken(verificationData.verificationToken);
		if (!payload) {
			return { success: false, message: "expired" };
		}
		if (payload.code !== verificationData.verificationCode) {
			return { success: false, message: "invalidCode" };
		}
		
		const data = payload.formData as ContactFormValues;
		const recipient = process.env.CONTACT_MAIL_TO || process.env.CONTACT_SMTP_USER;
		
		const mailOptions: Mail.Options = {
			from: `"${data.name} via Contact Form" <${process.env.CONTACT_SMTP_USER}>`,
			to: recipient,
			replyTo: data.mail,
			subject: `Contact Form: ${data.subject}`,
			text: `Name: ${data.name}\nMail: ${data.mail}\n\n${data.message}`,
			html: `
				<div>
					<p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
					<p><strong>Mail:</strong> ${escapeHtml(data.mail)}</p>
					<p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
					<p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
				</div>
			`,
		};
		
		await contactTransporter.sendMail(mailOptions);
		
		return { success: true, message: "sent" };
	} catch (error) {
		console.error("Error sending mail:", error);
		return { success: false, message: "failed" };
	}
}
