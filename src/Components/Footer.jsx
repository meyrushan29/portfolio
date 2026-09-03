import { CONTACT } from "../constants";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 text-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <a href="#" className="text-xl font-bold tracking-tighter bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent">
          MN
        </a>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-faint">
          {quickLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-cyan-400 transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-lg text-faint">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-cyan-400 transition-colors"><FaLinkedin /></a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-cyan-400 transition-colors"><FaGithub /></a>
        </div>
      </div>

      <p className="text-center text-faint mt-8">
        &copy; {year} Meyrushan Nadarajan. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
