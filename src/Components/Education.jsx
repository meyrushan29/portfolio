import { FaGraduationCap } from "react-icons/fa";
import { EDUCATION } from "../constants";
import SectionHeading from "./SectionHeading";

const Education = () => (
  <section id="education" className="case-grid border-t border-line py-20 lg:py-28">
    <SectionHeading
      title="Education"
      intro="A B.Sc. (Honours) in IT from SLIIT, where the final-year research became the published paper."
    />
    <ol className="case-body grid gap-5">
      {EDUCATION.map((item) => (
        <li key={item.title} className="rounded-[1.5rem] border border-line bg-surface p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="inline-flex items-center gap-2 text-sm tabular-nums text-faint">
              <FaGraduationCap className="text-water" aria-hidden="true" />
              {item.year}
            </p>
          </div>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink">{item.title}</h3>
          <p className="mt-1 text-base text-body">{item.institution}</p>
          {item.description && <p className="mt-4 max-w-2xl leading-relaxed text-faint">{item.description}</p>}
        </li>
      ))}
    </ol>
  </section>
);

export default Education;
