import { prisma } from "@/lib/prisma";

/**
 * Streams the PDF for a given paper + language. The language is selected via
 * `?lang=<code>`; without it the first available translation is used.
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const lang = new URL(req.url).searchParams.get("lang");
	
	const translation = await prisma.paperTranslation.findFirst({
		where: {
			paperId: id,
			...(lang ? { language: { code: lang } } : {}),
		},
		select: { pdf: true, pdfFileName: true, title: true, language: { select: { code: true } } },
		orderBy: { createdAt: "asc" },
	});
	
	if (!translation) {
		return new Response(null, { status: 404 });
	}
	
	const safeTitle = translation.title.replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "") || "paper";
	const fileName = translation.pdfFileName || `${safeTitle}-${translation.language.code}.pdf`;
	
	return new Response(new Uint8Array(translation.pdf), {
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `attachment; filename="${fileName}"`,
		},
	});
}
