import { Routes, Route } from 'react-router-dom'
import BgDeco from './components/BgDeco'
import Header from './components/Header'
import Footer from './components/Footer'
import MusicPlayer from './components/MusicPlayer'
import VisitorGate from './components/VisitorGate'
import HomePage from './pages/HomePage'
import YoutubePage from './pages/YoutubePage'
import HobbyPage from './pages/HobbyPage'
import DiaryPage from './pages/DiaryPage'
import DiaryWritePage from './pages/DiaryWritePage'
import TestGatePage from './pages/TestGatePage'

export default function App() {
  return (
    <VisitorGate>
      <BgDeco />
      <Header />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/youtube"     element={<YoutubePage />} />
        <Route path="/hobby"       element={<HobbyPage />} />
        <Route path="/diary"       element={<DiaryPage />} />
        <Route path="/diary/write" element={<DiaryWritePage />} />
        <Route path="/test-gate"   element={<TestGatePage />} />
      </Routes>
      <Footer />
      <MusicPlayer />
    </VisitorGate>
  )
}
