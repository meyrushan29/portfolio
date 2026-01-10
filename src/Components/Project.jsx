import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { FaGithub, FaLink } from "react-icons/fa";

const Project = () => {
  return (
    <div id="projects" className="border-b border-neutral-900 pb-24">
      <motion.h2 
        whileInView={{opacity:1 ,y:0}}
        initial={{opacity:0,y:-100}}
        transition={{duration:0.5}} 
        className="my-20 text-center text-4xl font-light"
      >
        Projects
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-20">
        {PROJECTS.map((project, index) => (
           <motion.div 
             key={index}
             whileInView={{opacity:1 , y:0}}
             initial={{opacity:0, y:50}}
             transition={{duration: 0.5, delay: index * 0.1}}
             className="glass-card p-6 hover:shadow-cyan-500/10 transition-shadow group relative overflow-hidden"
           >
             {/* Image placeholder with overlay */ }
             <div className="relative overflow-hidden rounded-lg mb-4 h-48">
                 <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-neutral-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      {/* Assuming valid links later, for now just icons */}
                      <button className="p-2 bg-neutral-100 rounded-full text-neutral-900 hover:bg-cyan-300 transition-colors"><FaGithub /></button>
                      <button className="p-2 bg-neutral-100 rounded-full text-neutral-900 hover:bg-cyan-300 transition-colors"><FaLink /></button>
                  </div>
             </div>

              <h6 className="mb-2 text-xl font-bold bg-gradient-to-r from-neutral-100 to-neutral-400 bg-clip-text text-transparent">{project.title}</h6>
              <p className="mb-4 text-neutral-400 text-sm line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="rounded bg-neutral-800 px-2 py-1 text-xs font-medium text-cyan-400 border border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
            </div>
           </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Project;
