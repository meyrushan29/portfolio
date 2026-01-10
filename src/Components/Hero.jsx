import { HERO_CONTENT } from "../constants";
import ProfilePic from '../assets/Profile.jpg';
import { motion } from 'framer-motion';

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  }
})

const Hero = () => {
  return (
    <div className="border-b border-neutral-900 pb-24 pt-32 lg:mb-35"> {/* Added padding top for sticky navbar */}
      <div className="flex flex-wrap items-center">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-8 text-5xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
            >
              Meyrushan.com
            </motion.h1>
           
            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-cyan-300 via-slate-500 to-purple-500 bg-clip-text text-3xl tracking-tight text-transparent font-medium"
            >
              Full Stack Developer
            </motion.span>
            
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl py-6 font-light leading-relaxed tracking-wide text-neutral-400"
            >
              {HERO_CONTENT}
            </motion.p>

            <motion.div
                variants={container(1.5)}
                initial="hidden"
                animate="visible"
                className="flex gap-4 mt-4"
            >
                <a
                  href="/resume/Meyrushan_Nadarajan_CV.pdf" // Assuming standard path, user might need to verify
                  download="Meyrushan_Nadarajan_CV.pdf"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
                >
                  Download CV
                </a>
                 <a
                  href="#contact"
                  className="px-6 py-3 rounded-full border border-neutral-700 text-neutral-300 font-medium hover:bg-neutral-800 transition-colors"
                >
                  Contact Me
                </a>
            </motion.div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
           <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                src={ProfilePic}
                alt="Profile Picture"
                className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] object-cover rounded-2xl shadow-2xl border border-neutral-800"
              />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
