import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="fixed left-0 top-0 z-20 h-full w-72 overflow-hidden border-r border-slate-800 bg-black px-6 py-8 text-slate-100">
      <div className="mb-10">
        <div className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-4">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            navigation
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-cyan-300">
            Interview Lab
          </h1>
        </div>
      </div>

      <nav className="space-y-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-slate-900 text-slate-100"
                : "text-slate-300 hover:bg-slate-900/80 hover:text-slate-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/interview"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-slate-900 text-slate-100"
                : "text-slate-300 hover:bg-slate-900/80 hover:text-slate-100"
            }`
          }
        >
          Generate
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-slate-900 text-slate-100"
                : "text-slate-300 hover:bg-slate-900/80 hover:text-slate-100"
            }`
          }
        >
          History
        </NavLink>
      </nav>

      <div className="absolute bottom-8 left-6 right-6">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="w-full rounded-lg border border-slate-800 bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-100 transition hover:bg-slate-800"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;