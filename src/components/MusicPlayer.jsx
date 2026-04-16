import { useState, useEffect, useRef, useCallback } from 'react'

const VIDEO_ID = '075raB27CW8'
const SONG_TITLE = 'ray (超かぐや姫！ Version)'
const SONG_ARTIST = 'Ray'

function fmt(sec) {
  if (!sec || isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const timerRef = useRef(null)

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const p = playerRef.current
      if (!p) return
      setCurrent(p.getCurrentTime?.() ?? 0)
      setDuration(p.getDuration?.() ?? 0)
    }, 500)
  }, [])

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
      clearInterval(timerRef.current)
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
          e.target.mute()
          e.target.playVideo()
          setTimeout(() => {
            e.target.unMute()
            e.target.setVolume(40)
          }, 100)
          setReady(true)
          setPlaying(true)
          startTimer()
        },
        onStateChange(e) {
          const isPlaying = e.data === window.YT.PlayerState.PLAYING
          setPlaying(isPlaying)
          if (isPlaying) startTimer()
          else clearInterval(timerRef.current)
        },
      },
    })
  }

  function toggle() {
    if (!ready || !playerRef.current) return
    if (playing) playerRef.current.pauseVideo()
    else playerRef.current.playVideo()
  }

  function seek(e) {
    if (!ready || !playerRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    playerRef.current.seekTo(ratio * duration, true)
  }

  const progress = duration > 0 ? (current / duration) * 100 : 0

  return (
    <div className="music-player">
      <div ref={containerRef} style={{ display: 'none' }} />
      <div className="music-card">
        {/* 음표 아이콘 + 곡 정보 */}
        <div className="music-info">
          <div className={`music-note-icon${playing ? ' spin' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 18V5l12-2v13M9 18c0 1.657-1.343 3-3 3S3 19.657 3 18s1.343-3 3-3 3 1.343 3 3zm12-2c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"/>
            </svg>
          </div>
          <div className="music-text">
            <span className="music-title">{SONG_TITLE}</span>
            <span className="music-artist">{SONG_ARTIST}</span>
          </div>
        </div>

        {/* 재생바 */}
        <div className="music-progress-wrap" onClick={seek}>
          <div className="music-progress-bg">
            <div className="music-progress-fill" style={{ width: `${progress}%` }} />
            <div className="music-progress-thumb" style={{ left: `${progress}%` }} />
          </div>
          <div className="music-time">
            <span>{fmt(current)}</span>
            <span>{fmt(duration)}</span>
          </div>
        </div>

        {/* 재생/정지 버튼 */}
        <button
          className={`music-toggle${playing ? ' playing' : ''}`}
          onClick={toggle}
          title={playing ? '일시정지' : '재생'}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1.5"/>
              <rect x="14" y="4" width="4" height="16" rx="1.5"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
