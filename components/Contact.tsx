'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: '📧',
      label: 'Email',
      value: 'rickycontiga14@gmail.com',
      href: 'mailto:rickycontiga14@gmail.com',
    },
    {
      icon: '💼',
      label: 'GitHub',
      value: 'github.com/RICKYLER',
      href: 'https://github.com/RICKYLER',
    },
    {
      icon: '📱',
      label: 'Phone',
      value: '+63 960-831-0723',
      href: 'tel:+639608310723',
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Let's Work Together</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss Web3, frontend development, or collaboration opportunities?
            I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method) => (
            <motion.a
              key={method.label}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              target={method.label !== 'Email' && method.label !== 'Phone' ? '_blank' : undefined}
              rel={method.label !== 'Email' && method.label !== 'Phone' ? 'noopener noreferrer' : undefined}
              className="p-6 rounded-xl border border-border bg-card hover:border-accent/50 transition-colors text-center group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{method.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{method.label}</h3>
              <p className="text-sm text-muted-foreground hover:text-accent transition-colors break-all">
                {method.value}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 rounded-xl border border-border bg-card"
        >
          <h3 className="text-2xl font-bold text-foreground mb-6">Send me a message</h3>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-lg bg-accent/10 border border-accent/20 text-center"
            >
              <div className="text-4xl mb-3">✓</div>
              <p className="text-foreground font-semibold mb-2">Thank you for reaching out!</p>
              <p className="text-muted-foreground text-sm">I'll get back to you as soon as possible.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:bg-accent/90 transition-colors"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-border text-center"
        >
          <p className="text-muted-foreground mb-4">Connect with me on social platforms</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/RICKYLER"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-lg bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3.0.405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.016 12.016 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="mailto:rickycontiga14@gmail.com"
              className="w-12 h-12 rounded-lg bg-secondary text-foreground hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors"
              aria-label="Email"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
