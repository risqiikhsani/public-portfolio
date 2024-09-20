import prisma from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id),
            },
            include: {
                skills: true,
                experiences: true,
                socials: true,
                links: true,
            },
        });

        if (!user) {
            return new Response("user not found", { status: 404 });
        }

        return Response.json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        return new Response("Error getting user", { status: 500 });
    }
}

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//     const { id } = params;

//     try {
//         const deletedcoupon = await prisma.coupon.delete({
//             where: {
//                 id: parseInt(id),
//             },
//         });

//         if (!deletedcoupon) {
//             return new Response("coupon not found", { status: 404 });
//         }

//         return new Response("coupon deleted successfully");
//     } catch (error) {
//         console.error("Error deleting coupon:", error);
//         return new Response("Error deleting coupon", { status: 500 });
//     }
// }

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await request.json();
    const { name,fullname,bio,email } = body;

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                fullname,
                bio,
                email
            },
        });

        if (!updatedUser) {
            return new Response("user not found", { status: 404 });
        }

        return Response.json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        return new Response("Error updating user", { status: 500 });
    }
}