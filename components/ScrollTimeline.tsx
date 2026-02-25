'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { processSteps, type ProcessStep } from '@/lib/data/process';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Update progress based on scroll position
  const updateProgress = useCallback(() => {
    if (!containerRef.current) return;

    const firstPanel = panelRefs.current[0];
    const lastPanel = panelRefs.current[panelRefs.current.length - 1];

    if (!firstPanel || !lastPanel) return;

    const firstRect = firstPanel.getBoundingClientRect();
    const lastRect = lastPanel.getBoundingClientRect();

    // Calculate progress from first panel top to last panel bottom
    const startPos = firstRect.top;
    const endPos = lastRect.bottom;
    const totalDistance = endPos - startPos;

    const viewportCenter = window.innerHeight / 2;
    const scrolled = viewportCenter - startPos;

    const calculatedProgress = Math.max(0, Math.min(1, scrolled / totalDistance));
    setProgress(calculatedProgress);
  }, []);

  // IntersectionObserver to detect active panel
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = -1;
        let maxIndex = 0;

        entries.forEach((entry) => {
          const index = panelRefs.current.indexOf(entry.target as HTMLDivElement);
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxIndex = index;
          }
        });

        if (maxRatio > 0) {
          setActiveStep(maxIndex);
        }
      },
      {
        threshold: 0,
        rootMargin: '-40% 0px -50% 0px',
      }
    );

    panelRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll listener for progress calculation
  useEffect(() => {
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, [updateProgress]);

  const scrollToStep = (index: number) => {
    const panel = panelRefs.current[index];
    if (panel) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Left: Steps (Sticky) */}
            <div className="md:sticky md:top-20 md:h-fit space-y-12">
              {processSteps.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(idx)}
                  className="w-full text-left group"
                >
                  <motion.div
                    animate={{
                      opacity: idx === activeStep ? 1 : 0.5,
                      x: idx === activeStep ? 4 : 0,
                    }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all flex-shrink-0 ${
                          idx === activeStep
                            ? 'bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2'
                            : 'bg-secondary text-muted-foreground group-hover:bg-muted'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className={`font-bold transition-colors ${idx === activeStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </h3>
                        <p className="text-muted-foreground text-sm">{step.title}</p>
                      </div>
                    </div>
                  </motion.div>
                </button>
              ))}
            </div>

            {/* Right: Timeline & Content */}
            <div className="relative">
              {/* Vertical Line Container */}
              <div className="absolute -left-6 top-0 bottom-0 w-1 bg-border" />

              {/* Progress Line */}
              <motion.div
                ref={lineRef}
                className="absolute -left-6 top-0 w-1 bg-accent origin-top"
                style={{
                  height: `${Math.max(1, progress * 100)}%`,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', damping: 40, stiffness: 100 }
                }
              />

              {/* Timeline Dots (Aligned with Steps) */}
              <div className="absolute -left-6 top-0 pointer-events-none w-12 h-full">
                {processSteps.map((step, idx) => {
                  const panelElement = panelRefs.current[idx];
                  if (!panelElement) return null;

                  return (
                    <div
                      key={`dot-${step.id}`}
                      className="absolute left-0 w-full"
                      style={{
                        top: panelElement ? `${(panelElement as any).offsetTop}px` : 'auto',
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: idx <= activeStep ? 1.2 : 1,
                          boxShadow:
                            idx <= activeStep
                              ? '0 0 12px rgba(167, 139, 250, 0.5)'
                              : 'none',
                        }}
                        className={`absolute left-1/2 top-0 w-5 h-5 rounded-full border-2 -translate-x-1/2 -translate-y-1/2 transition-all ${
                          idx <= activeStep
                            ? 'bg-accent border-accent'
                            : 'bg-background border-accent'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Content Panels */}
              <div className="space-y-32 relative">
                {processSteps.map((step, idx) => (
                  <motion.div
                    key={step.id}
                    ref={(el) => {
                      if (el) panelRefs.current[idx] = el;
                    }}
                    animate={{
                      opacity: idx === activeStep ? 1 : 0.6,
                      y: idx === activeStep ? 0 : 8,
                    }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.4,
                      ease: 'easeOut',
                    }}
                    className="scroll-mt-24"
                  >
                    {/* Content Card */}
                    <div className="p-6 rounded-xl bg-card border-2 transition-colors will-change-auto"
                      style={{
                        borderColor: idx === activeStep ? 'var(--accent)' : 'var(--border)',
                      }}
                    >
                      <h4 className="text-xl font-bold text-foreground mb-2">{step.title}</h4>
                      <p className="text-muted-foreground mb-6">{step.description}</p>

                      {/* Details */}
                      <div className="space-y-3">
                        {step.details.map((detail, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: prefersReducedMotion ? 0 : 0.3,
                              delay: prefersReducedMotion ? 0 : i * 0.05,
                            }}
                            viewport={{ once: false }}
                            className="flex items-start gap-3 text-sm text-muted-foreground"
                          >
                            <span className="text-accent font-bold flex-shrink-0 mt-0.5">→</span>
                            <span>{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden mt-12">
            <div className="space-y-16 pl-12 relative">
              {/* Mobile Timeline Line */}
              <div className="absolute left-1.5 top-0 bottom-0 w-1 bg-border" />
              <motion.div
                className="absolute left-1.5 top-0 w-1 bg-accent origin-top"
                style={{
                  height: `${Math.max(1, progress * 100)}%`,
                }}
                transition={
                  prefersReducedMotion ? { duration: 0 } : { type: 'spring', damping: 40, stiffness: 100 }
                }
              />

              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  ref={(el) => {
                    if (el && !panelRefs.current[idx]) panelRefs.current[idx] = el;
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    delay: prefersReducedMotion ? 0 : idx * 0.1,
                  }}
                  viewport={{ once: false }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    animate={{
                      scale: idx <= activeStep ? 1.3 : 1,
                    }}
                    className={`absolute -left-10 top-0 w-4 h-4 rounded-full border-2 transition-all ${
                      idx <= activeStep
                        ? 'bg-accent border-accent'
                        : 'bg-background border-accent'
                    }`}
                  />

                  {/* Content */}
                  <div className={`p-4 rounded-lg border transition-all ${
                    idx === activeStep
                      ? 'bg-card border-accent'
                      : 'bg-secondary border-border'
                  }`}>
                    <h4 className="text-base font-bold text-foreground mb-2">
                      {step.label} — {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-3">{step.description}</p>
                    <div className="space-y-2">
                      {step.details.slice(0, 3).map((detail, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-muted-foreground"
                        >
                          <span className="text-accent flex-shrink-0 mt-0.5">→</span>
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
