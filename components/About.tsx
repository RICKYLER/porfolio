'use client';

import { motion } from 'framer-motion';

export function About() {
  const stats = [
    { label: 'Projects Completed', value: '5+' },
    { label: 'Web3 Experience', value: '2+' },
    { label: 'Tech Stack', value: '15+' },
  ];

  return (
    <section id="about" className="relative py-24 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About Me</h2>
          <div className="w-12 h-1 bg-accent rounded" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm an early-career software developer with a strong passion for crafting modern, responsive web
              experiences. My expertise spans React, TypeScript, and Web3 UI development—specializing in building
              interfaces that connect cutting-edge technology with intuitive user experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in tech has been fueled by curiosity and a drive to solve real problems. From smart contract
              security platforms to Web3 payment systems, I've had the opportunity to work on projects at the forefront
              of blockchain and decentralized technologies. I'm particularly motivated by challenges that require
              bridging the gap between complex technical systems and delightful user interfaces.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Currently, I'm focused on deepening my expertise in performance optimization, accessibility standards,
              and scalable component architecture. I'm actively seeking opportunities to collaborate with experienced
              mentors and contribute to innovative Web3 and AI projects.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-4 rounded-lg bg-card border border-border"
              >
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-4 rounded-lg bg-accent/10 border border-accent/20 space-y-3"
            >
              <div>
                <div className="text-sm text-muted-foreground mb-1">Location</div>
                <div className="font-semibold text-foreground">Philippines (UTC+8)</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Education</div>
                <div className="font-semibold text-foreground">BS Information Systems (3rd Year)</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
