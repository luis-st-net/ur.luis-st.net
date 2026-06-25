import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Lora } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Header } from "@/lib/components/header";
import { Footer } from "@/lib/components/footer";
import { getLocale } from "@/lib/i18n/locale";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Lora({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
	title: {
		default: "Unserious Research",
		template: "%s · Unserious Research",
	},
	description: "Unreasonably thorough answers to questions nobody asked.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = await getLocale();
	
	return (
		<html lang={locale} className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
		<body className="flex min-h-screen flex-col">
		<Header/>
		<main className="flex-1">{children}</main>
		<Footer/>
		<Toaster
			position="bottom-right"
			toastOptions={{
				classNames: {
					toast: "!bg-surface !text-ink !border-border",
					description: "!text-ink-muted",
				},
			}}
		/>
		</body>
		</html>
	);
}
