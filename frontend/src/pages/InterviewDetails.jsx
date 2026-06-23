import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await api.get(
        `/interview/${id}/questions`
      );

      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100">
      <div className="px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 rounded-lg border border-slate-800 bg-slate-950 px-8 py-8">
            <h1 className="text-4xl font-semibold text-emerald-300">
              Interview Questions
            </h1>
            <p className="mt-3 text-slate-400">
              Review generated questions and continue your workflow.
            </p>
          </div>

          <div className="space-y-5">
            {questions.map((q) => (
              <div
                key={q.id}
                className="rounded-lg border border-slate-800 bg-slate-950 p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">
                    {q.category}
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-semibold leading-snug text-slate-100">
                  {q.question}
                </h3>

                <button
                  onClick={() =>
                    navigate("/evaluate", {
                      state: {
                        sessionId: id,
                        question: q.question,
                      },
                    })
                  }
                  className="mt-6 inline-flex rounded-lg border border-slate-800 bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100 transition hover:bg-slate-800"
                >
                  Answer This Question
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewDetails;