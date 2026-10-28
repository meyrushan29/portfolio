import { useState } from "react";
import { CONTACT } from "../constants"
import { FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaPaperPlane } from "react-icons/fa";

const inputClass = "w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-faint/80 transition-colors focus:border-accent focus:outline-none";

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
   <section id="contact" className="border-t border-line py-24 lg:py-32">
    <div className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <h2 className="font-display text-5xl font-semibold leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">
          Let&apos;s work together
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-faint">
          I&apos;m open to software engineering roles and research collaborations. Email is the fastest way to reach me.
        </p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="mt-8 inline-block break-all font-display text-2xl font-medium text-accent underline decoration-accent/30 decoration-2 underline-offset-[6px] hover:decoration-accent sm:text-3xl"
        >
          {CONTACT.email}
        </a>
        <ul className="mt-10 flex flex-col gap-4 text-body">
          <li className="flex items-center gap-3"><FaMapMarkerAlt className="text-faint" />{CONTACT.address}</li>
          <li className="flex items-center gap-3"><FaPhone className="text-faint" /><a href={`tel:${CONTACT.phoneNo.replace(/\s/g, "")}`} className="hover:text-accent">{CONTACT.phoneNo}</a></li>
          <li className="flex items-center gap-3"><FaLinkedin className="text-faint" /><a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a></li>
          <li className="flex items-center gap-3"><FaGithub className="text-faint" /><a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="hover:text-accent">GitHub</a></li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 self-start rounded-[2rem] border border-line bg-surface p-6 sm:p-8 lg:col-span-6"
      >
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">Message</label>
          <textarea id="message" name="message" required rows={5} className={`${inputClass} resize-none`} placeholder="What would you like to talk about?" />
        </div>

        <button type="submit" disabled={status === "submitting"} className="btn-primary justify-center disabled:opacity-60">
          <FaPaperPlane className="text-xs" />
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>

        <div aria-live="polite">
          {status === "success" && (
            <p className="text-sm text-accent">Message sent. I&apos;ll reply by email soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-700">The message didn&apos;t send. Email me directly at <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>.</p>
          )}
          {status === "unconfigured" && (
            <p className="text-sm text-faint">This form isn&apos;t connected yet. Email me directly at <a href={`mailto:${CONTACT.email}`} className="text-accent underline">{CONTACT.email}</a>.</p>
          )}
        </div>
      </form>
    </div>
   </section>
  )
}

export default Contact
