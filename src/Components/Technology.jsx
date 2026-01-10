import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb, SiHtml5, SiCss3, SiJavascript, SiDocker, SiMysql, SiSpringboot } from "react-icons/si";
import { FaNodeJs, FaJava, FaAws } from "react-icons/fa";
import { motion } from "framer-motion";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const TechItem = ({ Icon, color, duration, name }) => (
  <motion.div
    variants={iconVariants(duration)}
    initial="initial"
    animate="animate"
    className="rounded-2xl border-4 border-neutral-800 p-4 transition-colors hover:border-neutral-700 bg-neutral-900/50"
    title={name}
  >
    <Icon className={`text-7xl ${color}`} />
  </motion.div>
);

const Technology = () => {
  return (
    <div id="technologies" className="border-b border-neutral-800 pb-24">
      <motion.h2
       whileInView={{opacity:1 ,y:0}}
       initial={{opacity:0,y:-100}}
       transition={{duration:1.5}} 
       className="my-20 text-center text-4xl font-light">Technologies</motion.h2>
       
      <motion.div
       whileInView={{opacity:1 ,x:0}}
       initial={{opacity:0,x:-100}}
       transition={{duration:1.5}} 
       className="flex flex-wrap items-center justify-center gap-6"
      >
        <TechItem Icon={RiReactjsLine} color="text-cyan-400" duration={2} name="React" />
        <TechItem Icon={TbBrandNextjs} color="text-white" duration={5} name="Next.js" />
        <TechItem Icon={SiMongodb} color="text-green-500" duration={6} name="MongoDB" />
        <TechItem Icon={FaNodeJs} color="text-green-500" duration={4} name="Node.js" />
        <TechItem Icon={SiSpringboot} color="text-green-600" duration={3} name="Spring Boot" />
        <TechItem Icon={FaJava} color="text-orange-500" duration={5} name="Java" />
        <TechItem Icon={SiMysql} color="text-blue-500" duration={4} name="MySQL" />
        <TechItem Icon={SiDocker} color="text-blue-600" duration={2.5} name="Docker" />
        <TechItem Icon={FaAws} color="text-orange-400" duration={3.5} name="AWS" />
        <TechItem Icon={SiJavascript} color="text-yellow-400" duration={6} name="JavaScript" />
      </motion.div>
    </div>
  );
};

export default Technology;
