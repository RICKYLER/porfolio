export interface ProcessStep {
  id: number;
  label: string;
  title: string;
  description: string;
  details: string[];
}

export const processSteps: ProcessStep[] = [
  {
    id: 1,
    label: 'Discovery',
    title: 'Understanding Requirements & Constraints',
    description:
      'Every project begins with deep discovery. I align with stakeholders on goals, technical constraints, and user needs to ensure we build the right solution.',
    details: [
      'Gather requirements and project scope',
      'Define success metrics and KPIs',
      'Identify technical constraints and opportunities',
      'Establish timeline and resource allocation',
      'Create project roadmap and milestones',
    ],
  },
  {
    id: 2,
    label: 'Design',
    title: 'Wireframes, Components & UX Architecture',
    description:
      'Strategic design phase where I create component systems, wireframes, and interactive prototypes. Focus on reusability, accessibility, and user experience.',
    details: [
      'Create wireframes and user flows',
      'Design component library and design system',
      'Build interactive prototypes in Figma',
      'Establish accessibility and responsive guidelines',
      'Design comprehensive UI patterns and variations',
    ],
  },
  {
    id: 3,
    label: 'Build',
    title: 'React/TypeScript Implementation & Integration',
    description:
      'Translating design into clean, performant, and maintainable code. I focus on component architecture, type safety, and integrating Web3 when relevant.',
    details: [
      'Implement component-based architecture',
      'Set up TypeScript for type safety',
      'Integrate with APIs and Web3 services',
      'Implement state management and data flows',
      'Write comprehensive unit and integration tests',
    ],
  },
  {
    id: 4,
    label: 'Launch',
    title: 'Performance, Accessibility & Deployment',
    description:
      'Final phase focusing on performance optimization, accessibility audits, and deployment. I ensure the product meets production standards and scales effectively.',
    details: [
      'Conduct performance audits and optimization',
      'Run accessibility compliance checks (WCAG)',
      'Deploy and configure CI/CD pipeline',
      'Monitor and iterate based on user feedback',
      'Maintain code and implement ongoing improvements',
    ],
  },
];
