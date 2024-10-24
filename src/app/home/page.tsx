import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function Page() {

  const response = await fetch(`${URL}/api/portfolios`,{ cache: 'no-store' })
  const user: User[] = await response.json()

  const { userId } = auth();

  if (!userId) {
    return <div>Please sign in</div>;
  }



  const cardData = [
    {
      title: "Make a portfolio website",
      description: "Make your portfolio website without coding or deploying, we provide you a style with one click to choose from.",
      image: "/pictures/a1.png",
      link: "/make"
    },
    {
      title: "Resume AI Polisher",
      description: "Generate an important text for your resume using AI",
      image: "/pictures/a2.png",
      link: "/make"
    },
    {
      title: "Make All in one link website",
      description: "Make all in one link to share globally",
      image: "/pictures/a3.png",
      link: "/make"
    }
  ];

  return (
    <div className="md:container md:mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {cardData.map((card, index) => (
        <Card key={index} className="shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {/* Fixed image size for consistent layout */}
            <div className="w-full h-[250px] relative">
              <Image
                src={card.image}
                layout="fill" // Ensures the image fills the container
                objectFit="cover" // Ensures the image is properly scaled
                alt={card.title}
                className="rounded-md"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" className="m-4">
              <Link href={card.link}>Make now</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
      <div className="flex flex-col">
      {user.map((a,i) => (
          <div key={i} className="p-2 border-2 bg-gray-500"> 
            {a.id}
            {a.email}
            {a.clerk_id}
          </div>
      ))}
      </div>
      
    </div>
  );
}
