import Link from "next/link";
import { getI18n } from "@/lib/i18n/locale";

export async function Footer() {
	const { dict } = await getI18n();
	const year = new Date().getFullYear();
	
	return (
		<footer className="mt-16 border-t border-border">
			<div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-ink-muted sm:flex-row">
				<p>
					© {year} {dict.site.name}. {dict.footer.rights}
				</p>
				<nav className="flex items-center gap-4">
					<Link href="/imprint" className="hover:text-ink">
						{dict.footer.imprint}
					</Link>
					<Link href="/data-policy" className="hover:text-ink">
						{dict.footer.dataPolicy}
					</Link>
				</nav>
			</div>
		</footer>
	);
}
