import aboutImg from '../assets/about.jpg';
import { ABOUT_TEXT, EDUCATION } from '../constants';
import SectionHeading from './SectionHeading';

const About = () => {
  return (
    <section id="about" className="border-t border-line py-24 lg:py-32">
      <SectionHeading title="About" />
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            className="aspect-[4/5] w-full rounded-[2rem] border border-line object-cover"
            src={aboutImg}
            alt="Meyrushan Nadarajan at work"
            loading="lazy"
          />
        </div>

        <div className="lg:col-span-7">
          <p className="max-w-2xl text-lg leading-[1.75] text-body">{ABOUT_TEXT}</p>

          <h3 className="mt-14 font-display text-2xl font-semibold tracking-tight text-ink">Education</h3>
          <dl className="mt-4">
            {EDUCATION.map((edu) => (
              <div key={edu.title} className="grid gap-1 border-t border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-6">
                <dt className="text-sm tabular-nums text-faint">{edu.year}</dt>
                <dd>
                  <p className="font-semibold text-ink">{edu.title}</p>
                  <p className="text-sm text-body">{edu.institution}</p>
                  {edu.description && <p className="mt-2 text-sm leading-relaxed text-faint">{edu.description}</p>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
