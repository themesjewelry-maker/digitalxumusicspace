import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PhilosophyPage from "./pages/PhilosophyPage";
import VocalPage from "./pages/VocalPage";
import TeacherPage from "./pages/TeacherPage";
import AboutPage from "./pages/AboutPage";
import PianoPhilosophyPage from "./pages/PianoPhilosophyPage";
import AdminBookings from "./pages/AdminBookings";
import OldAIHomePage from "./pages/OldAIHomePage";
import MidAIHomePage from "./pages/MidAIHomePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/philosophy" element={<PhilosophyPage />} />
      <Route path="/piano-philosophy" element={<PianoPhilosophyPage />} />
      <Route path="/vocal" element={<VocalPage />} />
      <Route path="/teacher" element={<TeacherPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/old-ai-home" element={<OldAIHomePage />} />
      <Route path="/mid-ai-home" element={<MidAIHomePage />} />
    </Routes>
    </>
  );
}
