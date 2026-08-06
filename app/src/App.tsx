import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course";
import Lesson from "./pages/Lesson";
import ModuleQuiz from "./pages/ModuleQuiz";
import Gate from "./pages/Gate";
import Aipab from "./pages/Aipab";
import Certificates from "./pages/Certificates";
import Verify from "./pages/Verify";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/course/:slug" element={<Course />} />
      <Route path="/course/:slug/lesson/:lessonId" element={<Lesson />} />
      <Route path="/course/:slug/module/:moduleId/quiz" element={<ModuleQuiz />} />
      <Route path="/course/:slug/gate" element={<Gate />} />
      <Route path="/aipab" element={<Aipab />} />
      <Route path="/certificates" element={<Certificates />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/verify/:serial" element={<Verify />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
