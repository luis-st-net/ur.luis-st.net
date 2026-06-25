import { prisma } from "@/lib/prisma";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const paper = await prisma.paper.findUnique({
		where: { id },
		select: { icon: true, iconMime: true },
	});
	
	if (!paper?.icon) {
		return new Response(null, { status: 404 });
	}
	
	return new Response(new Uint8Array(paper.icon), {
		headers: {
			"Content-Type": paper.iconMime ?? "application/octet-stream",
			"Cache-Control": "public, max-age=3600",
		},
	});
}
