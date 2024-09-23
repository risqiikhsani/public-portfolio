import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const project = await prisma.project.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!project) {
            return new Response("project not found", { status: 404 });
        }

        return Response.json(project);
    } catch (error) {
        console.error("Error getting project:", error);
        return new Response("Error getting project", { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deleteproject = await prisma.project.delete({
            where: {
                id: parseInt(id),
            },
        });

        if (!deleteproject) {
            return new Response("project not found", { status: 404 });
        }

        return new Response("project deleted successfully");
    } catch (error) {
        console.error("Error deleting project:", error);
        return new Response("Error deleting project", { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { name,description,url } = body;

    try {
        const updatedProject = await prisma.project.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                description,
                url
            },
        });

        if (!updatedProject) {
            return new Response("Project not found", { status: 404 });
        }

        return Response.json(updatedProject);
    } catch (error) {
        console.error("Error updating Project:", error);
        return new Response("Error updating Project", { status: 500 });
    }
}