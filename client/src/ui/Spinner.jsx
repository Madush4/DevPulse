import React from "react";
import { useProfile } from "../hooks/useProfile";
import { useParams } from "react-router-dom";

function Spinner({ username }) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-slate-950 px-4 py-2 gap-4">
      <div className="w-10 h-10 border-4 rounded-full p-2 boder-gray-700 border-t-blue-500 animate-spin"></div>
      <p className="text-md font-semibold text-white">
        Loading Data for : {username ? `@${username}` : "profile"} ...
      </p>
    </div>
  );
}

export default Spinner;
