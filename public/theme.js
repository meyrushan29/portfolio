// Applies the saved theme before first paint so there is no flash.
// Loaded synchronously from index.html; kept tiny on purpose.
try {
  var t = localStorage.getItem("theme");
  if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
} catch (e) {
  // Storage blocked: the system preference applies.
}
