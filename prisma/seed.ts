import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const languages = [
	{ code: "en", name: "English", translationKey: "en", sortOrder: 0 },
	{ code: "de", name: "Deutsch", translationKey: "de", sortOrder: 1 },
];

async function main() {
	for (const lang of languages) {
		await prisma.language.upsert({
			where: { code: lang.code },
			update: { name: lang.name, translationKey: lang.translationKey, sortOrder: lang.sortOrder },
			create: lang,
		});
	}
	console.log(`Seeded ${languages.length} languages.`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
