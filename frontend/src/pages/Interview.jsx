import { useState } from "react";
import api from "../services/api";

function Interview() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        "/interview/generate",
        {
          role,
          skills,
          difficulty,
        }
      );

      setQuestions(res.data.questions);
    } catch (err) {
      console.error(err);
      alert("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 rounded-lg border border-slate-800 bg-slate-950 px-8 py-8">
            <h1 className="text-4xl font-semibold text-cyan-300">
              Generate Interview Questions
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Generate a question set for your next interview session.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm uppercase tracking-[0.16em] text-slate-400 mb-2">
                    Role
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="Frontend Engineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-[0.16em] text-slate-400 mb-2">
                    Skills
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    placeholder="React, Typescript, Design Systems"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-[0.16em] text-slate-400 mb-2">
                    Difficulty
                  </label>
                  <select
                    className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate Questions"}
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-slate-800 bg-slate-950 p-6"
                >
                  <span className="text-sm uppercase tracking-[0.2em] text-cyan-300">
                    {q.category}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-slate-100">
                    {q.question}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Interview;