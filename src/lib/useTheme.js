import { useCallback, useEffect, useState } from "react";

const query = () => window.matchMedia("(prefers-color-scheme: dark)");

const resolve = () => {
  const saved = document.documentElement.getAttribute("data-theme");
  if (saved === "light" || saved === "dark") return saved;
  return query().matches ? "dark" : "light";
};

// The theme in effect ("light" | "dark") and a toggle. The choice is saved to
// localStorage and applied before paint by the inline script in index.html.
export function useTheme() {
  const [theme, setTheme] = useState(resolve);

  useEffect(() => {
    const mq = query();
    const onChange = () => setTheme(resolve());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = resolve() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode or blocked storage: the choice lasts for this page view.
    }
    setTheme(next);
  }, []);

  return { theme, toggle };
}
