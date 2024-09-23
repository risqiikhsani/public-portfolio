import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const experience = await prisma.experience.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!experience) {
            return new Response("experience not found", { status: 404 });
        }

        return Response.json(experience);
    } catch (error) {
        console.error("Error getting experience:", error);
        return new Response("Error getting experience", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deleteexperience = await prisma.experience.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deleteexperience) {
            return new Response("experience not found", { status: 404 });
        }

        return new Response("experience deleted successfully");
    } catch (error) {
        console.error("Error deleting experience:", error);
        return new Response("Error deleting experience", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { name,description,place,location,type,start_time,end_time } = body;

    try {
        const updatedExperience = await prisma.experience.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                description,
                place,
                location,
                type,
                start_time,
                end_time,
            },
        });

        if (!updatedExperience) {
            return new Response("Experience not found", { status: 404 });
        }

        return Response.json(updatedExperience);
    } catch (error) {
        console.error("Error updating Experience:", error);
        return new Response("Error updating Experience", { status: 500 });
    }
}