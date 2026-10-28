import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "../constants";

const navLinks = [
  { name: "Research", href: "#research" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const SocialLinks = ({ className = "" }) => (
  <div className={`flex items-center gap-4 text-lg ${className}`}>
    <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-body hover:text-accent transition-colors"><FaLinkedin /></a>
    <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-body hover:text-accent transition-colors"><FaGithub /></a>
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // The open menu locks body scroll, which swallows anchor jumps — so close
  // first, then scroll once the lock is released.
  const handleMobileLink = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView();
      history.pushState(null, "", href);
    }, 0);
  };

  const solid = isScrolled || isMenuOpen;

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? 'border-b border-line bg-bg/85 backdrop-blur-md' : 'border-b border-transparent'}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="font-display text-lg font-semibold tracking-tight text-ink">
          Meyrushan Nadarajan
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-body hover:text-accent transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <SocialLinks className="hidden lg:flex" />

        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line lg:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleMobileLink(e, link.href)}
                  className="py-2.5 font-display text-2xl font-medium text-ink hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <SocialLinks className="mt-3 border-t border-line pt-5" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
