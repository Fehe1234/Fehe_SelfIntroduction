import { Routes, Route } from 'react-router-dom'
import BgDeco from './components/BgDeco'
import Header from './components/Header'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import VisitorGate from './components/VisitorGate'
import EasterEgg from './components/EasterEgg'
import VersionWatcher from './components/VersionWatcher'
import HomePage from './pages/HomePage'
import YoutubePage from './pages/YoutubePage'
import HobbyPage from './pages/HobbyPage'
import DailyPage from './pages/DailyPage'
import DailyWritePage from './pages/DailyWritePage'
import TestGatePage from './pages/TestGatePage'
import SecretPage from './pages/SecretPage'
import StatusPage from './pages/StatusPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <VisitorGate>
      <BgDeco />
      <Header />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/youtube"     element={<YoutubePage />} />
        <Route path="/hobby"        element={<HobbyPage />} />
        <Route path="/hobby/:tab"   element={<HobbyPage />} />
        <Route path="/diary"       element={<DailyPage />} />
        <Route path="/diary/write" element={<DailyWritePage />} />
        <Route path="/test-gate"   element={<TestGatePage />} />
        <Route path="/secret"      element={<SecretPage />} />
        <Route path="/status"      element={<StatusPage />} />
        <Route path="/admin"       element={<AdminPage />} />
      </Routes>
      <Footer />
      <MusicPlayer />
      <EasterEgg />
      <VersionWatcher />
    </VisitorGate>
  )
}
