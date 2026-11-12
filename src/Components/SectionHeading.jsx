// Title in the left column, intro under it; content sits in the right column
// via the matching .case-body wrapper.
const SectionHeading = ({ title, intro }) => (
  <header className="case-title">
    <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl">{title}</h2>
    {intro && <p className="mt-4 max-w-sm text-base leading-relaxed text-faint">{intro}</p>}
  </header>
);

export default SectionHeading;
