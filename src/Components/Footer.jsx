import { CONTACT, PUBLICATIONS } from "../constants";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  const paper = PUBLICATIONS[0];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-faint sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>&copy; {year} Meyrushan Nadarajan</p>
        {paper && (
          <a href={paper.url} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
            {paper.status}, {paper.year}
          </a>
        )}
        <div className="flex items-center gap-5 text-lg">
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent"><FaLinkedin /></a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent"><FaGithub /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
