import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "../constants";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-bg/80 backdrop-blur-md border-b border-line py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-8 flex items-center justify-between">
        <div className="flex flex-shrink-0 items-center">
          <a href="#" className="text-3xl font-bold tracking-tighter bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent">MN</a>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
             <a key={link.name} href={link.href} className="text-sm font-medium text-body hover:text-cyan-400 transition-colors duration-200">
               {link.name}
             </a>
          ))}
        </div>

        <div className="hidden md:flex items-center justify-center gap-4 text-xl">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-body hover:text-cyan-400 transition-colors"><FaLinkedin /></a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-body hover:text-cyan-400 transition-colors"><FaGithub /></a>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-line text-body hover:text-cyan-400 transition-colors text-lg"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-line"
          >
            <div className="container mx-auto px-8 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-medium text-body hover:text-cyan-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-5 text-xl pt-2 border-t border-line">
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-body hover:text-cyan-400 transition-colors mt-4"><FaLinkedin /></a>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-body hover:text-cyan-400 transition-colors mt-4"><FaGithub /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
