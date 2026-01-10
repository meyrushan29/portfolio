import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <div id="experience" className="border-b border-neutral-900 pb-24">
      <motion.h2 
        whileInView={{opacity:1 ,y:0}}
        initial={{opacity:0,y:-100}}
        transition={{duration:0.5}} 
        className="my-20 text-center text-4xl font-light"
      >
        Experience
      </motion.h2>
      <div className="flex flex-col items-center">
        {EXPERIENCES.map((experience, index) => (
          <div key={index} className="mb-12 flex flex-wrap lg:justify-center w-full lg:w-3/4 relative">
             {/* Timeline Line (Optional, simplified for now) */}
             
            <motion.div 
             whileInView={{opacity:1 ,x:0}}
             initial={{opacity:0,x:-100}}
             transition={{duration:1}} 
             className="w-full lg:w-1/4 flex flex-col items-start lg:items-end lg:pr-12"
            >
              <p className="mb-2 text-sm text-cyan-300 font-semibold">{experience.year}</p>
              <div className="hidden lg:block w-3 h-3 bg-neutral-600 rounded-full mt-1.5 relative right-[-54px] z-10 border border-neutral-900"></div> {/* Dot for timeline */}
            </motion.div>
            
            <motion.div 
              whileInView={{opacity:1 ,x:0}}
              initial={{opacity:0,x:100}}
              transition={{duration:1}} 
              className="w-full max-w-xl lg:w-3/4 pl-4 lg:pl-12 border-l-2 border-neutral-800 lg:border-none relative" // simplified border logic
            >
               {/* Vertical line for desktop could be absolute positioned, but reusing border-l for mobile simplicity */}
               <div className="hidden lg:block absolute left-0 top-2 bottom-0 w-px bg-neutral-800"></div>

              <h6 className="mb-2 font-semibold text-lg text-white">
                {experience.role} - <span className="text-sm text-purple-400">{experience.company}</span>
              </h6>
              <p className="mb-4 text-neutral-400 text-sm leading-relaxed">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="mr-2 mt-2 rounded bg-neutral-900/80 border border-neutral-800 px-3 py-1 text-xs font-medium text-cyan-500 hover:bg-neutral-800 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>    
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
