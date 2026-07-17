import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound({username}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center">
        <div className="text-4xl">⚠️</div>
        <h1 className="mt-4 text-2xl font-bold text-white">User Not Found !</h1>
        <p className="mt-3 text-sm text-gray-400">
          We could not find a GitHub profile for @{username};
        </p>

        <button
          className="mt-6 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          onClick={() => navigate("/")}
        >
          Back to search
        </button>
      </div>
    </div>
  );
}

export default NotFound;
