import { Routes, Route } from 'react-router-dom'
import BgDeco from './components/BgDeco'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import YoutubePage from './pages/YoutubePage'
import HobbyPage from './pages/HobbyPage'

export default function App() {
  return (
    <>
      <BgDeco />
      <Header />
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/youtube" element={<YoutubePage />} />
        <Route path="/hobby"   element={<HobbyPage />} />
      </Routes>
      <Footer />
    </>
  )
}
