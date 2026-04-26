import { Routes, Route } from "react-router-dom";
import HomeVersionSwitcher from "./components/HomeVersionSwitcher";
import HomePage from "./pages/HomePage";
import HomePageV1 from "./pages/home-versions/HomePageV1";
import HomePageV2 from "./pages/home-versions/HomePageV2";
import HomePageV3 from "./pages/home-versions/HomePageV3";
import HomePageV4 from "./pages/home-versions/HomePageV4";
import PhilosophyPage from "./pages/PhilosophyPage";
import VocalPage from "./pages/VocalPage";
import TeacherPage from "./pages/TeacherPage";
import AboutPage from "./pages/AboutPage";
import PianoPhilosophyPage from "./pages/PianoPhilosophyPage";
import AdminBookings from "./pages/AdminBookings";

export default function App() {
  return (
    <>
      <HomeVersionSwitcher />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home/v1" element={<HomePageV1 />} />
      <Route path="/home/v2" element={<HomePageV2 />} />
      <Route path="/home/v3" element={<HomePageV3 />} />
      <Route path="/home/v4" element={<HomePageV4 />} />
      <Route path="/philosophy" element={<PhilosophyPage />} />
      <Route path="/piano-philosophy" element={<PianoPhilosophyPage />} />
      <Route path="/vocal" element={<VocalPage />} />
      <Route path="/teacher" element={<TeacherPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
    </Routes>
    </>
  );
}
