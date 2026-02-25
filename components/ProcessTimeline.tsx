'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

type Step = {
  id: 'discovery' | 'design' | 'build' | 'launch';
  number: string;
  title: string;
  subtitle: string;
  heading: string;
  description: string;
  bullets: string[];
};

const STEPS: Step[] = [
  {
    id: 'discovery',
    number: '1',
    title: 'Discovery',
    subtitle: 'Understanding Requirements & Constraints',
    heading: 'Understanding Requirements & Constraints',
    description:
      'Every project begins with deep discovery. I align with stakeholders on goals, technical constraints, and user needs to ensure we build the right solution.',
    bullets: [
      'Gather requirements and project scope',
      'Define success metrics and KPIs',
      'Identify technical constraints and opportunities',
      'Establish timeline and resource allocation',
      'Create project roadmap and milestones',
    ],
  },
  {
    id: 'design',
    number: '2',
    title: 'Design',
    subtitle: 'Wireframes, Components & UX Architecture',
    heading: 'Wireframes, Components & UX Architecture',
    description:
      'Strategic design phase where I create component systems, wireframes, and interactive prototypes. Focus on reusability, accessibility, and user experience.',
    bullets: [
      'Create wireframes and user flows',
      'Design component library and design system',
      'Build interactive prototypes in Figma',
      'Define UX architecture and navigation',
      'Validate designs with feedback loops',
    ],
  },
  {
    id: 'build',
    number: '3',
    title: 'Build',
    subtitle: 'React/TypeScript Implementation & Integration',
    heading: 'React/TypeScript Implementation & Integration',
    description:
      'I translate designs into scalable UI using clean architecture, reusable components, and stable integrations for real-world data.',
    bullets: [
      'Build reusable components in React + TS',
      'Integrate APIs and state management',
      'Ensure responsiveness across devices',
      'Implement accessibility best practices',
      'Add performance optimizations',
    ],
  },
  {
    id: 'launch',
    number: '4',
    title: 'Launch',
    subtitle: 'Performance, Accessibility & Deployment',
    heading: 'Performance, Accessibility & Deployment',
    description:
      'Final polish and production launch. I test, optimize, and deploy with confidence—ensuring fast load, accessibility, and maintainability.',
    bullets: [
      'Optimize Core Web Vitals',
      'Cross-browser and device testing',
      'Accessibility audit (WCAG basics)',
      'Deploy to production (Vercel/Netlify)',
      'Monitor and iterate after launch',
    ],
  },
];

export function ProcessTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollTopRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [revealedIndex, setRevealedIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Detect scroll direction and update revealedIndex
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const scrollTop = scrollContainerRef.current.scrollTop;

    // Detect scroll direction
    if (scrollTop > lastScrollTopRef.current) {
      // Scrolling DOWN: reveal the active panel
      setRevealedIndex((prev) => Math.max(prev, activeIndex));
    } else {
      // Scrolling UP: collapse to active index only
      setRevealedIndex(activeIndex);
    }

    lastScrollTopRef.current = scrollTop;
  }, [activeIndex]);

  // Update progress with requestAnimationFrame
  const updateProgress = useCallback(() => {
    if (!scrollContainerRef.current || panelRefs.current.length === 0) {
      rafRef.current = requestAnimationFrame(updateProgress);
      return;
    }

    const firstPanel = panelRefs.current[0];
    const lastPanel = panelRefs.current[panelRefs.current.length - 1];

    if (!firstPanel || !lastPanel) {
      rafRef.current = requestAnimationFrame(updateProgress);
      return;
    }

    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
    const totalScrollHeight = container.scrollHeight - containerHeight;

    const calculatedProgress = Math.max(0, Math.min(1, scrollTop / totalScrollHeight));
    setProgress(calculatedProgress);

    rafRef.current = requestAnimationFrame(updateProgress);
  }, []);

  // Setup IntersectionObserver
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
          setActiveIndex(maxIndex);
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5,
        rootMargin: '-40% 0px -50% 0px',
      }
    );

    observerRef.current = observer;

    panelRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Start RAF for progress updates
  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateProgress);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateProgress]);

  // Handle step click
  const handleStepClick = (index: number) => {
    if (index > revealedIndex) return; // Can't click hidden steps

    const panel = panelRefs.current[index];
    if (panel && scrollContainerRef.current) {
      const behavior = prefersReducedMotion ? 'auto' : 'smooth';
      panel.scrollIntoView({ behavior: behavior as ScrollBehavior, block: 'start' });
    }
  };

  return (
    <section id="process" className="relative py-20 px-4 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">My Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Scroll down to see how I approach projects from discovery to launch
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Steps (Sticky) */}
          <div className="md:sticky md:top-20 md:h-fit">
            <div className="space-y-6">
              {STEPS.map((step, index) => {
                const isHidden = index > revealedIndex;
                const isActive = index === activeIndex;
                const isRevealed = index <= revealedIndex;

                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(index)}
                    disabled={isHidden}
                    className={`w-full text-left group transition-all ${
                      prefersReducedMotion ? '' : 'duration-500'
                    } ${
                      isHidden ? 'opacity-0 translate-y-2 pointer-events-none h-0 overflow-hidden' : ''
                    }`}
                    style={{
                      opacity: isHidden ? 0 : isActive ? 1 : 0.6,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Dot */}
                      <div
                        className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all ${
                          prefersReducedMotion ? '' : 'duration-300'
                        } ${
                          isActive
                            ? 'bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2 ring-offset-background'
                            : 'bg-secondary text-muted-foreground group-hover:bg-muted'
                        }`}
                      >
                        {step.number}
                      </div>

                      {/* Text */}
                      <div>
                        <h3
                          className={`font-bold transition-colors ${
                            prefersReducedMotion ? '' : 'duration-300'
                          } ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{step.subtitle}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Scroll Container with Snap */}
          <div className="relative">
            {/* Background Line */}
            <div className="absolute -left-6 top-0 bottom-0 w-1 bg-border hidden md:block" />

            {/* Progress Line */}
            <div
              className="absolute -left-6 top-0 w-1 bg-accent hidden md:block"
              style={{
                height: '100%',
                transform: `scaleY(${progress})`,
                transformOrigin: 'top',
                transition: prefersReducedMotion ? 'none' : 'transform 0.1s ease-out',
              }}
            />

            {/* Scroll Container */}
            <div
              ref={scrollContainerRef}
              className="h-[75vh] overflow-y-auto snap-y snap-mandatory scroll-smooth"
              style={{
                scrollBehavior: prefersReducedMotion ? 'auto' : 'smooth',
              }}
            >
              {STEPS.map((step, index) => (
                <div
                  key={step.id}
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className="min-h-[75vh] snap-start flex items-center"
                >
                  <div
                    className={`w-full p-6 sm:p-8 rounded-xl border-2 bg-card transition-all ${
                      prefersReducedMotion ? '' : 'duration-300'
                    } ${
                      index === activeIndex
                        ? 'border-accent shadow-lg'
                        : 'border-border shadow-sm'
                    }`}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {step.heading}
                    </h3>
                    <p className="text-muted-foreground mb-6">{step.description}</p>

                    {/* Bullets */}
                    <ul className="space-y-3">
                      {step.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground transition-all"
                          style={{
                            opacity: index === activeIndex ? 1 : 0.7,
                            transitionDuration: prefersReducedMotion
                              ? '0ms'
                              : `${200 + i * 50}ms`,
                            transitionDelay: prefersReducedMotion
                              ? '0ms'
                              : index === activeIndex
                                ? `${i * 50}ms`
                                : '0ms',
                          }}
                        >
                          <span className="text-accent font-bold flex-shrink-0 mt-0.5">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
