import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

function AnswerEvaluation() {
  const location = useLocation();
  const [sessionId, setSessionId] = useState(location.state?.sessionId || "");
  const [question, setQuestion] = useState(location.state?.question || "");
  const [answer, setAnswer] = useState("");

  const [result, setResult] = useState(null);

  const handleEvaluate = async () => {
    if (!answer.trim()) {
      alert("Please provide an answer to evaluate.");
      return;
    }
    try {
      const res = await api.post(
        "/interview/evaluate",
        {
          sessionId,
          question,
          answer,
        }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Evaluation failed");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#050e1c] text-slate-100">
      <div className="px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 rounded-lg border border-slate-800 bg-slate-950 p-8">
            <h1 className="text-5xl font-semibold text-yellow-300">
              Answer Evaluation
            </h1>
            <p className="mt-3 text-slate-400">
              Submit your response and let AI provide scoring, feedback, and an ideal answer.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm uppercase tracking-[0.16em] text-slate-400 mb-2">
                  Session ID
                </label>
                <input
                  type="number"
                  placeholder="Session ID"
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  value={sessionId}
                  onChange={(e) => setSessionId(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-[0.16em] text-slate-400 mb-2">
                  Interview Question
                </label>
                <textarea
                  placeholder="Interview Question"
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 h-28 resize-none"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm uppercase tracking-[0.16em] text-slate-400 mb-2">
                  Your Answer
                </label>
                <textarea
                  placeholder="Your Answer"
                  className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20 h-40 resize-none"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </div>

              <button
                onClick={handleEvaluate}
                className="rounded-lg bg-slate-800 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100 transition hover:bg-slate-700"
              >
                Evaluate Answer
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-10 rounded-lg border border-slate-800 bg-slate-950 p-8">
              <h2 className="text-3xl font-semibold text-green-300 mb-5">
                Evaluation Result
              </h2>

              <div className="space-y-4 text-slate-300">
                <p>
                  <strong className="text-slate-100">Score:</strong> {result.score}
                </p>
                <div>
                  <p className="text-slate-100 font-semibold">Feedback:</p>
                  <p className="mt-2">{result.feedback}</p>
                </div>
                <div>
                  <p className="text-slate-100 font-semibold">Ideal Answer:</p>
                  <p className="mt-2">{result.idealAnswer}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnswerEvaluation;