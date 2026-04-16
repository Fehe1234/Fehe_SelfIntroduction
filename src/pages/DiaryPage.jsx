import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db, rtdb } from '../firebase'
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { ref, get } from 'firebase/database'

async function fetchPW() {
  const snap = await get(ref(rtdb, 'app/pw'))
  console.log('fetchPW result:', snap.val())
  return snap.val()
}

function PasswordModal({ onClose, onSuccess }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const pw = await fetchPW()
    if (input === pw) {
      onSuccess()
    } else {
      setError(true)
      setInput('')
    }
  }

  return (
    <div className="diary-modal-overlay" onClick={onClose}>
      <div className="diary-modal" onClick={e => e.stopPropagation()}>
        <p className="diary-modal-title">비밀번호 입력</p>
        <p className="diary-modal-sub">관리자만 사용할 수 있습니다.</p>
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
            <button type="button" className="diary-modal-cancel" onClick={onClose}>취소</button>
            <button type="submit" className="diary-modal-confirm">확인</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeleteWithAuth({ postId, onDelete }) {
  const [showModal, setShowModal] = useState(false)

  function handleSuccess() {
    setShowModal(false)
    onDelete(postId)
  }

  return (
    <>
      {showModal && (
        <PasswordModal
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
      <button className="diary-delete-btn" onClick={() => setShowModal(true)}>
        삭제
      </button>
    </>
  )
}

export default function DiaryPage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetchPosts()
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
    setShowModal(true)
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
    } catch (e) {
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="diary-page">
      {showModal && (
        <PasswordModal
          onClose={() => setShowModal(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      <div className="diary-header-row">
        <div>
          <h1 className="diary-page-title">일기</h1>
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
        <div className="diary-empty">
          <p>불러오는 중...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="diary-empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
          </svg>
          <p>아직 작성된 일기가 없습니다.</p>
        </div>
      ) : (
        <div className="diary-list">
          {posts.map(post => (
            <div
              key={post.id}
              className={`diary-card${selected === post.id ? ' expanded' : ''}`}
              onClick={() => setSelected(selected === post.id ? null : post.id)}
            >
              <div className="diary-card-top">
                <div>
                  <p className="diary-card-title">{post.title}</p>
                  <p className="diary-card-date">{post.date}</p>
                </div>
                <svg
                  className="diary-chevron"
                  style={{ transform: selected === post.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.25s', color: 'var(--text-muted)', flexShrink: 0 }}
                  width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>
              {selected === post.id && (
                <div className="diary-card-body">
                  <p className="diary-card-content">{post.content}</p>
                  <div className="diary-card-footer" onClick={e => e.stopPropagation()}>
                    <DeleteWithAuth postId={post.id} onDelete={handleDelete} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
