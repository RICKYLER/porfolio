export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'all' | 'web' | 'web3' | 'ui' | 'systems';
  tags: string[];
  bullets: string[];
  link?: string;
  featured: boolean;
  status: 'production' | 'practice';
}

export const projects: Project[] = [
  {
    id: 'scanx',
    title: 'ScanX (Scathat)',
    description: 'Smart Contract Security Scanner Platform',
    category: 'web3',
    featured: true,
    status: 'production',
    tags: ['Next.js 14', 'Web3.js', 'Chrome Extension', 'Real-time Analysis'],
    bullets: [
      'Built core security scanner UI enabling users to input contract addresses and visualize real-time analysis stages (Decompilation, Auditing, Risk Scoring)',
      'Developed browser extension UI: responsive popup interface for real-time contract scanning and security alerts',
      'Implemented extension dashboard tracking live protection stats (threats blocked, funds saved) with user preferences',
      'Designed interactive vulnerability reports with severity levels, impact analysis, and remediation guidance',
      'Built communication bridges between popup UI and background services via Chrome Extension APIs',
      'Designed high-performance landing page with Framer Motion scroll-based animations',
    ],
  },
  {
    id: 'airchain',
    title: 'AirChain Pay',
    description: 'Web3 Cryptocurrency Payment System',
    category: 'web3',
    featured: true,
    status: 'production',
    tags: ['Web3', 'Wallet Integration', 'Ethers.js', 'Transaction Flow'],
    bullets: [
      'Built UI components for crypto payment processing and transaction flow',
      'Implemented wallet connection interfaces supporting private key and seed phrase input',
      'Designed smooth, responsive Web3 checkout screens with real-time balance updates',
      'Assisted integration with blockchain-based transaction functions and gas estimation',
      'Ensured clean UX for sending, receiving, and verifying Web3 payments',
    ],
  },
  {
    id: 'defi-dashboard',
    title: 'DeFi Dashboard',
    description: 'Yield Farming & Token Analytics Dashboard',
    category: 'web3',
    featured: false,
    status: 'practice',
    tags: ['React', 'Web3', 'Real-time Data', 'Charts'],
    bullets: [
      'Personal project showcasing DeFi liquidity pool interactions',
      'Real-time token price tracking and yield calculations',
      'Transaction history and portfolio analytics',
    ],
  },
  {
    id: 'extension-ui',
    title: 'Security Extension UI Kit',
    description: 'Reusable Component Library for Browser Extensions',
    category: 'ui',
    featured: false,
    status: 'practice',
    tags: ['Component Library', 'TypeScript', 'TailwindCSS', 'Accessibility'],
    bullets: [
      'Built modular, accessible component library for extension development',
      'Comprehensive documentation and Storybook integration',
      'Responsive design patterns for popup and sidebar layouts',
    ],
  },
  {
    id: 'trading-ui',
    title: 'Crypto Trading Interface',
    description: 'Advanced Trading UI for Decentralized Exchange',
    category: 'ui',
    featured: false,
    status: 'practice',
    tags: ['React', 'WebSocket', 'Chart.js', 'Real-time Data'],
    bullets: [
      'Order book visualization and live price charting',
      'Portfolio management and trade execution UI',
      'Responsive design for desktop and tablet experiences',
    ],
  },
  {
    id: 'state-management',
    title: 'Advanced React State Management',
    description: 'Custom State Management System for Complex Apps',
    category: 'systems',
    featured: false,
    status: 'practice',
    tags: ['React', 'TypeScript', 'Performance', 'Hooks'],
    bullets: [
      'Custom hook system for managing global and local state',
      'Implemented memoization and optimization patterns',
      'Zero-dependency solution minimizing bundle size',
    ],
  },
];

export const categories = ['all', 'web', 'web3', 'ui', 'systems'] as const;
export type Category = (typeof categories)[number];
