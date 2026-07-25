import React from "react";

function SearchBar() {
  return (
    <div className="w-full  flex gap-4 justify-between px-2 py-1">
      <input
        className="w-full flex-1 rounded-xl border border-white/10 bg-slate-900/70 px-5 py-3 text-sm text-white placeholder:text-gray-500 outline-none transition-all duration-200 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20"
        placeholder="Enter GitHub username"
      />
      <button className="px-6 bg-slate-900/80 rounded-xl hover:ring-blue-700 ring hover:bg-slate-900 cursor-pointer transition-all">Sync</button>
    </div>
  );
}

export default SearchBar;
