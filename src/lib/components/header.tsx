import Link from "next/link";
import { FlaskConical, Shield } from "lucide-react";
import { Button } from "@/lib/components/ui/button";
import { LanguageSwitcher } from "@/lib/components/language-switcher";
import { ThemeSwitcher } from "@/lib/components/theme-switcher";
import { getI18n } from "@/lib/i18n/locale";

export async function Header() {
	const { locale, dict } = await getI18n();
	
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-base/85 backdrop-blur-md">
			<div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-4">
				<Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold text-ink">
					<FlaskConical className="size-5 text-accent"/>
					<span className="hidden xs:inline">{dict.site.name}</span>
					<span className="xs:hidden">UR</span>
				</Link>
				
				<nav className="flex items-center gap-1">
					<Button asChild variant="ghost" size="sm">
						<Link href="/">{dict.nav.home}</Link>
					</Button>
					<Button asChild variant="ghost" size="sm">
						<Link href="/about">{dict.nav.about}</Link>
					</Button>
					<Button asChild variant="ghost" size="sm">
						<Link href="/contact">{dict.nav.contact}</Link>
					</Button>
					
					<LanguageSwitcher locale={locale} label={dict.nav.language}/>
					<ThemeSwitcher label={dict.nav.theme} names={dict.theme}/>
					
					<Button asChild variant="outline" size="sm" className="ml-1">
						<Link href="/admin">
							<Shield className="size-4"/>
							<span className="hidden sm:inline">{dict.nav.admin}</span>
						</Link>
					</Button>
				</nav>
			</div>
		</header>
	);
}
