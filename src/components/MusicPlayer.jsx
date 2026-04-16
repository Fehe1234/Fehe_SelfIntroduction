import { useState, useEffect, useRef } from 'react'

const VIDEO_ID = '075raB27CW8'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const playerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer()
      return
    }

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)

    window.onYouTubeIframeAPIReady = () => initPlayer()

    return () => {
      window.onYouTubeIframeAPIReady = null
    }
  }, [])

  function initPlayer() {
    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: VIDEO_ID,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
      },
      events: {
        onReady(e) {
          e.target.setVolume(40)
          setReady(true)
          e.target.playVideo()
          setPlaying(true)
        },
        onStateChange(e) {
          setPlaying(e.data === window.YT.PlayerState.PLAYING)
        },
      },
    })
  }

  function toggle() {
    if (!ready || !playerRef.current) return
    if (playing) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.playVideo()
    }
  }

  return (
    <div className="music-player">
      <div ref={containerRef} style={{ display: 'none' }} />
      <button
        className={`music-btn${playing ? ' playing' : ''}`}
        onClick={toggle}
        title={playing ? '음악 끄기' : '음악 켜기'}
      >
        {playing ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
        <span className="music-label">{playing ? 'BGM ON' : 'BGM OFF'}</span>
      </button>
    </div>
  )
}
