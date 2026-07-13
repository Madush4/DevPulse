import React from "react";
import { FaDev, FaGithub, FaLinkedin, FaNodeJs, FaReact } from "react-icons/fa";
import { SiGooglegemini, SiSqlite, SiTailwindcss } from "react-icons/si";

function Footer() {
  return (
    <footer className="bg-slate-950/50 border-t border-white/10 ">
      <div className="flex justify-around px-4 py-2">
        <section>
          <h4 className="text-white font-semibold text-md">⚡ devPulse</h4>
          <p className="text-gray-400 text-xs">For dedicated Developers.</p>
        </section>

        <section>
          <h5 className="text-white mb-2">Built with:</h5>
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 text-xs">React</p>
            <p className="text-gray-400 text-xs">Node.js</p>
            <p className="text-gray-400 text-xs">SQLite</p>
            <p className="text-gray-400 text-xs">Tailwind Css</p>
            <p className="text-gray-400 text-xs"></p>
          </div>
        </section>
        <section>
          <h5 className="text-white mb-2">Features:</h5>
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 text-xs">GitHub profile analytics</p>
            <p className="text-gray-400 text-xs">Repository insights</p>
            <p className="text-gray-400 text-xs">Language usage breakdown</p>
            <p className="text-gray-400 text-xs">Commit activity tracking</p>
            <p className="text-gray-400 text-xs">AI developer summary</p>
          </div>
        </section>
        <section>
          <h5 className="text-white mb-2">Project :</h5>
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 text-xs">
              Full-stack developer analytics platform
            </p>
            <p className="text-gray-400 text-xs">
              GitHub profile search and analysis
            </p>
            <p className="text-gray-400 text-xs">
              Cached data for faster loading
            </p>
            <p className="text-gray-400 text-xs">
              AI-powered developer insights
            </p>
            <p className="text-gray-400 text-xs">
              Built as a portfolio project
            </p>
          </div>
        </section>
      </div>
      <div className="border-t border-white/10 mx-8 mt-2" />

      <section className="flex items-center justify-center gap-4 p-7 text-gray-400">
        <a
          href="https://github.com/Madush4"
          rel = "noopener noreferrer"
          target="_blank"
          className="hover:text-white transition-colors"
        >
          <FaGithub size={20} />
        </a>

        <a
          href="https://linkedin.com/in/madushadamith"
          target="_blank"
          className="hover:text-white transition-colors"
        >
          <FaLinkedin
            size={20}
            className="text-blue-400 hover:text-white transition-colors"
          />
        </a>
        <FaNodeJs
          size={20}
          className="text-green-500 hover:text-white transition-colors"
        />
        <FaReact
          size={20}
          className="text-blue-400 hover:text-white transition-colors"
        />

        <SiSqlite
          size={20}
          className="text-blue-300 hover:text-white transition-colors"
        />
        <SiTailwindcss
          size={20}
          className="text-cyan-400 hover:text-white transition-colors"
        />
        <SiGooglegemini
          size={20}
          className="text-blue-300 hover:text-white transition-colors"
        />
      </section>

      <div className="flex justify-center flex-col items-center font-semibold py-2">
        <p className="text-gray-300 text-xs mb-1">
          &copy;2026 DevPulse. All rights reserved.
        </p>
        <p className="text-gray-400 text-[10px]">
          Designed and developed by Madusha Damith.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
