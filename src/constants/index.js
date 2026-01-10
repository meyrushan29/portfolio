import project1 from "../assets/projects/recipe_.jpg";
import project2 from "../assets/projects/logistic.png";
import project4 from "../assets/projects/Grocery.png";

export const HERO_CONTENT = `I am a passionate Full Stack Developer having professional experience in building scalable and secure web applications. I specialize in crafting intuitive front-end interfaces with React, Next.js, and Tailwind CSS, while architecting robust backend solutions using Node.js, Express.js, and Spring Boot. My goal is to deliver high-quality, performance-optimized, and innovative software solutions.`;

export const ABOUT_TEXT = `I am a results-driven Full Stack Developer with hands-on expertise in MERN stack and Java Spring technologies. Currently functioning as an Associate Software Engineer, I have successfully improved client operational efficiency by 25% through custom web integrations. I am adept at continuous integration/deployment (CI/CD), cloud platforms like AWS and Azure, and database management with MongoDB and MySQL. I thrive in Agile environments, collaborating with cross-functional teams to deliver 15+ major features ahead of schedule. My passion lies in solving complex problems, mentoring junior developers, and continuously learning new technologies to stay at the forefront of the industry.`;

export const EXPERIENCES = [
  {
    year: "Oct 2024 - Present",
    role: "Associate Software Engineer",
    company: "D-Gateway Innovations (Pvt) Ltd",
    description: `Leading the development of full-stack web applications and microservices. Engineered RESTful APIs handling over 10,000 daily requests, reducing response times by 40%. integrated AI-powered features boosting user engagement by 30%. Containerized applications with Docker and orchestrated with Kubernetes, reducing server costs by 20%.`,
    technologies: ["React", "Node.js", "MongoDB", "Docker", "Kubernetes", "AWS"],
  },
  {
    year: "Mar 2024 - Sep 2024",
    role: "Software Engineer Intern",
    company: "D-Gateway Innovations (Pvt) Ltd",
    description: `Contributed to 4+ live client projects, migrating legacy PHP apps to modern React/Node.js stacks improving load speeds by 70%. Built reusable UI components and backend API endpoints. Collaborated in Agile sprints to complete 98% of assigned tasks on time.`,
    technologies: ["JavaScript", "React", "Node.js", "Express.js", "Material-UI", "MySQL"],
  },
];

export const PROJECTS = [
  {
    title: "Customer Portal (D-Gateway)",
    image: project1, // Placeholder reusing existing image variable, assuming we don't have a new one strictly yet
    description: "A high-performance customer portal developed using Next.js and Tailwind CSS. Achieved a 99% score on Google Lighthouse performance audits through advanced optimization techniques. Features include real-time data visualization and secure user authentication.",
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "REST APIs"],
  },
  {
    title: "Online Logistic Management System",
    image: project2,
    description: "A comprehensive logistics platform for tracking shipments, inventory management, and delivery scheduling. Implemented real-time updates and a user-friendly dashboard to streamline supply chain operations.",
    technologies: ["React", "Next.js", "MongoDB", "Node.js"],
  },
  {
    title: "Online Grocery Management System",
    image: project4,
    description: "web-based application for managing grocery inventory, product listings, and order processing. Optimized database queries for efficient data retrieval and management of 5,000+ product records.",
    technologies: ["Java", "JSP", "MySQL", "Apache Tomcat"],
  },
];

export const CONTACT = {
  address: "Kaduwela, Sri Lanka",
  phoneNo: "+94 77 630 9171",
  email: "meyrushan29@gmail.com",
  linkedin: "https://www.linkedin.com/in/meyrushan-nadarajan", 
  portfolio: "https://react-portfolio-meyrushan.vercel.app/" 
};
