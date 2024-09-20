import { User } from "@/types/prisma";
import Theme1 from "./_theme/theme1";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {
  const user_id = 1;

  const response = await fetch(`${URL}/api/portfolios/${user_id}`, {
    cache: "no-store",
  });
  const dynamicData: User = await response.json();

  return (
    <>
      <div className="relative min-h-screen bg-gray-50">
        <Theme1 user={dynamicData} />
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
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader>
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
