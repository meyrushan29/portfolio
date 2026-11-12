import { useEffect, useState } from "react";

export const SECTIONS = [
  { name: "Research", href: "#research" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// The last section whose top has scrolled past the navbar, or "" above the first.
const sectionInView = () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  if (nearBottom) return SECTIONS[SECTIONS.length - 1].href;
  let active = "";
  for (const { href } of SECTIONS) {
    const el = document.querySelector(href);
    if (el && el.getBoundingClientRect().top <= 120) active = href;
  }
  return active;
};

// Returns { active, scrolled }: the section href in view and whether the page
// has scrolled past the top. One rAF-throttled listener shared by callers.
export function useActiveSection() {
  const [state, setState] = useState({ active: "", scrolled: false });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = { active: sectionInView(), scrolled: window.scrollY > 24 };
      setState((s) => (s.active === next.active && s.scrolled === next.scrolled ? s : next));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return state;
}
