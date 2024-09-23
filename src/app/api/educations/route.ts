import prisma from "@/lib/prisma";


export async function GET() {
    const result = await prisma.education.findMany({
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
    const { school,degree,field,description,start_date,end_date } = body;

    const userId = 1

    if (!school) {
        return new Response("Please provide school", { status: 400 });
    }

    if (!degree) {
        return new Response("Please provide degree", { status: 400 });
    }

    if (!field) {
        return new Response("Please provide field", { status: 400 });
    }

    if (!description) {
        return new Response("Please provide description", { status: 400 });
    }

    if(!start_date){
        return new Response("Please provide start_date", { status: 400 });
    }

    if(!end_date){
        return new Response("Please provide end_date", { status: 400 });
    }

    
    try {
        const neweducation = await prisma.education.create({
            data: {
                school,
                description,
                degree,
                field,
                start_date,
                end_date,
                userId,
            },
        });

        return new Response(JSON.stringify(neweducation), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error creating education:", error);
        return new Response("Error creating education", { status: 500 });
    }
}