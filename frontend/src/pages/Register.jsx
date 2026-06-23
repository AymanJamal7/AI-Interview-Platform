import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black text-slate-100">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-950 p-8">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple-300">
              New Journey
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-purple-300">
              Create your account
            </h1>
            <p className="mt-3 text-slate-400">
              Build your interview history with a bold, modern interface.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-sm uppercase tracking-[0.16em] text-slate-400">
              Full Name
            </label>
            <input
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
              placeholder="Jane Doe"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />

            <label className="block text-sm uppercase tracking-[0.16em] text-slate-400">
              Email address
            </label>
            <input
              type="email"
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
              placeholder="hello@domain.com"
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
              className="w-full rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
              placeholder="Create a secure password"
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
              Register
            </button>
          </form>

          <div className="mt-8 rounded-lg bg-slate-900/40 border border-slate-800 p-4 text-center text-sm text-slate-400">
            Already have an account? <button className="font-semibold text-cyan-300 hover:text-cyan-100" type="button" onClick={() => navigate("/")}>Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;