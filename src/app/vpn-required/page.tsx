import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { getI18n } from "@/lib/i18n/locale";

export default async function VpnRequiredPage() {
	const { dict } = await getI18n();
	
	return (
		<div className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-4 py-16 text-center">
			<span className="flex size-20 items-center justify-center rounded-full bg-accent/10 text-accent">
				<ShieldAlert className="size-10"/>
			</span>
			<h1 className="mt-6 font-serif text-3xl font-semibold text-ink">{dict.vpn.title}</h1>
			<p className="mt-3 text-ink-muted">{dict.vpn.text}</p>
			
			<div className="mt-8 flex flex-col gap-2 sm:flex-row">
				<Button asChild variant="outline">
					<Link href="/">{dict.vpn.back}</Link>
				</Button>
				<Button asChild>
					<Link href="/admin">{dict.vpn.continue}</Link>
				</Button>
			</div>
		</div>
	);
}
