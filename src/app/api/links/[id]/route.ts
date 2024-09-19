import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const link = await prisma.link.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!link) {
            return new Response("link not found", { status: 404 });
        }

        return Response.json(link);
    } catch (error) {
        console.error("Error getting link:", error);
        return new Response("Error getting link", { status: 500 });
    }
}



export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletelink = await prisma.link.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deletelink) {
            return new Response("link not found", { status: 404 });
        }

        return new Response("link deleted successfully");
    } catch (error) {
        console.error("Error deleting link:", error);
        return new Response("Error deleting link", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { name,url } = body;

    try {
        const updatedlink = await prisma.link.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                url
            },
        });

        if (!updatedlink) {
            return new Response("link not found", { status: 404 });
        }

        return Response.json(updatedlink);
    } catch (error) {
        console.error("Error updating link:", error);
        return new Response("Error updating link", { status: 500 });
    }
}