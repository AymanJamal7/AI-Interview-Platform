import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black text-slate-100">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-950 p-8">
          <div className="mb-8 space-y-3">
            <p className="inline-block rounded-full border border-slate-800 bg-slate-900 px-4 py-1 text-sm uppercase tracking-[0.24em] text-cyan-300">
              AI Interview Prep
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-cyan-300">
              Welcome Back
            </h1>
            <p className="text-sm text-slate-400">
              Secure access for your interview sessions with a modern edge.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm uppercase tracking-[0.16em] text-slate-400">
              Email
            </label>
            <input
              type="email"
              placeholder="hello@domain.com"
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            <label className="block text-sm uppercase tracking-[0.16em] text-slate-400">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-800 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-slate-100 transition hover:bg-slate-700"
            >
              Login
            </button>
          </form>

          <div className="mt-8 rounded-lg bg-slate-900/40 border border-slate-800 p-4 text-center text-sm text-slate-400">
            New here? <button className="font-semibold text-cyan-300 hover:text-cyan-100" type="button" onClick={() => navigate("/register")}>Create an account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;