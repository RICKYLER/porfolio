'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, categories, type Category } from '@/lib/data/projects';

export function Experience() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const filteredProjects =
    activeCategory === 'all' ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="experience" className="relative py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Experience & Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Notable projects showcasing my expertise in frontend development and Web3 technologies.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                activeCategory === category
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-all group cursor-pointer ${
                  project.featured ? 'md:col-span-2' : ''
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                          Featured
                        </span>
                      )}
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          project.status === 'production'
                            ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}
                      >
                        {project.status === 'production' ? 'Production' : 'Personal'}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>
                </div>

                {/* Bullets */}
                <div className="mb-6 space-y-2">
                  {project.bullets.slice(0, 3).map((bullet, i) => (
                    <div key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="text-accent flex-shrink-0">•</span>
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded bg-accent/10 text-accent border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Interested in learning more about a specific project or collaboration?
          </p>
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Let's Discuss
          </a>
        </motion.div>
      </div>
    </section>
  );
}
