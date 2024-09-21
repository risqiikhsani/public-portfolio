import React from 'react';
import Image from 'next/image';
import { User } from '@/types/prisma';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Code } from 'lucide-react';

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export default function Theme6({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header Section */}
        <motion.header 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              {user.fullname || user.name}
            </h1>
            <p className="text-xl text-gray-400 mb-6">{user.bio}</p>
            <div className="flex space-x-4">
              {user.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            <Image
            src="/avatars/cat.png"
            alt="avatar"
            className="rounded-full mx-auto mb-6"
            width={300}
            height={300}
            />
          </div>
        </motion.header>

        {/* Featured Projects Section */}
        <motion.section 
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Code className="mr-2" /> Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {user.links.map((link) => (
              <motion.a
                key={link.id}
                href={link.url || "#"}
                className="block p-6 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors flex items-center justify-between">
                  {link.name}
                  <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-400">{link.url || "View project"}</p>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center">
            <Briefcase className="mr-2" /> Experience
          </h2>
          <div className="space-y-8">
            {user.experiences.map((exp) => (
              <motion.div 
                key={exp.id} 
                className="bg-gray-900 rounded-lg p-6"
                whileHover={{ x: 10 }}
              >
                <h3 className="text-2xl font-semibold text-purple-400">{exp.name}</h3>
                <p className="text-gray-400 mt-2">{exp.description}</p>
                <div className="flex justify-between mt-4 text-sm text-gray-500">
                  <span>{exp.place}, {exp.location} | {exp.type}</span>
                  <span>
                    {exp.start_time && format(new Date(exp.start_time), "MMM yyyy")} - 
                    {exp.end_time ? format(new Date(exp.end_time), "MMM yyyy") : "Present"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-4">
            {user.skills.map((skill, index) => (
              <motion.span
                key={skill.id}
                className="px-4 py-2 bg-purple-900 text-purple-200 rounded-full text-sm font-medium"
                whileHover={{ scale: 1.1, backgroundColor: "#4C1D95" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}