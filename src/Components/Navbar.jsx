import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaBars, FaTimes } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";
import { CONTACT } from "../constants";
import { SECTIONS } from "../lib/useActiveSection";
import { useTheme } from "../lib/useTheme";

const SocialLinks = ({ className = "" }) => (
  <div className={`flex items-center gap-4 text-lg ${className}`}>
    <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-body transition-colors hover:text-accent"><FaLinkedin /></a>
    <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-body transition-colors hover:text-accent"><FaGithub /></a>
  </div>
);

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={dark}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink"
    >
      {dark ? <FiSun /> : <FiMoon />}
    </button>
  );
};

const Navbar = ({ active, scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // The open menu locks body scroll, which swallows anchor jumps, so close
  // first and scroll once the lock is released.
  const handleMobileLink = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView();
      history.pushState(null, "", href);
    }, 0);
  };

  const solid = scrolled || isMenuOpen;

  return (
    <nav className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#" className="font-display text-lg font-semibold tracking-tight text-ink">
          Meyrushan Nadarajan
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.name}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`text-sm font-medium transition-colors hover:text-accent ${isActive ? "text-ink" : "text-body"}`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <SocialLinks className="hidden lg:flex" />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
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
              {SECTIONS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleMobileLink(e, link.href)}
                  aria-current={active === link.href ? "true" : undefined}
                  className={`py-2.5 font-display text-2xl font-medium transition-colors hover:text-accent ${active === link.href ? "text-accent" : "text-ink"}`}
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
};

export default Navbar;
