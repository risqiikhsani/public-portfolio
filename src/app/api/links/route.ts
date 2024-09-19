import prisma from "@/lib/prisma";


export async function GET() {
    const result = await prisma.link.findMany({
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
    const { name,url } = body;

    const userId = 1

    if (!name) {
        return new Response("Please provide name", { status: 400 });
    }

    if (!url) {
        return new Response("Please provide url", { status: 400 });
    }
    
    try {
        const newlink = await prisma.link.create({
            data: {
                name,
                url,
                userId
            },
        });

        return new Response(JSON.stringify(newlink), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating link:", error);
        return new Response("Error creating link", { status: 500 });
    }
}