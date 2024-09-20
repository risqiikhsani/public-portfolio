import { User } from "@/types/prisma";
import { format } from "date-fns";
import Image from "next/image";

export default function Theme3({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12">
      {/* Profile Card */}
      <div className="relative max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        <div className="relative z-10 flex flex-col items-center p-8">
          <Image
            src="/avatars/cat.png"
            alt="Profile Picture"
            className="rounded-full border-4 border-white shadow-md"
            height={128}
            width={128}
          />
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            {user.fullname || user.name}
          </h1>
          <p className="text-gray-600 mt-2">{user.bio}</p>

          {/* Social Links */}
          <div className="mt-4 flex space-x-3">
            {user.socials.map((social) => (
              <a
                key={social.id}
                href={social.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-500 text-white rounded-full shadow hover:bg-indigo-600 transition"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Links Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            My Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {user.links.map((link) => (
              <a
                key={link.id}
                href={link.url || "#"}
                className="block p-4 bg-indigo-50 text-indigo-700 font-semibold text-center rounded-lg shadow-md hover:bg-indigo-100 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-4">
            {user.skills.map((skill) => (
              <div
                key={skill.id}
                className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-full shadow hover:bg-purple-600 transition"
              >
                {skill.name}
              </div>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Experience
          </h2>
          <div className="space-y-6">
            {user.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-6 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition"
              >
                <h3 className="text-xl font-bold text-indigo-600">
                  {exp.name}
                </h3>
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
  );
}
