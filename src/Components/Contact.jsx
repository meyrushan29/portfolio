import { useState } from "react";
import { CONTACT } from "../constants"
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

const Contact = () => {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error | unconfigured

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!CONTACT.formEndpoint) {
      setStatus("unconfigured");
      return;
    }
    setStatus("submitting");
    const form = e.target;
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
   <div id="contact" className="border-b border-line pb-24 pt-10">
    <motion.h2
      whileInView={{opacity:1 ,y:0}}
      initial={{opacity:0,y:-100}}
      transition={{duration:0.5}}
      className="my-10 text-center text-4xl font-light text-ink"
    >
      Get in <span className="text-cyan-400 font-medium">Touch</span>
    </motion.h2>

    <div className="flex flex-col lg:flex-row gap-12 max-w-4xl mx-auto">
      <motion.div
        whileInView={{opacity:1 ,x:0}}
        initial={{opacity:0,x:-100}}
        transition={{duration:0.8}}
        className="lg:w-2/5 flex flex-col gap-6"
      >
        <div className="flex items-center gap-4 text-body">
           <FaMapMarkerAlt className="text-cyan-500 flex-shrink-0" />
           <p>{CONTACT.address}</p>
        </div>
        <div className="flex items-center gap-4 text-body">
           <FaPhone className="text-cyan-500 flex-shrink-0" />
           <p>{CONTACT.phoneNo}</p>
        </div>
        <a
          href={`mailto:${CONTACT.email}`}
          className="flex items-center gap-4 text-body hover:text-cyan-400 transition-colors w-fit"
        >
          <FaEnvelope className="text-cyan-500 flex-shrink-0" />
          {CONTACT.email}
        </a>
        <div className="flex items-center gap-4 pt-2">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-10 h-10 rounded-full border border-line text-body hover:text-cyan-400 hover:border-cyan-400/50 transition-colors text-lg">
            <FaLinkedin />
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center justify-center w-10 h-10 rounded-full border border-line text-body hover:text-cyan-400 hover:border-cyan-400/50 transition-colors text-lg">
            <FaGithub />
          </a>
        </div>
      </motion.div>

      <motion.form
        whileInView={{opacity:1 ,y:0}}
        initial={{opacity:0,y:50}}
        transition={{duration:0.8}}
        onSubmit={handleSubmit}
        className="lg:w-3/5 glass-card p-6 flex flex-col gap-4"
      >
        <div>
          <label htmlFor="name" className="block text-sm text-faint mb-1">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg bg-surface-alt border border-line px-4 py-2.5 text-body placeholder:text-faint focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-faint mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg bg-surface-alt border border-line px-4 py-2.5 text-body placeholder:text-faint focus:outline-none focus:border-cyan-400 transition-colors"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm text-faint mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full rounded-lg bg-surface-alt border border-line px-4 py-2.5 text-body placeholder:text-faint focus:outline-none focus:border-cyan-400 transition-colors resize-none"
            placeholder="How can I help?"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:hover:scale-100"
        >
          <FaPaperPlane className="text-sm" />
          {status === "submitting" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p className="text-sm text-green-400">Thanks for reaching out &mdash; I&apos;ll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">Something went wrong - please try emailing me directly instead.</p>
        )}
        {status === "unconfigured" && (
          <p className="text-sm text-faint">This form isn&apos;t connected yet &mdash; please email me directly at <a href={`mailto:${CONTACT.email}`} className="text-cyan-400 hover:underline">{CONTACT.email}</a>.</p>
        )}
      </motion.form>
    </div>
   </div>
  )
}

export default Contact
