export interface BookProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  features: string[];
  links: { label: string; url: string }[];
  coverColor: string;
}

export const bookProjects: BookProject[] = [
  {
    id: 'portfolio-3d',
    title: '3D React Portfolio',
    subtitle: 'An interactive 3D room built with React Three Fiber',
    description:
      'A fully navigable 3D environment showcasing projects, skills, and experience. Features a bookshelf you can browse, interactive lighting, and smooth camera transitions between views.',
    techStack: ['React', 'Three.js', 'React Three Fiber', 'Drei', 'TypeScript', 'Vite'],
    features: [
      'Navigable 3D room with orbit controls',
      'Animated bookshelf with openable books',
      'Responsive viewport system for desktop, tablet, and mobile',
      'Dynamic lighting with configurable lamps',
      'URL-synced camera states',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/AllenCaoo/3D-React-Portfolio' },
    ],
    coverColor: '#5d73b7',
  },
];

export const getDefaultProject = (): BookProject => bookProjects[0];
