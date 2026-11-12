import { useState } from "react";
import { PUBLICATIONS } from "../constants";
import { FaCheck, FaRegCopy, FaExternalLinkAlt, FaCertificate } from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import { spotlight } from "../lib/useSpotlight";

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
      className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-medium text-body transition-colors hover:border-ink hover:text-ink"
      aria-live="polite"
    >
      {copied ? <FaCheck /> : <FaRegCopy />}
      {copied ? "DOI copied" : "Copy DOI"}
    </button>
  );
};

// The evidence panel: a light surface with a water-coloured edge, so it reads
// as proof rather than as another card.
const Publication = ({ pub }) => (
  <article {...spotlight} className="spot overflow-hidden rounded-[1.75rem] border border-line border-l-4 border-l-water bg-surface">
    <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-faint">
          <span className="inline-flex items-center gap-2 rounded-full bg-water-soft px-3 py-1 text-xs font-semibold text-ink">
            <FaCheck className="text-water" /> {pub.status}
          </span>
          Conference paper, {pub.year}
        </p>

        <h3 className="mt-6 font-display text-3xl font-semibold leading-[1.08] tracking-[-0.025em] text-ink sm:text-4xl">
          {pub.title}
        </h3>

        {pub.plain && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">{pub.plain}</p>}

        <p className="mt-6 text-base text-body">{pub.venue}</p>
        {pub.description && <p className="mt-1 text-sm text-faint">{pub.description}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="text-faint">DOI</span>
          <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" className="break-all font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            {pub.doi}
          </a>
          <CopyDoi doi={pub.doi} />
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <a href={pub.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Read on IEEE Xplore <FaExternalLinkAlt className="text-xs" />
          </a>
          {pub.certificate && (
            <a href={pub.certificate} target="_blank" rel="noopener noreferrer" className="btn-secondary">
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
            className="w-full rounded-xl border border-line"
          />
        </a>
      )}
    </div>

    {pub.highlights?.length > 0 && (
      <div className="grid border-t border-line sm:grid-cols-2">
        {pub.highlights.map((h, i) => (
          <div key={h.title} className={`p-6 sm:p-10 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}>
            <h4 className="font-display text-xl font-semibold text-ink">{h.title}</h4>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-faint">{h.text}</p>
          </div>
        ))}
      </div>
    )}
  </article>
);

const Research = () => {
  if (PUBLICATIONS.length === 0) return null;

  return (
    <section id="research" className="case-grid border-t border-line py-20 lg:py-28">
      <SectionHeading
        title="Research"
        intro="My final-year research applies machine learning to everyday hydration, on a phone. It is the basis of the Well360 app below."
      />
      <div className="case-body flex flex-col gap-8">
        {PUBLICATIONS.map((pub) => (
          <Publication key={pub.doi || pub.title} pub={pub} />
        ))}
      </div>
    </section>
  );
};

export default Research;
