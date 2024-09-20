import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-orange-600">Make Portfolio</h2>
        <div className="space-y-4">
          {[
            { href: "/make/profile", label: "Profile" },
            { href: "/make/experiences", label: "Experiences" },
            { href: "/make/educations", label: "Educations" },
            { href: "/make/projects", label: "Projects" },
            { href: "/make/skills", label: "Skills" },
            { href: "/make/achievements", label: "Achievements" },
            { href: "/make/socials", label: "Social Media" },
            { href: "/make/links", label: "Additional Links" },
            { href: "/make/preview", label: "Preview" }, 
          ].map((item) => (
            <Button
              key={item.href}
              asChild
              className="w-full bg-orange-500 hover:bg-orange-600 transition-colors"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </div>
        <p className="mt-6 text-center text-gray-600">
          Link: <span className="font-semibold">your-portfolio-link-here</span>
        </p>
      </div>
    </div>
  );
}