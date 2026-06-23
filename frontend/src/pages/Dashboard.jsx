import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalInterviews: 0,
    totalQuestions: 0,
    mostUsedRole: "",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/interview/analytics");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="px-6 py-10 lg:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-10">
            <h1 className="text-4xl font-semibold text-blue-300">Dashboard</h1>
            <p className="mt-2 text-slate-400">Track your interview preparation progress</p>
          </div>

          {/* Stats Section */}
          <div className="grid gap-6 sm:grid-cols-3 mb-10">
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">Total Sessions</p>
              <p className="mt-4 text-5xl font-semibold text-slate-100">{stats.totalInterviews}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">Total Questions</p>
              <p className="mt-4 text-5xl font-semibold text-slate-100">{stats.totalQuestions}</p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-slate-400">Most Used Role</p>
              <p className="mt-4 text-2xl font-semibold text-slate-100 break-words">{stats.mostUsedRole || "None"}</p>
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8">
            <h2 className="text-2xl font-semibold text-purple-300 mb-6">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <button
                onClick={() => navigate("/interview")}
                className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-100 transition hover:bg-slate-800"
              >
                Create Session
              </button>
              <button
                onClick={() => navigate("/history")}
                className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-100 transition hover:bg-slate-800"
              >
                View History
              </button>
              <button
                onClick={fetchStats}
                className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-slate-100 transition hover:bg-slate-800"
              >
                Refresh Stats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
