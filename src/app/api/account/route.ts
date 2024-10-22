import prisma from "@/lib/prisma";
import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Get Clerk authentication
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current user data from Clerk
    const clerkUser = await currentUser();
    
    if (!clerkUser) {
      return NextResponse.json(
        { error: 'User data not found' },
        { status: 404 }
      );
    }

    // Get primary email
    const primaryEmail = clerkUser.emailAddresses.find(
      email => email.id === clerkUser.primaryEmailAddressId
    )?.emailAddress;

    if (!primaryEmail) {
      return NextResponse.json(
        { error: 'Email not found' },
        { status: 400 }
      );
    }

    // Create or update user in database
    const user = await prisma.user.upsert({
      where: { 
        clerk_id: userId
      },
      update: { 
        email: primaryEmail,
        // Add any other fields you want to update
      },
      create: {
        clerk_id: userId,
        email: primaryEmail,
        // Add any other fields required for user creation
      },
    });

    return NextResponse.json(user);

  } catch (error) {
    console.error('Error in user creation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}