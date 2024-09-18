import prisma from "@/lib/prisma";


export async function GET() {
    const result = await prisma.experience.findMany({
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
    const { name,description,place,location,type,start_time,end_time } = body;

    const userId = 1

    if (!name) {
        return new Response("Please provide name", { status: 400 });
    }

    if (!description) {
        return new Response("Please provide description", { status: 400 });
    }

    if (!place) {
        return new Response("Please provide place", { status: 400 });
    }

    if (!location) {
        return new Response("Please provide location", { status: 400 });
    }

    if(!type){
        return new Response("Please provide type", { status: 400 });
    }

    if(!start_time){
        return new Response("Please provide start_time", { status: 400 });
    }

    if(!end_time){
        return new Response("Please provide end_time", { status: 400 });
    }

    
    try {
        const newexperience = await prisma.experience.create({
            data: {
                name,
                description,
                place,
                location,
                type,
                start_time,
                end_time,
                userId,
            },
        });

        return new Response(JSON.stringify(newexperience), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating experience:", error);
        return new Response("Error creating experience", { status: 500 });
    }
}