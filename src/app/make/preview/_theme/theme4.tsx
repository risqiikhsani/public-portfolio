import SocialIcons from '@/components/SocialIcons';
import { User } from '@/types/prisma';
import { format } from 'date-fns';
import Image from 'next/image';



export default function Theme4({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="flex items-center mb-8 md:mb-0">
            <Image
              src="/avatars/cat.png"
              alt="avatar"
              className="rounded-full border-4 border-teal-500"
              width={100}
              height={100}
            />
            <div className="ml-6">
              <h1 className="text-4xl font-bold text-teal-400">{user.fullname || user.name}</h1>
              <p className="text-xl text-gray-400 mt-2">{user.bio}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            {user.socials.map((social) => (
              <a
                key={social.id}
                href={social.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <SocialIcons name={social.platform} />
              </a>
            ))}
          </div>
        </header>

        {/* Links Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-teal-400">Additional Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.links.map((link) => (
              <a
                key={link.id}
                href={link.url || "#"}
                className="block p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-all transform hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h3 className="text-xl font-semibold mb-2">{link.name}</h3>
                <p className="text-gray-400">{link.url || "Check out this link!"}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-teal-400">Professional Experience</h2>
          <div className="space-y-8">
            {user.experiences.map((exp) => (
              <div key={exp.id} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-teal-400">{exp.name}</h3>
                <p className="text-gray-400 mt-2">{exp.description}</p>
                <div className="flex justify-between mt-4 text-sm text-gray-500">
                  <span>{exp.place}, {exp.location} | {exp.type}</span>
                  <span>
                    {exp.start_time && format(new Date(exp.start_time), "MMM yyyy")} - 
                    {exp.end_time ? format(new Date(exp.end_time), "MMM yyyy") : "Present"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-teal-400">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-4">
            {user.skills.map((skill) => (
              <span
                key={skill.id}
                className="px-4 py-2 bg-teal-500 text-gray-900 rounded-full text-sm font-medium"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}