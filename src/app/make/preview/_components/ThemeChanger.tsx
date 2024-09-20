"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from "@/types/prisma";
import Theme1 from "../_theme/theme1";
import Theme2 from "../_theme/theme2";
import Theme3 from "../_theme/theme3";
import Theme4 from "../_theme/theme4";

import { useEffect, useState } from "react";

export default function ThemeChanger({ user }: { user: User }) {
  const [theme, setTheme] = useState("theme1");

  const changeTheme = (value: string) => {
    setTheme(value);
  };

  useEffect(() => {
    // This effect can be used to handle theme change side-effects if needed
    console.log("Theme changed to:", theme);
  }, [theme]);

  return (
    <>
      <div className="relative min-h-screen bg-gray-50">
        {/* Conditionally Render Theme */}
        {theme === "theme1" && <Theme1 user={user} />}
        {theme === "theme2" && <Theme2 user={user} />}
        {theme === "theme3" && <Theme3 user={user} />}
        {theme === "theme4" && <Theme4 user={user} />}

        {/* Floating Navbar for Changing Theme */}
        <nav className="fixed bottom-10 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center bg-slate-800 opacity-70 rounded-2xl gap-2">
            <div className="text-2xl font-bold text-slate-100">
              Demo Preview
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button>Choose Style</Button>
                </SheetTrigger>
                <SheetContent className="bg-white">
                  <SheetHeader>
                    <SheetTitle>Change your portfolio style</SheetTitle>
                    <SheetDescription>
                      Select one of the styles below to preview your portfolio.
                    </SheetDescription>
                  </SheetHeader>

                  {/* Buttons to change themes */}
                  <div className="flex gap-2">
                    <SheetClose asChild>
                      <Button
                        className="my-2"
                        onClick={() => changeTheme("theme1")}
                      >
                        Bluelist
                      </Button>
                    </SheetClose>

                    <SheetClose asChild>
                    <Button
                      className="my-2"
                      onClick={() => changeTheme("theme2")}
                    >
                      Simpl blue
                    </Button>
                    </SheetClose>

                    <SheetClose asChild>
                    <Button
                      className="my-2"
                      onClick={() => changeTheme("theme3")}
                    >
                      Cool blue
                    </Button>
                    </SheetClose>

                    <SheetClose asChild>
                    <Button
                      className="my-2"
                      onClick={() => changeTheme("theme4")}
                    >
                      Cool blue 2
                    </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

              <Button>Save</Button>
              <Button>Share</Button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
