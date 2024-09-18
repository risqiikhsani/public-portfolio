import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const skill = await prisma.skill.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!skill) {
            return new Response("skill not found", { status: 404 });
        }

        return Response.json(skill);
    } catch (error) {
        console.error("Error getting skill:", error);
        return new Response("Error getting skill", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deleteSkill = await prisma.skill.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deleteSkill) {
            return new Response("skill not found", { status: 404 });
        }

        return new Response("skill deleted successfully");
    } catch (error) {
        console.error("Error deleting skill:", error);
        return new Response("Error deleting skill", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { name,description } = body;

    try {
        const updatedUser = await prisma.skill.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                description
            },
        });

        if (!updatedUser) {
            return new Response("user not found", { status: 404 });
        }

        return Response.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
    }
}