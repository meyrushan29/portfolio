import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// The open viewer. It mounts fresh each time the lightbox opens, so the
// starting index is plain initial state. Arrow keys step, Escape closes.
const Viewer = ({ images, startIndex, title, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const dialogRef = useRef(null);
  const count = images.length;

  const step = useCallback(
    (delta) => setCurrent((c) => (c + delta + count) % count),
    [count]
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previouslyFocused?.focus?.();
    };
  }, [onClose, step]);

  // Preload the neighbours so stepping feels instant.
  useEffect(() => {
    if (count < 2) return;
    [1, -1].forEach((d) => {
      const img = new Image();
      img.src = images[(current + d + count) % count];
    });
  }, [current, count, images]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      tabIndex={-1}
      className="flex h-full flex-col outline-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="min-w-0 truncate text-sm text-white/70">
          <span className="font-medium text-white">{title}</span>
          <span className="mx-2 text-white/40">/</span>
          <span className="tabular-nums">{current + 1} of {count}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white/10"
        >
          <FaTimes />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current}
            src={images[current]}
            alt={`${title} screenshot ${current + 1}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            onClick={onClose}
          />
        </AnimatePresence>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 transition-colors hover:bg-white/15 sm:left-4"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 transition-colors hover:bg-white/15 sm:right-4"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="flex gap-2 overflow-x-auto px-4 py-4 sm:justify-center sm:px-6" aria-label="All screenshots">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Screenshot ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
                className={`block h-14 w-20 overflow-hidden rounded-md border-2 transition-opacity ${
                  i === current ? "border-water opacity-100" : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Full-screen screenshot viewer. `images` is a list of URLs; `index` is the one
// to open on, or null when closed.
const Lightbox = ({ images, index, title, onClose }) => {
  const open = index !== null && index !== undefined;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#0b1422]/95 text-white backdrop-blur-sm"
          onClick={onClose}
        >
          <Viewer images={images} startIndex={index} title={title} onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Lightbox;
