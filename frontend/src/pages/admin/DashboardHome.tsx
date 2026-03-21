import { useEffect, useState } from "react";
import { dashboardService } from "../../services/dashboard.service";
import type { DashboardStats } from "../../types/api";

function DashboardHome() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await dashboardService.stats();
      setStats(data);
    };
    void loadStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Dashboard Overview</h1>
      <p className="mt-2 text-sm text-zinc-300">Operational snapshot across core content modules.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Products</p>
          <p className="mt-2 text-3xl text-amber-400">{stats?.products ?? "--"}</p>
        </article>
        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Media Posts</p>
          <p className="mt-2 text-3xl text-amber-400">{stats?.mediaPosts ?? "--"}</p>
        </article>
        <article className="rounded-lg border border-zinc-700 bg-zinc-900 p-4">
          <p className="text-xs uppercase tracking-widest text-zinc-400">Enquiries</p>
          <p className="mt-2 text-3xl text-amber-400">{stats?.enquiries ?? "--"}</p>
        </article>
      </div>
    </div>
  );
}

export default DashboardHome;
