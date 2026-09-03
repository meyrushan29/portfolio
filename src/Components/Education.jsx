import { EDUCATION, PUBLICATIONS } from "../constants";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBookOpen, FaCertificate } from "react-icons/fa";

const Education = () => {
  return (
    <div id="education" className="border-b border-line pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-4xl font-light text-ink"
      >
        Education
      </motion.h2>

      <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto">
        {EDUCATION.map((edu, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6 w-full flex gap-4"
          >
            <FaGraduationCap className="text-cyan-400 text-2xl flex-shrink-0 mt-1" />
            <div>
              <p className="text-sm text-cyan-400 font-semibold mb-1">{edu.year}</p>
              <h3 className="font-semibold text-lg text-ink">{edu.title}</h3>
              <p className="text-sm text-purple-400 mb-2">{edu.institution}</p>
              {edu.description && (
                <p className="text-faint text-sm leading-relaxed">{edu.description}</p>
              )}
            </div>
          </motion.div>
        ))}

        {PUBLICATIONS.length > 0 && (
          <motion.h3
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="mt-8 mb-2 text-2xl font-light text-center text-ink"
          >
            Research &amp; Publications
          </motion.h3>
        )}

        {PUBLICATIONS.map((pub, index) => (
          <motion.div
            key={index}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6 sm:p-8 w-full"
          >
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <FaBookOpen className="text-purple-400 text-2xl flex-shrink-0 mt-1" />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1">
                        Conference Publication
                      </span>
                      <span className="text-sm text-faint">{pub.year}</span>
                    </div>
                    <h4 className="font-semibold text-xl text-ink leading-snug mb-2">{pub.title}</h4>
                    <p className="text-sm text-purple-400 mb-3">{pub.venue}</p>
                    {pub.description && (
                      <p className="text-faint text-sm leading-relaxed">{pub.description}</p>
                    )}
                  </div>
                </div>
              </div>

              {pub.certificateImage && (
                <a
                  href={pub.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full lg:w-64 flex-shrink-0"
                  aria-label="Open full certificate PDF"
                >
                  <div className="relative overflow-hidden rounded-xl border border-line shadow-lg">
                    <img
                      src={pub.certificateImage}
                      alt={`${pub.title} - conference certificate`}
                      loading="lazy"
                      className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/40 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-medium text-white bg-neutral-950/80 rounded-full px-3 py-1.5">
                        <FaCertificate /> View Full PDF
                      </span>
                    </div>
                  </div>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Education;
