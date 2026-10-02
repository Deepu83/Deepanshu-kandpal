export interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  images: string[];
  technologies: string[];
  features: string[];
  liveUrl?: string;
}

export interface SkillItem {
  name: string;
  level?: string;
  badge?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  icon: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  type?: string;
  isPrimary?: boolean;
  focus: string;
  description: string;
  highlights: string[];
}

export interface WritingSample {
  title: string;
  excerpt: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
}

export interface ValueProp {
  title: string;
  description: string;
  icon: string;
}
