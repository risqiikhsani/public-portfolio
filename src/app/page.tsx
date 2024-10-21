import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  // const user = await currentUser();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2>Welcome to Simple Portfolio Maker</h2>
      <Button variant="outline" className="m-4">
        <Link href={"/make"}>Make portfolio</Link>
      </Button>
      <h5>Total users : 100</h5>
      <h2 className="font-bold text-amber-900">Test</h2>
      <p>{"user id = " + userId}</p>
      {/* <p>{"user = " + JSON.stringify(user) }</p> */}
    </div>
  );
}
