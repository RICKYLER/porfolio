'use client';

import { motion } from 'framer-motion';

interface Testimonial {
  text: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    text: 'Ricky demonstrated exceptional problem-solving skills when building the scanner UI for our security platform. His attention to detail and ability to translate complex requirements into intuitive interfaces stood out. He would be a valuable addition to any team.',
    author: 'Team Lead',
    role: 'Smart Contract Security Platform',
  },
  {
    text: 'Working with Ricky on the Web3 payment system was great. He quickly grasped blockchain concepts and built responsive, user-friendly interfaces for wallet integration. His initiative to learn and improve is commendable.',
    author: 'Product Manager',
    role: 'Web3 Payment Platform',
  },
  {
    text: 'Ricky shows strong technical foundation in React and TypeScript. His code is clean, well-organized, and follows best practices. He is proactive in learning new technologies and collaborating with team members.',
    author: 'Senior Developer',
    role: 'Technical Mentor',
  },
];

export function Testimonials() {
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

  return (
    <section id="testimonials" className="relative py-24 px-4 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">What Others Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Kind words from colleagues, mentors, and collaborators. (Sample testimonials - can be updated with real feedback)
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    className="w-5 h-5 text-accent fill-current"
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </motion.svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4 text-lg">
            Ready to collaborate or need more information?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
}
