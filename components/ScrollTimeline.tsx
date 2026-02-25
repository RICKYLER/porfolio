'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { processSteps, type ProcessStep } from '@/lib/data/process';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight / 2 - containerTop) / (containerHeight - windowHeight / 2))
      );
      setProgress(scrollProgress);

      // Determine active step based on scroll position
      const stepsCount = processSteps.length;
      const calculatedStep = Math.floor(scrollProgress * stepsCount);
      setActiveStep(Math.min(calculatedStep, stepsCount - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStepVariants = (index: number, isActive: boolean) => ({
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : -30,
    },
    visible: {
      opacity: isActive ? 1 : 0.5,
      x: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1,
      },
    },
  });

  return (
    <section id="process" className="relative py-24 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">My Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Scroll down to see how I approach projects from discovery to launch
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {/* Left: Steps */}
            <div className="space-y-8">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  variants={getStepVariants(idx, idx === activeStep)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className={`transition-all ${idx === activeStep ? 'opacity-100' : 'opacity-60'}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                        idx === activeStep
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.label}</h3>
                      <p className="text-muted-foreground text-sm">{step.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Timeline Visualization with Dots */}
            <div className="relative">
              {/* Vertical Line Background */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-border" />

              {/* Progress Line - starts from top and extends down based on scroll */}
              <motion.div
                className="absolute left-0 top-0 w-1 bg-accent origin-top"
                style={{
                  height: `${Math.max(2, progress * 100)}%`,
                }}
                transition={
                  prefersReducedMotion ? { type: 'tween', duration: 0 } : { type: 'spring', damping: 30, stiffness: 100 }
                }
              />

              {/* Timeline Dots */}
              <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
                {processSteps.map((step, idx) => (
                  <motion.div
                    key={`dot-${step.id}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    viewport={{ once: false }}
                    style={{
                      top: `${(idx / processSteps.length) * 100}%`,
                      left: 0,
                    }}
                    className={`absolute w-5 h-5 rounded-full border-2 -translate-x-2 -translate-y-1/2 transition-all ${
                      idx <= activeStep
                        ? 'bg-accent border-accent'
                        : 'bg-background border-accent'
                    }`}
                  />
                ))}
              </div>

              {/* Steps with Content */}
              <div className="space-y-16 pl-8 relative">
                {processSteps.map((step, idx) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.5,
                      delay: prefersReducedMotion ? 0 : idx * 0.1,
                    }}
                    viewport={{ once: false }}
                    className={`transition-all relative ${idx <= activeStep ? 'opacity-100' : 'opacity-50'}`}
                  >
                    {/* Content Card */}
                    <motion.div
                      animate={{
                        borderColor: idx <= activeStep ? 'var(--accent)' : 'var(--border)',
                      }}
                      className="p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors"
                    >
                      <h4 className="text-xl font-bold text-foreground mb-2">{step.title}</h4>
                      <p className="text-muted-foreground mb-4">{step.description}</p>

                      {/* Details */}
                      <div className="space-y-2">
                        {step.details.map((detail, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: prefersReducedMotion ? 0 : 0.1 + i * 0.05 }}
                            viewport={{ once: false }}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <span className="text-accent font-bold flex-shrink-0">→</span>
                            <span>{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden mt-12">
            <div className="space-y-8">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                  className="relative pl-12"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-0 w-3 h-3 bg-accent rounded-full" />
                  {idx < processSteps.length - 1 && (
                    <div className="absolute left-1 top-3 w-0.5 h-12 bg-border" />
                  )}

                  {/* Content */}
                  <div className="p-4 rounded-lg bg-secondary">
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {step.label} — {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                    <div className="space-y-2">
                      {step.details.slice(0, 2).map((detail, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-accent flex-shrink-0">•</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
