const SectionHeading = ({ title, intro }) => (
  <header className="mb-12 grid gap-4 md:grid-cols-12 md:items-end">
    <h2 className="font-display text-4xl font-semibold tracking-[-0.03em] text-ink sm:text-5xl md:col-span-6">
      {title}
    </h2>
    {intro && (
      <p className="max-w-md text-base leading-relaxed text-faint md:col-span-6 md:justify-self-end">
        {intro}
      </p>
    )}
  </header>
);

export default SectionHeading;
