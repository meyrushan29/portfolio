import portrait from "../assets/Profile.webp";
import { ABOUT_TEXT } from "../constants";
import SectionHeading from "./SectionHeading";

const About = () => (
  <section id="about" className="case-grid border-t border-line py-20 lg:py-28">
    <SectionHeading title="About" />
    <div className="case-body flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
      <img
        className="h-28 w-28 shrink-0 rounded-full border border-line object-cover object-[50%_30%]"
        src={portrait}
        alt="Meyrushan Nadarajan"
        loading="lazy"
        width="112"
        height="112"
      />
      <p className="max-w-2xl text-lg leading-[1.7] text-body">{ABOUT_TEXT}</p>
    </div>
  </section>
);

export default About;
