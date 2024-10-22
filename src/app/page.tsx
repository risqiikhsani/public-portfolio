import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (userId) {
    redirect("/home")
    // Query DB for user specific information or display assets only to signed in users
  }

  // Get the Backend API User object when you need access to the user's information
  // const user = await currentUser();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2>Welcome to Simple Portfolio Maker</h2>
      <Button variant="outline" className="m-4">
        <Link href={"/home"}>Go to App</Link>
      </Button>
    </div>
  );
}
