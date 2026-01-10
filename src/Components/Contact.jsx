import { CONTACT } from "../constants"
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
   <div id="contact" className="border-b border-neutral-900 pb-24 pt-10">
    <motion.h2
      whileInView={{opacity:1 ,y:0}}
      initial={{opacity:0,y:-100}}
      transition={{duration:0.5}} 
      className="my-10 text-center text-4xl font-light"
    >
      Get in <span className="text-cyan-400 font-medium">Touch</span>
    </motion.h2>

    <div className="flex flex-col items-center justify-center gap-6 tracking-tighter">
      <motion.div 
        whileInView={{opacity:1 ,x:0}}
        initial={{opacity:0,x:-100}}
        transition={{duration:1}} 
        className="flex items-center gap-4 text-neutral-300"
      >
         <FaMapMarkerAlt className="text-cyan-500" />
         <p>{CONTACT.address}</p>
      </motion.div>

      <motion.div 
        whileInView={{opacity:1 ,x:0}}
        initial={{opacity:0,x:100}}
        transition={{duration:1}} 
        className="flex items-center gap-4 text-neutral-300"
      >
         <FaPhone className="text-cyan-500" />
         <p>{CONTACT.phoneNo}</p>
      </motion.div>

      <motion.a 
        whileInView={{opacity:1 ,y:0}}
        initial={{opacity:0,y:50}}
        transition={{duration:0.5}}
        href={`mailto:${CONTACT.email}`} 
        className="flex items-center gap-2 border-b-2 border-cyan-500 pb-1 hover:text-cyan-400 transition-colors"
      >
        <FaEnvelope />
        {CONTACT.email}
      </motion.a>
    </div>
   </div>
  )
}

export default Contact