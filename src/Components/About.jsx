import aboutImg from '../assets/about.jpg';
import { ABOUT_TEXT } from '../constants';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div id="about" className="border-b border-neutral-900 pb-24">
      <h2 className="my-20 text-center text-4xl font-light">
        About <span className="bg-gradient-to-r from-cyan-300 to-purple-500 bg-clip-text text-transparent font-medium">Me</span>
      </h2>
      <div className="flex flex-wrap items-center">
        <motion.div 
          whileInView={{opacity:1,x:0}}
          initial={{opacity:0,x:-100}}
          transition={{duration:0.8}}
          className="w-full lg:w-1/2 lg:p-8"
        >
          <div className="flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-20 rounded-full"></div>
            <img className="relative z-10 rounded-2xl shadow-xl border border-neutral-800" src={aboutImg} alt="About" />
          </div>
        </motion.div>

        <motion.div 
          whileInView={{opacity:1,x:0}}
          initial={{opacity:0,x: 100}}
          transition={{duration:0.8}}
          className="w-full lg:w-1/2"
        >
          <div className="flex justify-center lg:justify-start">
            <p className='my-2 max-w-xl py-6 leading-loose text-neutral-300 glass-card p-6 border-none bg-neutral-900/40'>
              {ABOUT_TEXT}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;