import prisma from "@/lib/prisma";


export async function GET() {
    const result = await prisma.achievement.findMany({
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
    const { title,description,date,url } = body;

    const userId = 1

    if (!title) {
        return new Response("Please provide title", { status: 400 });
    }

    if (!description) {
        return new Response("Please provide description", { status: 400 });
    }

    if (!date) {
        return new Response("Please provide date", { status: 400 });
    }

    if (!url) {
        return new Response("Please provide url", { status: 400 });
    }


    
    try {
        const newachievement = await prisma.achievement.create({
            data: {
                title,
                description,
                date,
                url,
                userId,
            },
        });

        return new Response(JSON.stringify(newachievement), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating achievement:", error);
        return new Response("Error creating achievement", { status: 500 });
    }
}