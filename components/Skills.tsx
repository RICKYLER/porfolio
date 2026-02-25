'use client';

import { motion } from 'framer-motion';

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Development',
    skills: ['React.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'TailwindCSS', 'Responsive Design'],
  },
  {
    title: 'Web3 & Blockchain',
    skills: ['Web3.js', 'Ethers.js', 'Smart Contracts Basics', 'Wallet Interfaces', 'DeFi Concepts', 'Solidity'],
  },
  {
    title: 'Developer Tools',
    skills: ['Git/GitHub', 'Next.js', 'Node.js', 'Chrome Extensions', 'Figma', 'Framer Motion'],
  },
  {
    title: 'Backend & Databases',
    skills: ['Java', 'Python', 'SQL/MySQL', 'REST APIs', 'Database Design', 'Backend Basics'],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A comprehensive overview of my technical capabilities and professional expertise.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={item}
              className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-full text-sm font-medium bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Core Competencies Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20"
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Core Strengths</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground">Component Architecture</div>
                  <div className="text-sm text-muted-foreground">Building scalable, reusable component systems</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground">Web3 Integration</div>
                  <div className="text-sm text-muted-foreground">Smart contract interaction and wallet UI design</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground">UI/UX Implementation</div>
                  <div className="text-sm text-muted-foreground">Turning designs into performant interfaces</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-foreground">Performance & Accessibility</div>
                  <div className="text-sm text-muted-foreground">WCAG compliance and optimized experiences</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
