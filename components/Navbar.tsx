'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { motion } from 'framer-motion';

const sections = ['home', 'about', 'skills', 'experience', 'process', 'testimonials', 'contact'];

export function Navbar() {
  const activeSection = useScrollSpy(sections, 100);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'process', label: 'Process' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#home" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-sm">RC</span>
            </div>
            <span className="hidden sm:inline font-semibold text-foreground group-hover:text-accent transition-colors">
              Ricky
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:inline-block px-4 py-2 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            Let's Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`absolute w-6 h-0.5 bg-foreground transition-all ${
                mobileMenuOpen ? 'rotate-45' : '-translate-y-2'
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-foreground transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-foreground transition-all ${
                mobileMenuOpen ? '-rotate-45' : 'translate-y-2'
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block px-4 py-2 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
