import prisma from "@/lib/prisma";


export async function GET() {
    const result = await prisma.project.findMany({
        // include: {
        //     _count: {
        //         select: {
        //             hasil_response: true
        //         }
        //     }
        // }
    })
    return Response.json(result)
}


export async function POST(request: Request) {
    const body = await request.json();
    const { name,description,url } = body;

    const userId = 1

    if (!name) {
        return new Response("Please provide name", { status: 400 });
    }

    if (!description) {
        return new Response("Please provide description", { status: 400 });
    }

    if (!url) {
        return new Response("Please provide url", { status: 400 });
    }


    
    try {
        const newproject = await prisma.project.create({
            data: {
                name,
                description,
                url,
                userId,
            },
        });

        return new Response(JSON.stringify(newproject), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating project:", error);
        return new Response("Error creating project", { status: 500 });
    }
}