import prisma from "@/lib/prisma";


export async function GET() {
    const result = await prisma.social.findMany({
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
    const { platform,url } = body;

    const userId = 1

    if (!platform) {
        return new Response("Please provide platform", { status: 400 });
    }

    if (!url) {
        return new Response("Please provide url", { status: 400 });
    }
    
    try {
        const newsocial = await prisma.social.create({
            data: {
                platform,
                url,
                userId
            },
        });

        return new Response(JSON.stringify(newsocial), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating social:", error);
        return new Response("Error creating social", { status: 500 });
    }
}