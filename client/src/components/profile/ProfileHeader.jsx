import React from "react";
import { FaMapMarkerAlt, FaUsers, FaUserFriends, FaBook } from "react-icons/fa";

function ProfileHeader({ user }) {
  const name = user.display_name || user.github_username;
  console.log("location", user.location);

  const initials = name

    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return (
    <section
      className="  border border-white/10 bg-linear-to-r 
           from-slate-900 to-slate-800/50 p-8 rounded-xl mx-4 mt-4"
    >
      <div className="h-0.5 w-16 bg-blue-500 rounded-full mb-6" />
      <div className="flex flex-row gap-5 md:flex-row md:items-center ">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full 
           bg-blue-600/20 text-3xl font-bold text-blue-300 
           ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10 shrink-0"
        >
          {initials}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {name}
          </h2>
          <p className="text-sm text-gray-400">@{user.github_username}</p>
          <a
            href={`https://github.com/${user.github_username}`}
            target="_blank"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors mt-1 inline-block"
          >
            View on GitHub →
          </a>
          {user.bio && (
            <p className="text-sm max-w-2xl mt-2 text-gray-300">{user.bio}</p>
          )}
          <div className="flex flex-wrap text-xs text-gray-300 mt-3 gap-4">
            {user.location && (
              <span className="rounded-full bg-white/10 px-3 py-1 flex gap-1 items-center">
                <FaMapMarkerAlt size={10} className="text-blue-400" />
                {user.location}
              </span>
            )}
            <span className="rounded-full bg-white/10 px-3 py-1 flex gap-1 items-center">
              <FaUsers size={10} className="text-blue-400" />
              {user.followers} followers
            </span>

            <span className="rounded-full bg-white/10 px-3 py-1 flex gap-1 items-center">
              <FaBook size={10} className="text-blue-400" />
              {user.public_repos} repos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
