import prisma from "@/lib/prisma";


export async function GET() {
    const result = await prisma.user.findMany({
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
    const { email,name,fullname,bio } = body;

    if (!name) {
        return new Response("Please provide name", { status: 400 });
    }

    if (!email) {
        return new Response("Please provide email", { status: 400 });
    }

    if (!fullname) {
        return new Response("Please provide full name", { status: 400 });
    }

    if (!bio) {
        return new Response("Please provide bio", { status: 400 });
    }
    
    try {
        const newCoupon = await prisma.user.create({
            data: {
                name,
                email,
                fullname,
                bio
            },
        });

        return new Response(JSON.stringify(newCoupon), {
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