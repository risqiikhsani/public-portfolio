"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Appbar() {
  return (
    <>
      <div className="flex items-center justify-between p-4 fixed w-full top-0 start-0 z-40 bg-gradient-to-r from-blue-200 to-blue-300 dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-900 shadow-xl">
        <Button>
          <Link href={"/home"}>Home</Link>
        </Button>
        <div className="flex-1"></div>
        <SignedOut>
          <Button asChild>
          <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
