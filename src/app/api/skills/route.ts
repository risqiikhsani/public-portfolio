import prisma from "@/lib/prisma";


export async function GET() {
    const result = await prisma.skill.findMany({
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
    const { name,description } = body;

    const userId = 1

    if (!name) {
        return new Response("Please provide name", { status: 400 });
    }

    if (!description) {
        return new Response("Please provide description", { status: 400 });
    }

    
    try {
        const newskill = await prisma.skill.create({
            data: {
                name,
                description,
                userId
            },
        });

        return new Response(JSON.stringify(newskill), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating coupon:", error);
        return new Response("Error creating coupon", { status: 500 });
    }
}