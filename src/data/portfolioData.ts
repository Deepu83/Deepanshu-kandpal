import { Project, SkillCategory, ServiceDetail, ExperienceItem, WritingSample, ProcessStep, ValueProp } from '../types/portfolio';

export const personalInfo = {
  name: "Deepanshu Kandpal",
  initials: "DK",
  title: "Full-Stack Developer & Content Writer",
  tagline: "Building fast, modern and user-friendly websites and web applications, while also helping businesses communicate their ideas through high-quality content.",
  heroHeadline: "Building Digital Experiences That Work.",
  heroSubheadline: "I'm a Full-Stack Developer specializing in modern web applications, responsive websites, APIs and database-driven solutions. I also create SEO-friendly and engaging content for businesses.",
  profileImage: "/Professional Portrait in Black Shirt(1).png",
  email: "kandpaldeepak253@gmail.com",
  whatsapp: "+91 8057509308",
  whatsappUrl: "https://wa.me/918057509308?text=Hi%20Deepanshu%2C%20I%20found%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20a%20project%20with%20you.",
  github: "https://github.com/Deepu83",
  linkedin: "https://www.linkedin.com/in/deepanshu-kandpal-07b9b5269/",
  location: "India · Available Worldwide",
  availabilityStatus: "Available for freelance projects & collaborations",
  trustBadges: [
    { name: "MERN Stack", category: "Full-Stack" },
    { name: "React", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "Python", category: "Language" },
    { name: "AI", category: "Integration" }
  ]
};

export const aboutContent = {
  heading: "Passionate about building practical software and clear technical content.",
  lead: "I am a Full-Stack Developer focused on building practical, responsive and scalable web solutions. With hands-on experience across the entire web development lifecycle, I turn ideas into high-performing digital products.",
  paragraphs: [
    "Whether developing a database-backed web application, designing a high-converting landing page, or writing in-depth SEO technical content, my focus is always on clarity, performance, and real business utility.",
    "I believe good code and clear communication go hand in hand. Many developers struggle to explain complex ideas, while many writers don't understand how applications work under the hood. Bridging that gap enables me to craft software that is technically sound and content that resonates with technical and non-technical audiences alike."
  ],
  stats: [
    { label: "Core Stack", value: "MERN + Next.js" },
    { label: "Architecture", value: "REST & Scalable APIs" },
    { label: "Content Focus", value: "Technical & SEO" },
    { label: "Approach", value: "Practical & Clean" }
  ]
};

export const servicesData: ServiceDetail[] = [
  {
    id: "web-dev",
    title: "Website & Web Application Development",
    subtitle: "End-to-end engineering from responsive interfaces to database architecture.",
    description: "I build responsive websites, landing pages, dashboards, APIs and full-stack applications with clean code, modern frameworks, and rock-solid performance.",
    icon: "code",
    items: [
      "Business websites & company landing pages",
      "Portfolio websites & personal branding platforms",
      "High-converting marketing landing pages",
      "Full-stack web applications with modern architecture",
      "Interactive admin dashboards & analytics portals",
      "RESTful APIs & third-party service integrations",
      "Database-driven applications with MongoDB & SQL",
      "Website maintenance, optimization & responsive redesigns"
    ]
  },
  {
    id: "content-writing",
    title: "Content Writing",
    subtitle: "High-retention written content engineered for both search engines and humans.",
    description: "I create SEO-friendly blogs, website copy, product descriptions, and business content that demystifies technology and connects with your target audience.",
    icon: "pen-tool",
    items: [
      "SEO blog writing & search-optimized articles",
      "Website copy, value propositions & hero headlines",
      "Engaging product descriptions & feature breakdowns",
      "Landing page copy focused on conversion",
      "Social media content & brand narrative threads",
      "Email campaigns & newsletter content",
      "Technical writing & developer-focused documentation",
      "AI-assisted content creation with meticulous human editing"
    ]
  }
];

export const skillsData: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Creating responsive, interactive and accessible user interfaces.",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Tailwind CSS" }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    description: "Architecting reliable server logic, endpoints and application flows.",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "Python" },
      { name: "C" }
    ]
  },
  {
    id: "database",
    title: "Database",
    description: "Designing data schemas, relational models and document stores.",
    skills: [
      { name: "MongoDB" },
      { name: "Mongoose" },
      { name: "SQL" },
      { name: "MySQL" }
    ]
  },
  {
    id: "tools",
    title: "Tools & Other",
    description: "Version control, integrations, security and deployment pipelines.",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "API Integration" },
      { name: "Authentication" },
      { name: "Payment Integration" },
      { name: "Responsive Web Design" },
      { name: "AI Tools & AI Integration" },
      { name: "Deployment" }
    ]
  }
];

export const projectsData: Project[] = [
  {
    id: "ecommerce-app",
    title: "E-Commerce Web Application",
    description: "Full-stack online shopping platform with interactive product filtering, cart state management, checkout flows, and database integration.",
    images: [
      "/projects/ecommerce-1.png",
      "/projects/ecommerce-2.png",
      "/projects/ecommerce-3.png"
    ],
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    features: [
      "Dynamic product catalog with multi-category faceted filtering",
      "Persistent cart state and streamlined order checkout workflow",
      "RESTful API backend integrated with MongoDB data models"
    ],
    liveUrl: ""
  },
  {
    id: "admin-dashboard",
    title: "Admin Dashboard",
    description: "Modular administrative console providing user role delegation, activity logs, data visualization, and operational status indicators.",
    images: [
      "/projects/admin-1.png",
      "/projects/admin-2.png",
      "/projects/admin-3.png"
    ],
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    features: [
      "Role-based privilege management and secure token validation",
      "Dynamic data tables with search, sorting, and pagination",
      "Real-time operational activity auditing and responsive UI"
    ],
    liveUrl: ""
  },
  {
    id: "portfolio-platform",
    title: "Developer Portfolio",
    description: "High-performance developer portfolio built with React, TypeScript, and Tailwind CSS, featuring dark/light theme switching and responsive engineering.",
    images: [
      "/projects/portfolio-1.png",
      "/projects/portfolio-2.png",
      "/projects/portfolio-3.png"
    ],
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Fast page load with clean component architecture",
      "System-aware light and dark mode toggling",
      "Integrated direct WhatsApp and email communication channels"
    ],
    liveUrl: ""
  },
  {
    id: "ai-content-app",
    title: "AI Integration Application",
    description: "Practical web application utilizing modern AI model APIs to assist with content formatting, technical drafting, and workflow automation.",
    images: [
      "/projects/ai-1.png",
      "/projects/ai-2.png",
      "/projects/ai-3.png"
    ],
    technologies: ["React.js", "Node.js", "Express.js", "REST APIs", "Python", "Tailwind CSS"],
    features: [
      "API-driven content processing and prompt streaming workflows",
      "Clean editing interface with real-time feedback",
      "Structured output generation for technical documentation"
    ],
    liveUrl: ""
  }
];

export const experienceData: ExperienceItem[] = [
  {
    company: "Cognoscent",
    role: "Full-Stack / MERN Stack Developer",
    period: "1 Year",
    type: "Primary Professional Experience",
    isPrimary: true,
    focus: "MERN Stack Development, REST APIs & Full-Stack Systems",
    description: "Worked as a Full-Stack Developer with a focus on the MERN stack, building responsive web applications, REST APIs, database-driven systems, and modern user interfaces using technologies such as React.js, Node.js, Express.js and MongoDB.",
    highlights: [
      "MERN Stack Development",
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Frontend and Backend Development",
      "Database Integration"
    ]
  },
  {
    company: "IBM",
    role: "SQL Intern",
    period: "3 Months",
    type: "Internship",
    isPrimary: false,
    focus: "SQL, Database Fundamentals & Relational Databases",
    description: "Completed a 3-month internship focused on SQL and database fundamentals, working with relational databases, queries, data manipulation and database concepts.",
    highlights: [
      "SQL",
      "Database Fundamentals",
      "SQL Queries",
      "Data Manipulation",
      "Relational Databases"
    ]
  }
];

export const writingServices = [
  {
    title: "SEO Blog Writing",
    description: "Comprehensive, keyword-researched articles that answer search intent and establish thought leadership."
  },
  {
    title: "Website Copy",
    description: "Punchy, benefit-driven headlines, value props, and page copy that turn casual visitors into inquiries."
  },
  {
    title: "Product Descriptions",
    description: "Clear and appealing descriptions highlighting key specifications, user benefits, and differentiators."
  },
  {
    title: "Technical Writing",
    description: "Developer documentation, setup tutorials, and technical explainers written with practical accuracy."
  },
  {
    title: "Social Media Content",
    description: "Engaging short-form posts, LinkedIn updates, and thought-provoking threads built for genuine engagement."
  },
  {
    title: "Email & Newsletter Copy",
    description: "Compelling subject lines and reader-focused emails that maintain high open and click-through rates."
  }
];

export const sampleArticle: WritingSample = {
  title: "Building Fast, Accessible Web Interfaces That Convert",
  excerpt: "High-performance websites balance lightweight client bundles with clear, benefit-driven messaging to keep users engaged and reduce bounce rates."
};

export const whyWorkWithMeData: ValueProp[] = [
  {
    title: "Clean & Responsive Design",
    description: "Every layout is thoughtfully crafted to look crisp and operate smoothly across desktop, tablet, and mobile devices.",
    icon: "layout"
  },
  {
    title: "Practical Solutions",
    description: "I focus on reliable, battle-tested technologies that solve actual problems without unnecessary complexity or bloated dependencies.",
    icon: "cpu"
  },
  {
    title: "Clear Communication",
    description: "As both a developer and a writer, I provide transparent updates, clear project milestones, and zero technical jargon confusion.",
    icon: "message-square"
  },
  {
    title: "On-Time Delivery",
    description: "Realistic timeline estimation, focused sprint execution, and disciplined code delivery keep projects on schedule.",
    icon: "clock"
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand",
    tagline: "Scope & Objective",
    description: "We discuss your project goals, target audience, technical needs, and key deliverables to establish a clear project vision."
  },
  {
    number: "02",
    title: "Plan",
    tagline: "Architecture & Outline",
    description: "I map out the technical stack, database schema, user flows, and content structure so development proceeds without roadblocks."
  },
  {
    number: "03",
    title: "Build",
    tagline: "Engineering & Craft",
    description: "Writing clean, modular code and crafting high-retention copy, accompanied by iterative check-ins to ensure alignment."
  },
  {
    number: "04",
    title: "Deliver",
    tagline: "Testing & Launch",
    description: "Thorough testing across screen sizes, performance optimization, and final deployment with straightforward maintenance guidelines."
  }
];
