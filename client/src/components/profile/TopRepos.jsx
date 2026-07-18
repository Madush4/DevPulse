import React from "react";
import { FaStar, FaCodeBranch } from "react-icons/fa";

function TopRepos({ repos }) {
  const topRepos = (repos || []).filter((repo) => !repo.is_fork).slice(0, 4);

  if (topRepos.length === 0) return null;

  return (
    <div className="bg-slate-900/70 rounded-lg px-4 py-3 flex flex-col">
      <h2 className="text-center text-white font-semibold">Top Repositories</h2>

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        {topRepos.map((repo) => (
          <div
            key={repo.id}
            className="group flex min-h-[190px] flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-slate-900"
          >
            <div>
              <a
                href={`https://github.com/${repo.github_username}/${repo.repo_name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="line-clamp-1 text-sm font-semibold text-blue-400 transition-colors group-hover:text-blue-300"
              >
                {repo.repo_name}
              </a>

              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-400">
                {repo.description || "No description available."}
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex flex-wrap gap-2">
                {(repo.languages || []).length > 0 ? (
                  repo.languages.slice(0, 3).map((lang) => (
                    <span
                      key={lang.language}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gray-300"
                    >
                      {lang.language}
                    </span>
                  ))
                ) : (
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-gray-300">
                    {repo.language || "N/A"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-white/10 pt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <FaStar className="text-yellow-400" />
                  {repo.stars?.toLocaleString() || 0}
                </span>

                <span className="flex items-center gap-1.5">
                  <FaCodeBranch className="text-blue-400" />
                  {repo.forks?.toLocaleString() || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRepos;
