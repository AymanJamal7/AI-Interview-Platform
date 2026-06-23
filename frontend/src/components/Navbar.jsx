import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const pageLabel = (() => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/interview") return "Generate";
    if (pathname === "/history") return "History";
    if (pathname.startsWith("/history/")) return "Session Details";
    if (pathname.startsWith("/interview/")) return "Session Details";
    if (pathname === "/evaluate") return "Evaluation";
    return "AI Interview Prep";
  })();

  return (
    <header className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-6 py-4">
      <h2 className="text-xl font-semibold text-cyan-300">
        {pageLabel}
      </h2>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
        className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-100 transition hover:bg-slate-800"
      >
        Logout
      </button>
    </header>
  );
}

export default Navbar;