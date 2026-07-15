function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
      <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>

      <h2 className="mt-3 text-2xl font-bold text-white">{value ?? "-"}</h2>

      <p className="mt-1 text-xs text-gray-500">{sub}</p>
    </div>
  );
}

export default StatCard;
