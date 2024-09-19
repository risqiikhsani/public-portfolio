import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const social = await prisma.social.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!social) {
            return new Response("social not found", { status: 404 });
        }

        return Response.json(social);
    } catch (error) {
        console.error("Error getting social:", error);
        return new Response("Error getting social", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletesocial = await prisma.social.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deletesocial) {
            return new Response("social not found", { status: 404 });
        }

        return new Response("social deleted successfully");
    } catch (error) {
        console.error("Error deleting social:", error);
        return new Response("Error deleting social", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { platform,url } = body;

    try {
        const updatedSocial = await prisma.social.update({
            where: {
                id: parseInt(id),
            },
            data: {
                platform,
                url
            },
        });

        if (!updatedSocial) {
            return new Response("user not found", { status: 404 });
        }

        return Response.json(updatedSocial);
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
    }
}