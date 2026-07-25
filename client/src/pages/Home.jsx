import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/ui/SearchBar";

function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar showSync={false} />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-20 right-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

        {/* Hero section */}
        <section className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
            For Dedicated Developers
          </span>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            Understand Any Developer{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              At a Glance
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-gray-400 md:text-base">
            Type a GitHub username and get a beautiful dashboard of developer
            activity, streaks, languages, repositories, and AI-powered profile
            insights.
          </p>

          <div className="mt-8 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-2 shadow-2xl shadow-blue-950/30 backdrop-blur">
            <SearchBar />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
            <span className="rounded-full border border-white/10 px-3 py-1">
              GitHub analytics
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Repo insights
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              Language breakdown
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1">
              AI summary
            </span>
          </div>
        </section>

        {/* Feature cards */}
        <section className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-6 pb-16 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-sm font-semibold text-white">
              Activity Insights
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              View commit counts, streaks, and recent development activity in a
              simple dashboard.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-sm font-semibold text-white">
              Repository Overview
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Explore top repositories, stars, forks, and technologies used
              across projects.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <h3 className="text-sm font-semibold text-white">
              Developer Profile
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">
              Generate a clear developer summary based on real GitHub data and
              project patterns.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
