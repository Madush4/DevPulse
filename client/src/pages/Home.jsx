import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/ui/searchBar";

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar showSync={false} />

      <section className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <span className="w-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-medium tracking-wide">
          For Dedicated Developers
        </span>

        <h1 className="max-w-3xl text-2xl font-semibold leading-tight md:text-4xl lg:text-5xl">
          Understand Any Developer{" "}
          <span className="block text-indigo-500 md:inline">At a Glance</span>
        </h1>

        <p className="max-w-xl text-sm text-gray-400 md:text-base">
          Type a GitHub username. Get a beautiful dashboard of their activity,
          streaks, languages, repos — and an AI-generated developer profile.
        </p>

        <div className="mt-4 w-full max-w-xl">
          <SearchBar />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
