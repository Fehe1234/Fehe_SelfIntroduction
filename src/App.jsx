import { useState } from 'react'
import BgDeco from './components/BgDeco'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import YoutubePage from './pages/YoutubePage'
import HobbyPage from './pages/HobbyPage'

export default function App() {
  const [activePage, setActivePage] = useState('home')
  const [drawerOpen, setDrawerOpen] = useState(false)

  function switchPage(name) {
    setActivePage(name)
    setDrawerOpen(false)
    window.scrollTo({ top: 0 })
  }

  return (
    <>
      <BgDeco />
      <Header
        activePage={activePage}
        drawerOpen={drawerOpen}
        onToggleDrawer={() => setDrawerOpen(o => !o)}
        onCloseDrawer={() => setDrawerOpen(false)}
        onSwitchPage={switchPage}
      />

      <div className={`page ${activePage === 'home' ? 'active' : ''}`} id="page-home">
        <HomePage />
      </div>
      <div className={`page ${activePage === 'youtube' ? 'active' : ''}`} id="page-youtube">
        <YoutubePage active={activePage === 'youtube'} />
      </div>
      <div className={`page ${activePage === 'hobby' ? 'active' : ''}`} id="page-hobby">
        <HobbyPage />
      </div>

      <Footer />
    </>
  )
}
