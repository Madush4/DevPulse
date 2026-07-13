import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10 bg-transparent">
      <div className="flex">
        <Link
          to="/"
          className="text-white gap-2 flex items-center font-semibold text-sm"
        >
          ⚡ devPulse
        </Link>
      </div>

      <div className="flex items-center gap-8 px-6">
        <a
          href="/#How it works"
          className="text-sm text-gray-400 hover:text-white transition-colors"
          target="_blank"
        >
          How it works
        </a>
        
        <a
          href="https://github.com/Madush4"
          className="text-sm text-gray-400 hover:text-white transition-colors"
          target="_blank"
        >
          <FaGithub size={18}/>
        </a>
        <a
          href="https://www.linkedin.com/in/madushadamith"
          className="text-sm text-gray-400 hover:text-white transition-colors"
          target="_blank"
        >
          <FaLinkedin size={18} />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
