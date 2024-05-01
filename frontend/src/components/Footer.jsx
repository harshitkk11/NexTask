import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-[100%] flex items-center px-8">
      <div className="w-[100%] py-8 flex flex-col-reverse md:flex-row gap-5 md:gap-0 border-t border-border-color">
        <div className="w-[100%] md:w-[50%]">
          <p className="text-gray-40 text-center md:text-start">© 2024 NexTask, Inc. All rights reserved.</p>
        </div>
        <div className="w-[100%] md:w-[50%] flex justify-center items-center md:justify-end gap-3">
          <a
            href="https://github.com/harshitkk11"
            target="_blank"
            className="text-2xl text-gray-40 hover:text-text-color"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/harshitkk11/"
            target="_blank"
            className="text-2xl text-gray-40 hover:text-text-color"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
