import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiClock, FiRefreshCw } from "react-icons/fi";

function Navbar({ showSync = false, cachedAt, onRefresh }) {
  function getSyncText() {
    if (!cachedAt) return "not synced yet!";

    const cachedTime = new Date(cachedAt).getTime();
    const now = Date.now();
    const diffMinutes = Math.floor((now - cachedTime) / (1000 * 60));

    if (diffMinutes < 1) return "synced just now";
    return `syned ${diffMinutes} min ago`;
  }

  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b border-white/10 bg-transparent mb-10">
      <div className="flex">
        <Link
          to="/"
          className="text-white gap-2 flex items-center font-semibold text-sm"
        >
          ⚡ devPulse
        </Link>
      </div>

      <div className="flex items-center gap-8 px-6">
        {showSync && (
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FiClock size={16} />
              <span>{getSyncText()}</span>
            </div>
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-sm font-semibold text-gray-300 transition hover:border-white/40 hover:text-white"
            >
              <FiRefreshCw size={12} />
              refresh
            </button>
          </div>
        )}
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
          <FaGithub size={18} />
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
