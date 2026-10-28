import { useState } from "react";
import { PUBLICATIONS } from "../constants";
import { FaCheck, FaRegCopy, FaExternalLinkAlt, FaCertificate } from "react-icons/fa";
import SectionHeading from "./SectionHeading";

const CopyDoi = ({ doi }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(doi);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
      aria-live="polite"
    >
      {copied ? <FaCheck /> : <FaRegCopy />}
      {copied ? "DOI copied" : "Copy DOI"}
    </button>
  );
};

const Publication = ({ pub }) => (
  <article className="overflow-hidden rounded-[2rem] bg-ink text-white">
    <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:p-14">
      <div className="lg:col-span-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-ink">
            <FaCheck className="text-accent" /> {pub.status}
          </span>
          Conference paper, {pub.year}
        </p>

        <h3 className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.025em] sm:text-4xl lg:text-[2.75rem]">
          {pub.title}
        </h3>

        <p className="mt-5 text-base text-white/80">{pub.venue}</p>
        {pub.description && <p className="mt-1 text-sm text-white/60">{pub.description}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-white/60">DOI</span>
          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="break-all font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {pub.doi}
          </a>
          <CopyDoi doi={pub.doi} />
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href={pub.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-soft">
            Read on IEEE Xplore <FaExternalLinkAlt className="text-xs" />
          </a>
          {pub.certificate && (
            <a href={pub.certificate} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white">
              <FaCertificate /> View certificate
            </a>
          )}
        </div>
      </div>

      {pub.certificateImage && (
        <a
          href={pub.certificate}
          target="_blank"
          rel="noopener noreferrer"
          className="block self-start lg:col-span-4"
          aria-label="Open the CISCON 2026 presentation certificate (PDF)"
        >
          <img
            src={pub.certificateImage}
            alt="CISCON 2026 presentation certificate"
            loading="lazy"
            className="w-full rounded-xl border border-white/10 transition-transform duration-500 hover:-rotate-1"
          />
        </a>
      )}
    </div>

    {pub.highlights?.length > 0 && (
      <div className="grid border-t border-white/10 sm:grid-cols-2">
        {pub.highlights.map((h, i) => (
          <div key={h.title} className={`p-6 sm:p-10 lg:px-14 ${i > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""}`}>
            <h4 className="font-display text-xl font-semibold">{h.title}</h4>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-white/70">{h.text}</p>
          </div>
        ))}
      </div>
    )}
  </article>
);

const Research = () => {
  if (PUBLICATIONS.length === 0) return null;

  return (
    <section id="research" className="pb-24 lg:pb-32">
      <SectionHeading
        title="Research"
        intro="My final-year research applies machine learning to everyday hydration, on a phone. It is the basis of the Well360 app below."
      />
      <div className="flex flex-col gap-8">
        {PUBLICATIONS.map((pub) => (
          <Publication key={pub.doi || pub.title} pub={pub} />
        ))}
      </div>
    </section>
  );
};

export default Research;
