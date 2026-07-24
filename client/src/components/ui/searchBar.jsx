import React from "react";

function SearchBar() {
  return (
    <div className="w-full max-w-md">
      <input
        className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-5 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
        placeholder="Enter GitHub username"
      />
    </div>
  );
}

export default SearchBar;
