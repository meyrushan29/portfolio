// Writes the pointer position into CSS variables so the .spot highlight in
// index.css follows the cursor. Spread the result onto the card element.
export const spotlight = {
  onPointerMove: (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  },
};
