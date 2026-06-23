import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Interview from "./pages/Interview";
import History from "./pages/History";
import InterviewDetails from "./pages/InterviewDetails";
import AnswerEvaluation from "./pages/AnswerEvaluation";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-slate-100">
      <Sidebar />
      <div className="ml-72 min-h-screen px-8 py-8 sm:px-10 lg:px-12">
        <Navbar />
        <main className="mt-8 space-y-8">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/interview" element={<AppLayout><Interview /></AppLayout>} />
        <Route path="/history" element={<AppLayout><History /></AppLayout>} />
        <Route path="/interview/:id" element={<AppLayout><InterviewDetails /></AppLayout>} />
        <Route path="/history/:id" element={<AppLayout><InterviewDetails /></AppLayout>} />
        <Route path="/evaluate" element={<AppLayout><AnswerEvaluation /></AppLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;