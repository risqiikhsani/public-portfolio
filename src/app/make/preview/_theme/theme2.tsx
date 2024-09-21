import SocialIcons from "@/components/SocialIcons";
import { User } from "@/types/prisma";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function Theme2({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <Image
            src="/avatars/cat.png"
            alt="avatar"
            className="rounded-full border-4 border-gray-300"
            width={128}
            height={128}
          />
          <h1 className="text-3xl font-semibold text-gray-800">
            {user.fullname || user.name}
          </h1>
          <p className="text-gray-500">{user.bio}</p>
        </div>
      </div>

      {/* Content */}
      <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar with Social Links */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Social</h2>
          <ul className="space-y-2">
            {user.socials.map((social) => (
              <li key={social.id}>
                <Link href={social.url || "#"} target="_blank" className="flex items-center gap-2 font-bold">
                <SocialIcons name={social.platform} width={50} height={50}/> {social.platform}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links and Experiences */}
        <div className="lg:col-span-2 space-y-8">
          {/* Links Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url || "#"}
                  className="block p-4 bg-indigo-50 text-indigo-700 rounded-lg shadow hover:bg-indigo-100 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Experience
            </h2>
            <div className="space-y-4">
              {user.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="border-l-4 border-indigo-500 pl-4 py-2 bg-gray-50 rounded-md"
                >
                  <h3 className="text-lg font-semibold">{exp.name}</h3>
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
        </div>
      </div>

      {/* Skills Section */}
      <div className="mt-12 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {user.skills.map((skill) => (
            <div
              key={skill.id}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow"
            >
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
