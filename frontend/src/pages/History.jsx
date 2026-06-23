import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function History() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/interview");
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSession = async (id) => {
  try {
    await api.delete(`/interview/${id}`);

    setSessions(
      sessions.filter(
        (session) => session.id !== id
      )
    );
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 rounded-lg border border-slate-800 bg-slate-950 px-8 py-8">
            <h1 className="text-4xl font-semibold text-purple-300">
              Interview History
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Review past interview sessions and revisit saved question sets.
            </p>
          </div>

          {sessions.length === 0 ? (
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-8 text-slate-400">
              No interview sessions found.
            </div>
          ) : (
            <div className="space-y-6">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-lg border border-slate-800 bg-slate-950 p-7"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-slate-100">
                        {session.role}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        {session.skills}
                      </p>
                    </div>
                    <span className="rounded-full bg-slate-900/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
                      {session.difficulty}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <p className="text-slate-300">
                      <strong>Date:</strong> {new Date(session.created_at).toLocaleString()}
                    </p>
                    <p className="text-slate-300">
                      <strong>ID:</strong> {session.id}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => navigate(`/history/${session.id}`)}
                      className="rounded-lg border border-slate-800 bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-100 transition hover:bg-slate-800"
                    >
                      View Questions
                    </button>
                    <button
                      onClick={() => deleteSession(session.id)}
                      className="rounded-full border border-red-500/40 bg-red-600/95 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default History;