import project2 from "../assets/projects/logistic.png";
import staffManagementImg from "../assets/Staff_Management/02-dashboard.png";
import quizzMakerImg from "../assets/QuizzMaker-Screenshots/03-teacher-dashboard.png";
import hydrationImg from "../assets/Well360_Demo/well360-poster.png";
import hydrationVideo from "../assets/Well360_Demo/well360-demo.mp4";
import certificateImg from "../assets/Publication_Certificate.png";

export const HERO_CONTENT = `I am a passionate Full Stack Developer and B.Sc. (Honours) IT graduate from SLIIT, with professional experience in building scalable and secure web applications. I specialize in crafting intuitive front-end interfaces with React, Next.js, and Tailwind CSS, while architecting robust backend solutions using Node.js, Express.js, FastAPI, and Spring Boot. My goal is to deliver high-quality, performance-optimized, and innovative software solutions.`;

export const ABOUT_TEXT = `I am a results-driven Full Stack Developer with hands-on expertise in the MERN stack, Java Spring, and Python/FastAPI. I worked as an Associate Software Engineer at D-Gateway Innovations, developing and maintaining full-stack web applications and optimizing RESTful APIs and database queries in Agile/Scrum teams. I hold a B.Sc. (Honours) in Information Technology from SLIIT, where my final-year research on AI-powered hydration monitoring was accepted for presentation at CISCON 2026. I thrive on solving complex problems, building production-grade systems end to end, and continuously learning new technologies to stay at the forefront of the industry.`;

export const EDUCATION = [
  {
    year: "2022 - 2026",
    title: "B.Sc. (Honours) in Information Technology",
    institution: "Sri Lanka Institute of Information Technology (SLIIT), Malabe, Sri Lanka",
    description: "Final grade: 3.13 / 4.00 (WGPA). Final-year research project: AI-Powered Hydration Monitoring System (16 credits).",
  },
  {
    year: "2020",
    title: "G.C.E. Advanced Level - Biological Science Stream",
    institution: "Carmel Fatima College, Kalmunai, Sri Lanka",
    description: "",
  },
];

export const PUBLICATIONS = [
  {
    year: "2026",
    title: "Sub-Daily Hydration Forecasting and Lip-Based Dehydration Detection for Personalized Mobile Health Monitoring",
    venue: "CISCON 2026 - XXIII Control Instrumentation Systems Conference, Manipal, India",
    description: "Presented 7-8 August 2026. Technically co-sponsored by the IEEE Bengaluru Section and Mangalore Subsection.",
    certificate: "/publication/CISCON_2026_Certificate.pdf",
    certificateImage: certificateImg,
  },
];

export const EXPERIENCES = [
  {
    year: "Oct 2024 - Oct 2025",
    role: "Associate Software Engineer",
    company: "D-Gateway Innovations (Pvt) Ltd",
    description: `Developed and maintained full-stack web applications using React, Node.js and MongoDB, delivering features across frontend and backend modules. Built and extended RESTful APIs and optimized database queries to improve application performance and data reliability. Worked in Agile/Scrum teams and participated in code reviews, contributing to code quality and maintainability standards.`,
    technologies: ["React", "Node.js", "MongoDB", "REST APIs", "Agile"],
  },
  {
    year: "Mar 2024 - Sep 2024",
    role: "Software Engineer Intern",
    company: "D-Gateway Innovations (Pvt) Ltd",
    description: `Contributed to MERN-stack web applications across frontend and backend components, gaining practical experience of the software development lifecycle in a production environment. Completed as the 8-credit Industry Placement module of the B.Sc. programme.`,
    technologies: ["JavaScript", "React", "Node.js", "Express.js", "MongoDB"],
  },
];

export const PROJECTS = [
  {
    title: "Well360",
    subtitle: "AI-Powered Hydration Forecasting & Lip-Based Dehydration Detection",
    featured: true,
    image: hydrationImg,
    video: hydrationVideo,
    description: "Final-year research project: a mobile hydration-monitoring app with a user-centred interface, applying machine learning to forecast hydration needs and detect dehydration from lip imagery. Basis of the CISCON 2026 conference paper on sub-daily hydration forecasting and lip-based dehydration detection.",
    features: [
      "Sub-daily hydration forecasting model",
      "Lip-based dehydration detection via MobileNetV2 with Grad-CAM visual explanations",
      "XGBoost model for personalised hydration forecasts",
      "SHAP-based explainability for model predictions",
      "Flutter mobile app backed by a Python service",
    ],
    technologies: ["Flutter", "Dart", "Python", "XGBoost", "PyTorch", "MobileNetV2", "SHAP", "Grad-CAM"],
    github: "",
    demo: "",
  },
  {
    title: "Staff Management System",
    subtitle: "Revenue, Target, Attendance and Performance Platform",
    image: staffManagementImg,
    description: "Three-client full-stack system replacing a manual, whiteboard-based process at a tutoring business: a REST API, a React admin console and a React Native (Expo) mobile app for field staff. Server-side RBAC across four roles with branch-level data scoping, identity derived from the JWT. Schema-first backend with hand-written SQL migrations, full audit logging and status-based soft deletion. Jest/Supertest integration suites; containerised via Podman Compose.",
    features: [
      "Role-based access control across four roles with branch-level data scoping",
      "Identity derived from JWT, not client-supplied IDs",
      "Hand-written SQL migrations, full audit logging, soft deletion",
      "Approval workflows for revenue submission and leave requests",
      "Jest/Supertest integration suites; Podman Compose deployment",
    ],
    technologies: ["TypeScript", "Node.js", "Express", "MariaDB", "React", "React Native"],
    github: "",
    demo: "",
  },
  {
    title: "QuizzMaker",
    subtitle: "Live Quiz and Learning Analytics Platform",
    image: quizzMakerImg,
    description: "Real-time, teacher-led quiz platform built on a WebSocket engine with reconnect-safe sessions and a server-authoritative timer that enforces deadlines from a shared UTC timestamp. Analytics module produces per-topic breakdowns, class statistics, student ranking and cross-quiz at-risk identification, with CSV/Excel export. Integrates an LLM API to convert pasted text into structured MCQs. Deployed to production (FastAPI on Railway, React on Vercel) and packaged as a signed native Android app.",
    features: [
      "WebSocket engine with reconnect-safe live quiz sessions",
      "Server-authoritative timer enforced from a shared UTC timestamp",
      "Per-topic analytics, class stats, and at-risk student identification",
      "LLM-powered conversion of pasted text into structured MCQs",
      "Deployed on Railway + Vercel; packaged as a signed Android app",
    ],
    technologies: ["FastAPI", "React", "TypeScript", "WebSockets", "PostgreSQL", "Capacitor"],
    github: "",
    demo: "",
  },
  {
    title: "AI-Enabled Logistics Management System",
    subtitle: "End-to-End Shipment & Inventory Tracking",
    image: project2,
    description: "End-to-end logistics tracking system with AI/ML-supported decision features, improving operational visibility. Implemented real-time updates and a user-friendly dashboard for shipment tracking, inventory management, and delivery scheduling across the supply chain.",
    features: [
      "Real-time shipment tracking dashboard",
      "AI/ML-supported decision features for operational visibility",
      "Inventory management and delivery scheduling",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    github: "",
    demo: "",
  },
];

export const CONTACT = {
  address: "Colombo, Sri Lanka",
  phoneNo: "+94 77 630 9171",
  email: "meyrushan29@gmail.com",
  linkedin: "https://www.linkedin.com/in/meyrushan-nadarajan",
  github: "https://github.com/meyrushan29",
  portfolio: "https://react-portfolio-meyrushan.vercel.app/",
  // Formspree form endpoint, e.g. "https://formspree.io/f/xxxxaaaa" - leave empty until you have one.
  formEndpoint: "",
};
