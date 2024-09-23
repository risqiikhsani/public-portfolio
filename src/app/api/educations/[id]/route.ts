import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const education = await prisma.education.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!education) {
            return new Response("education not found", { status: 404 });
        }

        return Response.json(education);
    } catch (error) {
        console.error("Error getting education:", error);
        return new Response("Error getting education", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deleteeducation = await prisma.education.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deleteeducation) {
            return new Response("education not found", { status: 404 });
        }

        return new Response("education deleted successfully");
    } catch (error) {
        console.error("Error deleting education:", error);
        return new Response("Error deleting education", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { school,degree,field,description,start_date,end_date } = body;

    try {
        const updatedEducation = await prisma.education.update({
            where: {
                id: parseInt(id),
            },
            data: {
                school,
                degree,
                field,
                description,
                start_date,
                end_date,
            },
        });

        if (!updatedEducation) {
            return new Response("Education not found", { status: 404 });
        }

        return Response.json(updatedEducation);
    } catch (error) {
        console.error("Error updating Education:", error);
        return new Response("Error updating Education", { status: 500 });
    }
}