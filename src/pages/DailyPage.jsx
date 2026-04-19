import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, diaryAuth } from '../firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { collection, getDocs, deleteDoc, doc, orderBy, query, updateDoc, deleteField } from 'firebase/firestore'
import '../styles/daily.css'

function formatDateTime(ts) {
  if (!ts) return ''
  const d = ts.toDate ? ts.toDate() : new Date(ts)
  return d.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

function LikeBtn({ postId, likes, myIp, onToggle, small }) {
  const encodedIp = myIp ? myIp.replace(/\./g, '_') : null
  const liked = encodedIp && likes ? !!likes[encodedIp] : false
  const count = likes ? Object.keys(likes).length : 0
  return (
    <button
      className={`diary-like-btn${liked ? ' liked' : ''}${small ? ' small' : ''}`}
      onClick={e => { e.stopPropagation(); onToggle(postId, encodedIp, liked) }}
      disabled={!myIp}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
      {count > 0 && <span>{count}</span>}
    </button>
  )
}

const DIARY_EMAIL = 'diary@fehe.app'

async function verifyDiaryPassword(pw) {
  try {
    await signInWithEmailAndPassword(diaryAuth, DIARY_EMAIL, pw)
    await signOut(diaryAuth)
    return true
  } catch {
    return false
  }
}

/* ── 비밀번호 모달 ── */
function PasswordModal({ onClose, onSuccess }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    const ok = await verifyDiaryPassword(input)
    if (ok) {
      onSuccess()
    } else {
      setError(true)
      setInput('')
      setLoading(false)
    }
  }

  return (
    <div className="diary-modal-overlay" onClick={onClose}>
      <div className="diary-modal" onClick={e => e.stopPropagation()}>
        <p className="diary-modal-title">비밀번호 입력</p>
        <p className="diary-modal-sub">관리자만 삭제할 수 있습니다.</p>
        <form onSubmit={submit}>
          <input
            className={`diary-modal-input${error ? ' error' : ''}`}
            type="password"
            placeholder="비밀번호"
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            autoFocus
          />
          {error && <p className="diary-modal-error">비밀번호가 틀렸습니다.</p>}
          <div className="diary-modal-btns">
            <button type="button" className="diary-modal-cancel" onClick={onClose} disabled={loading}>취소</button>
            <button type="submit" className="diary-modal-confirm" disabled={loading}>
              {loading ? '확인 중...' : '확인'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── 이미지 캐러셀 ── */
function ImageCarousel({ images }) {
  const [idx, setIdx] = useState(0)
  const touchStartX = useRef(null)

  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(images.length - 1, i + 1))

  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (dx < -40) next()
    else if (dx > 40) prev()
    touchStartX.current = null
  }

  return (
    <div className="diary-carousel" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="diary-carousel-track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((url, i) => (
          <img key={i} src={url} alt="" className="diary-carousel-img" />
        ))}
      </div>

      {images.length > 1 && (
        <>
          {idx > 0 && (
            <button className="diary-carousel-arrow left" onClick={e => { e.stopPropagation(); prev() }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          )}
          {idx < images.length - 1 && (
            <button className="diary-carousel-arrow right" onClick={e => { e.stopPropagation(); next() }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}
          <div className="diary-carousel-dots">
            {images.map((_, i) => (
              <span key={i} className={`diary-carousel-dot${i === idx ? ' active' : ''}`} onClick={e => { e.stopPropagation(); setIdx(i) }} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ── 인스타그램 스타일 상세 모달 ── */
function DetailModal({ post, myIp, onClose, onDelete, onLikeToggle }) {
  const [showDeletePw, setShowDeletePw] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const images = post.imageUrls?.length > 0 ? post.imageUrls : post.imageUrl ? [post.imageUrl] : []
  const hasImages = images.length > 0

  async function handleDeleteConfirm() {
    setDeleting(true)
    setShowDeletePw(false)
    await onDelete(post.id)
  }

  return (
    <div className="diary-ig-overlay" onClick={onClose}>
      <div className={`diary-ig-modal${hasImages ? '' : ' no-img'}`} onClick={e => e.stopPropagation()}>
        <button className="diary-ig-close" onClick={onClose}>✕</button>

        {/* 왼쪽: 이미지 캐러셀 */}
        {hasImages && (
          <div className="diary-ig-left">
            <ImageCarousel images={images} />
          </div>
        )}

        {/* 오른쪽: 내용 */}
        <div className="diary-ig-right">
          <div className="diary-ig-header">
            <div>
              <h2 className="diary-ig-title">{post.title}</h2>
              <p className="diary-ig-date">{formatDateTime(post.createdAt)}</p>
            </div>
          </div>

          <p className="diary-ig-content">{post.content}</p>

          <div className="diary-ig-footer">
            <LikeBtn postId={post.id} likes={post.likes} myIp={myIp} onToggle={onLikeToggle} />
            <button className="diary-delete-btn" onClick={() => setShowDeletePw(true)} disabled={deleting}>
              {deleting ? '삭제 중...' : '삭제'}
            </button>
          </div>
        </div>

        {showDeletePw && (
          <PasswordModal
            onClose={() => setShowDeletePw(false)}
            onSuccess={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  )
}

/* ── 메인 ── */
export default function DailyPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showWriteModal, setShowWriteModal] = useState(false)
  const [selected, setSelected] = useState(null)
  const [myIp, setMyIp] = useState(null)

  useEffect(() => {
    fetchPosts()
    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(d => setMyIp(d.ip))
      .catch(() => {})
  }, [])

  async function fetchPosts() {
    setLoading(true)
    try {
      const q = query(collection(db, 'diary'), orderBy('createdAt', 'desc'))
      const snap = await getDocs(q)
      setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    } catch {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }

  function handleWriteClick() {
    setShowWriteModal(true)
  }

  function handleAuthSuccess() {
    sessionStorage.setItem('diary_auth', '1')
    navigate('/diary/write')
  }

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, 'diary', id))
      setPosts(prev => prev.filter(p => p.id !== id))
      setSelected(null)
    } catch {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  async function handleLikeToggle(postId, encodedIp, currentlyLiked) {
    if (!encodedIp) return
    try {
      const postRef = doc(db, 'diary', postId)
      if (currentlyLiked) {
        await updateDoc(postRef, { [`likes.${encodedIp}`]: deleteField() })
        setPosts(prev => prev.map(p => {
          if (p.id !== postId) return p
          const likes = { ...(p.likes || {}) }
          delete likes[encodedIp]
          return { ...p, likes }
        }))
      } else {
        await updateDoc(postRef, { [`likes.${encodedIp}`]: true })
        setPosts(prev => prev.map(p =>
          p.id !== postId ? p : { ...p, likes: { ...(p.likes || {}), [encodedIp]: true } }
        ))
      }
      // 열린 모달도 업데이트
      if (selected?.id === postId) {
        setSelected(prev => {
          if (!prev) return prev
          const likes = { ...(prev.likes || {}) }
          if (currentlyLiked) delete likes[encodedIp]
          else likes[encodedIp] = true
          return { ...prev, likes }
        })
      }
    } catch {
      alert('오류가 발생했습니다.')
    }
  }

  const selectedPost = selected ? posts.find(p => p.id === selected) ?? selected : null

  return (
    <div className="diary-page">
      {showWriteModal && (
        <PasswordModal
          onClose={() => setShowWriteModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {selectedPost && (
        <DetailModal
          post={selectedPost}
          myIp={myIp}
          onClose={() => setSelected(null)}
          onDelete={handleDelete}
          onLikeToggle={handleLikeToggle}
        />
      )}

      <div className="diary-header-row">
        <div>
          <h1 className="diary-page-title">소소한 일상</h1>
          <p className="diary-page-sub">페헤의 소소한 기록들</p>
        </div>
        <button className="diary-write-btn" onClick={handleWriteClick}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          글 쓰기
        </button>
      </div>

      {loading ? (
        <div className="diary-empty"><p>불러오는 중...</p></div>
      ) : posts.length === 0 ? (
        <div className="diary-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          <p>아직 작성된 일상이 없습니다.</p>
        </div>
      ) : (
        <div className="diary-grid">
          {posts.map(post => (
            <div key={post.id} className="diary-grid-card" onClick={() => setSelected(post.id)}>
              {/* 썸네일 (첫 번째 사진) */}
              <div className="diary-grid-thumb">
                {(post.imageUrls?.[0] || post.imageUrl)
                  ? <img src={post.imageUrls?.[0] || post.imageUrl} alt={post.title} className="diary-grid-img" />
                  : <div className="diary-grid-noimg" />
                }
              </div>
              {/* 내용 */}
              <div className="diary-grid-info">
                <p className="diary-grid-title">{post.title}</p>
                <p className="diary-grid-datetime">{formatDateTime(post.createdAt)}</p>
                <p className="diary-grid-excerpt">{post.content}</p>
                <div className="diary-grid-footer">
                  <LikeBtn postId={post.id} likes={post.likes} myIp={myIp} onToggle={handleLikeToggle} small />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
