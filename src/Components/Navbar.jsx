import { PiStudentFill } from "react-icons/pi";
import { FaLinkedin, FaGithub, FaTwitterSquare, FaInstagram } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <PiStudentFill className="w-12 h-12" />
      </div>
      <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
        <FaLinkedin />
        <FaGithub />
        <FaTwitterSquare />
        <FaInstagram />
      </div>
    </nav>
  );
}

export default Navbar;
