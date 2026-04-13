import { IconHome, IconYoutube, IconHobby, IconGithub, IconSteam } from './icons'

export default function Header({ activePage, drawerOpen, onToggleDrawer, onCloseDrawer, onSwitchPage }) {
  return (
    <>
      <header>
        <button className="header-logo" onClick={() => onSwitchPage('home')}>
          페헤<span>/ Fehe</span>
        </button>
        <button
          className={`hamburger ${drawerOpen ? 'open' : ''}`}
          aria-label="메뉴"
          onClick={onToggleDrawer}
        >
          <span /><span /><span />
        </button>
      </header>

      <div className={`overlay ${drawerOpen ? 'open' : ''}`} onClick={onCloseDrawer} />

      <nav className={`drawer ${drawerOpen ? 'open' : ''}`}>
        <p className="drawer-label">메뉴</p>
        <button
          className={`drawer-btn ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => onSwitchPage('home')}
        >
          <IconHome /> 홈
        </button>
        <button
          className={`drawer-btn ${activePage === 'youtube' ? 'active' : ''}`}
          onClick={() => onSwitchPage('youtube')}
        >
          <IconYoutube /> YouTube 영상
        </button>
        <button
          className={`drawer-btn ${activePage === 'hobby' ? 'active' : ''}`}
          onClick={() => onSwitchPage('hobby')}
        >
          <IconHobby /> 취미
        </button>

        <div className="drawer-divider" />
        <p className="drawer-label">외부 링크</p>

        <a
          className="drawer-btn yt-btn"
          href="https://www.youtube.com/@fehe1234"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCloseDrawer}
        >
          <IconYoutube /> 유튜브 채널
        </a>
        <a
          className="drawer-btn gh-btn"
          href="https://github.com/Fehe1234"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCloseDrawer}
        >
          <IconGithub /> GitHub
        </a>
        <a
          className="drawer-btn"
          href="https://steamcommunity.com/profiles/76561199008770006/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCloseDrawer}
          style={{ color: '#1b6fa8' }}
        >
          <IconSteam /> Steam
        </a>
      </nav>
    </>
  )
}
