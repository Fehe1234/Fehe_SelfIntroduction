import { useState, useEffect } from 'react'
import { IconYoutube } from '../components/icons'

const CHANNEL_ID = 'UCY0LBUJ0a7JCBkkQ_ux0kew'
const API_KEY    = 'AIzaSyAP2PyUsp5VYuj9KUMExwYw3YcceIegaII'
const BASE       = 'https://www.googleapis.com/youtube/v3/search'

function YtCard({ item }) {
  const videoId = item.id.videoId
  const thumb   = item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url
  const date    = new Date(item.snippet.publishedAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
  return (
    <a className="yt-card" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
      <img className="yt-thumb" src={thumb} alt={item.snippet.title} loading="lazy" />
      <div className="yt-info">
        <p className="yt-title">{item.snippet.title}</p>
        <p className="yt-date">{date}</p>
      </div>
    </a>
  )
}

export default function YoutubePage() {
  const [ytTab, setYtTab]         = useState('home')
  const [homeItems, setHomeItems] = useState([])
  const [liveItems, setLiveItems] = useState([])
  const [status, setStatus]       = useState('loading')
  const [error, setError]         = useState('')

  useEffect(() => {
    loadYoutube()
  }, [])

  async function loadYoutube() {
    setStatus('loading')
    try {
      const params = `channelId=${CHANNEL_ID}&type=video&order=date&maxResults=12&key=${API_KEY}`
      const [allRes, liveRes] = await Promise.all([
        fetch(`${BASE}?part=snippet&${params}`),
        fetch(`${BASE}?part=snippet&eventType=completed&${params}`),
      ])
      const [allData, liveData] = await Promise.all([allRes.json(), liveRes.json()])

      if (allData.error)  throw new Error(allData.error.message)
      if (liveData.error) throw new Error(liveData.error.message)

      const liveIds   = new Set((liveData.items || []).map(i => i.id.videoId))
      setHomeItems((allData.items || []).filter(i => !liveIds.has(i.id.videoId)))
      setLiveItems(liveData.items || [])
      setStatus('ok')
    } catch (e) {
      console.error('[YT]', e)
      setError(e.message)
      setStatus('error')
    }
  }

  return (
    <div className="yt-page">
      <div className="section-header">
        <div className="section-icon" style={{ background: 'linear-gradient(135deg,#f87171,#e05050)' }}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
            <path d="M15.665 1.878A2.01 2.01 0 0 0 14.252.457C13.01.1 8 .1 8 .1S2.99.1 1.748.457A2.01 2.01 0 0 0 .335 1.878C0 3.126 0 5.728 0 5.728s0 2.602.335 3.85a2.01 2.01 0 0 0 1.413 1.421C2.99 11.356 8 11.356 8 11.356s5.01 0 6.252-.357a2.01 2.01 0 0 0 1.413-1.421C16 8.33 16 5.728 16 5.728s0-2.602-.335-3.85zM6.364 8.21V3.245L10.545 5.728 6.364 8.21z" fill="white"/>
          </svg>
        </div>
        <div className="section-title">
          YouTube
          <small>페헤의 채널</small>
        </div>
      </div>

      <div className="yt-tabs">
        {['home', 'live'].map(tab => (
          <button
            key={tab}
            className={`yt-tab ${ytTab === tab ? 'active' : ''}`}
            onClick={() => setYtTab(tab)}
          >
            {tab === 'home' ? '홈' : '라이브'}
          </button>
        ))}
      </div>

      {/* 홈 패널 */}
      <div className={`yt-panel ${ytTab === 'home' ? 'active' : ''}`}>
        <div className="yt-grid">
          {status === 'loading' && <p className="yt-status">영상 불러오는 중...</p>}
          {status === 'error'   && (
            <p className="yt-status">
              영상을 불러올 수 없습니다.{' '}
              <a href="https://www.youtube.com/@fehe1234" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sky-deep)' }}>
                채널에서 확인하세요.
              </a>
            </p>
          )}
          {status === 'ok' && homeItems.length === 0 && <p className="yt-status">업로드된 영상이 없습니다.</p>}
          {status === 'ok' && homeItems.map(item => <YtCard key={item.id.videoId} item={item} />)}
        </div>
        <a className="yt-more" href="https://www.youtube.com/@fehe1234/videos" target="_blank" rel="noopener noreferrer">
          <IconYoutube /> 전체 영상 보기
        </a>
      </div>

      {/* 라이브 패널 */}
      <div className={`yt-panel ${ytTab === 'live' ? 'active' : ''}`}>
        <div className="yt-grid">
          {status === 'loading' && <p className="yt-status">영상 불러오는 중...</p>}
          {status === 'error'   && (
            <p className="yt-status">
              영상을 불러올 수 없습니다.{' '}
              <a href="https://www.youtube.com/@fehe1234" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sky-deep)' }}>
                채널에서 확인하세요.
              </a>
            </p>
          )}
          {status === 'ok' && liveItems.length === 0 && <p className="yt-status">라이브 영상이 없습니다.</p>}
          {status === 'ok' && liveItems.map(item => <YtCard key={item.id.videoId} item={item} />)}
        </div>
        <a className="yt-more" href="https://www.youtube.com/@fehe1234/streams" target="_blank" rel="noopener noreferrer">
          <IconYoutube /> 라이브 전체 보기
        </a>
      </div>
    </div>
  )
}
