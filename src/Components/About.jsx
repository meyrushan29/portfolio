import { ABOUT_TEXT } from "../constants";
import SectionHeading from "./SectionHeading";

const About = () => (
  <section id="about" className="case-grid border-t border-line py-20 lg:py-28">
    <SectionHeading title="About" />
    <div className="case-body">
      <p className="max-w-2xl text-lg leading-[1.7] text-body">{ABOUT_TEXT}</p>
    </div>
  </section>
);

export default About;
