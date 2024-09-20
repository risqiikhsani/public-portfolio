import React from 'react';
import Image from 'next/image';
import { User } from '@/types/prisma';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 }
};

export default function Theme5({ user }: { user: User }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header Section */}
        <motion.header 
          className="text-center mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/avatars/cat.png"
            alt="avatar"
            className="rounded-full mx-auto mb-6"
            width={120}
            height={120}
          />
          <h1 className="text-4xl font-light mb-2">{user.fullname || user.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{user.bio}</p>
          <div className="flex justify-center space-x-4">
            {user.socials.map((social) => (
              <a
                key={social.id}
                href={social.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-800 transition-colors"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </motion.header>

        {/* Links Section */}
        <motion.section 
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-light mb-6 text-center">Featured Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.links.map((link, index) => (
              <motion.a
                key={link.id}
                href={link.url || "#"}
                className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-medium mb-2">{link.name}</h3>
                <p className="text-gray-600">{link.url || "View project"}</p>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section 
          className="mb-16"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-light mb-6 text-center">Experience</h2>
          <div className="space-y-8">
            {user.experiences.map((exp) => (
              <motion.div 
                key={exp.id} 
                className="border-l-2 border-gray-200 pl-4 ml-2"
                whileHover={{ x: 5 }}
              >
                <h3 className="text-xl font-medium">{exp.name}</h3>
                <p className="text-gray-600 mt-1">{exp.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {exp.place}, {exp.location} | {exp.type}
                </p>
                <p className="text-sm text-gray-500">
                  {exp.start_time && format(new Date(exp.start_time), "MMM yyyy")} - 
                  {exp.end_time ? format(new Date(exp.end_time), "MMM yyyy") : "Present"}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-light mb-6 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {user.skills.map((skill, index) => (
              <motion.span
                key={skill.id}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm"
                whileHover={{ scale: 1.1 }}
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
