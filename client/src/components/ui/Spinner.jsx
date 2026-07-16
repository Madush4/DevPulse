function Spinner({ username }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 px-4 py-2">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-700 border-t-blue-500"></div>

      <p className="text-md font-semibold text-white">
        Loading data for {username ? `@${username}` : "profile"}...
      </p>
    </div>
  );
}

export default Spinner;
