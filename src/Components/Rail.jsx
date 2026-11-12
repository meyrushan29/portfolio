import { SECTIONS } from "../lib/useActiveSection";

// Desktop-only index of the page, pinned to the left. The track fills as you
// scroll; the dot for the section in view is solid. Labels appear at 2xl
// widths where there is room, and on hover or focus below that.
const Rail = ({ active }) => (
  <nav aria-label="Page sections" className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block 2xl:left-10">
    <div className="relative">
      <span aria-hidden="true" className="absolute bottom-3 left-[5px] top-3 w-px bg-line" />
      <span aria-hidden="true" className="rail-fill absolute bottom-3 left-[5px] top-3 w-px bg-water" />
      <ol className="relative flex flex-col gap-5">
        {SECTIONS.map(({ name, href }) => {
          const isActive = active === href;
          return (
            <li key={href}>
              <a
                href={href}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3 outline-offset-8"
              >
                <span
                  aria-hidden="true"
                  className={`h-[11px] w-[11px] rounded-full border-2 transition-colors ${
                    isActive ? "border-water bg-water" : "border-line-strong bg-bg group-hover:border-water"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-opacity 2xl:opacity-100 ${
                    isActive ? "text-ink" : "text-faint"
                  } opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100`}
                >
                  {name}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  </nav>
);

export default Rail;
