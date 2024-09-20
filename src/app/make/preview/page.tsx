import ThemeChanger from "./_components/ThemeChanger";
import { User } from "@/types/prisma";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {
  const user_id = 1;

  const response = await fetch(`${URL}/api/portfolios/${user_id}`, {
    cache: "no-store",
  });
  const dynamicData: User = await response.json();

  return (
    <>
     <ThemeChanger user={dynamicData}/>
    </>
  );
}
