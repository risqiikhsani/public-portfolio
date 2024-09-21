import SocialIcons from "@/components/SocialIcons";
import { User } from "@/types/prisma";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function Theme1({ user }: { user: User }) {
  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 text-center">
        <Image
          src="/avatars/cat.png"
          alt="avatar"
          className="rounded-full border-4 border-indigo-500"
          width={128}
          height={128}
        />
        <h1 className="text-4xl font-bold">{user.fullname || user.name}</h1>
        <p className="text-gray-600">{user.bio}</p>
      </div>

      {/* Social Links */}
      <div className="mt-6 flex justify-center space-x-4">
        {user.socials.map((social) => (
          <Link
            key={social.id}
            href={social.url || "#"}
            target="_blank"
            className="text-indigo-500 hover:text-indigo-700"
          >
            <SocialIcons name={social.platform}/>
          </Link>
        ))}
      </div>

      {/* Links Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Links</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.links.map((link) => (
            <a
              key={link.id}
              href={link.url || "#"}
              className="block p-4 border rounded-lg shadow hover:bg-indigo-50 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Experience</h2>
        <div className="space-y-4">
          {user.experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 border rounded-lg shadow hover:bg-indigo-50 transition"
            >
              <h3 className="text-xl font-semibold">{exp.name}</h3>
              <p className="text-gray-600">{exp.description}</p>
              <p className="text-sm text-gray-500">
                {exp.place}, {exp.location} | {exp.type}
              </p>
              <p className="text-sm text-gray-500">
                {exp.start_time &&
                  format(new Date(exp.start_time), "MMM yyyy")}{" "}
                -
                {exp.end_time
                  ? format(new Date(exp.end_time), "MMM yyyy")
                  : "Present"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {user.skills.map((skill) => (
            <div
              key={skill.id}
              className="p-2 bg-indigo-500 text-white rounded-lg shadow"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
