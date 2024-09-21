import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Make Portfolio</h2>
        <div className="flex flex-col gap-2">
          {[
            { href: "/make/profile", label: "Profile" },
            { href: "/make/experiences", label: "Experiences" },
            { href: "/make/educations", label: "Educations" },
            { href: "/make/projects", label: "Projects" },
            { href: "/make/skills", label: "Skills" },
            { href: "/make/achievements", label: "Achievements" },
            { href: "/make/socials", label: "Social Media" },
            { href: "/make/links", label: "Additional Links" },
          ].map((item) => (
            <Button key={item.href} asChild variant="outline">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <Separator className="my-4" />

          <Button asChild>
            <Link href="/make/preview">Demo Preview</Link>
          </Button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Link: <span className="font-semibold">your-portfolio-link-here</span>
        </p>
      </div>
    </div>
  );
}
