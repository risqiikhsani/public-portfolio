import { Button } from "@/components/ui/button";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {
    const response = await fetch(`${URL}/api/portfolios`, { cache: 'no-store' });
    const dynamicData = await response.json();
    
    return (
      <div className="flex flex-col justify-center items-center gap-2 mx-auto container">
        {dynamicData.map((portfolio) => (
          <Button key={portfolio.id} variant="secondary" className="w-full bg-cyan-400" asChild>
            <Link href={`/user/${portfolio.id}`}>name: {portfolio.name}</Link>
          </Button>
        ))}
      </div>  
    );
  }