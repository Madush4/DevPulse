import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorMessage({ username, error }) {
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "We could not load this GitHub profile. Please try again.";

  if (error.status == 403 || error.status == 429) {
    title = "Rate limit reached";
    message =
      "GitHub API limit was reached. Please wait a little and try again.";
  }

  if (error.status == 500) {
    title = "Server error";
    message = "Our backend had a problem while loading this profile.";
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="mt-3 text-sm text-gray-400">{message}</p>

        {username && (
          <p className="mt-2 text-xs text-gray-500">
            Requested account : @{username}
          </p>
        )}

        <button
          className="mt-6 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
          onClick={() => navigate("/")}
        >Back to search</button>
      </div>
    </div>
  );
}

export default ErrorMessage;
