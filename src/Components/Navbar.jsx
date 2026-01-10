import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTwitterSquare, FaInstagram } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-8 flex items-center justify-between">
        <div className="flex flex-shrink-0 items-center">
             <a href="#" className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent">MN</a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
             <a key={link.name} href={link.href} className="text-sm font-medium hover:text-cyan-300 transition-colors duration-200">
               {link.name}
             </a>
          ))}
        </div>

        <div className='flex items-center justify-center gap-4 text-xl'>
          <a href="https://www.linkedin.com/in/meyrushan-nadarajan" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors"><FaLinkedin /></a>
          <a href="https://github.com/meyrushan29" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors"><FaGithub /></a>
          {/* <a href="#" className="hover:text-cyan-300 transition-colors"><FaTwitterSquare /></a>
          <a href="#" className="hover:text-cyan-300 transition-colors"><FaInstagram /></a> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
