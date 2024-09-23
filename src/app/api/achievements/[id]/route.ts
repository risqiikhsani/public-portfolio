import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const achievement = await prisma.achievement.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!achievement) {
            return new Response("achievement not found", { status: 404 });
        }

        return Response.json(achievement);
    } catch (error) {
        console.error("Error getting achievement:", error);
        return new Response("Error getting achievement", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deleteachievement = await prisma.achievement.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deleteachievement) {
            return new Response("achievement not found", { status: 404 });
        }

        return new Response("achievement deleted successfully");
    } catch (error) {
        console.error("Error deleting achievement:", error);
        return new Response("Error deleting achievement", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { title,description,date,url } = body;

    try {
        const updatedAchievement = await prisma.achievement.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                description,
                date,
                url,
            },
        });

        if (!updatedAchievement) {
            return new Response("Achievement not found", { status: 404 });
        }

        return Response.json(updatedAchievement);
    } catch (error) {
        console.error("Error updating Achievement:", error);
        return new Response("Error updating Achievement", { status: 500 });
    }
}