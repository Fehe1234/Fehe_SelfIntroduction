import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY

async function uploadToImgBB(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json()
  if (!data.success) throw new Error('이미지 업로드 실패')
  return data.data.url
}

export default function DailyWritePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [images, setImages] = useState([])   // { file, preview }[]
  const [saving, setSaving] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    if (sessionStorage.getItem('diary_auth') !== '1') {
      navigate('/diary')
    }
  }, [navigate])

  function handleImages(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return
    const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }))
    setImages(prev => [...prev, ...newImages])
    e.target.value = ''
  }

  function removeImage(idx) {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  async function submit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setSaving(true)
    try {
      // 모든 이미지 병렬 업로드
      const imageUrls = images.length > 0
        ? await Promise.all(images.map(img => uploadToImgBB(img.file)))
        : []

      const now = new Date()
      const date = `${now.getFullYear()}. ${now.getMonth() + 1}. ${now.getDate()}.`
      await addDoc(collection(db, 'diary'), {
        title: title.trim(),
        content: content.trim(),
        date,
        imageUrls,
        likes: {},
        createdAt: serverTimestamp(),
      })
      sessionStorage.removeItem('diary_auth')
      navigate('/diary')
    } catch {
      alert('저장 중 오류가 발생했습니다.')
      setSaving(false)
    }
  }

  return (
    <div className="diary-page">
      <div className="diary-header-row">
        <div>
          <h1 className="diary-page-title">글 쓰기</h1>
          <p className="diary-page-sub">새로운 일기를 작성합니다.</p>
        </div>
        <button
          className="diary-cancel-btn"
          onClick={() => { sessionStorage.removeItem('diary_auth'); navigate('/diary') }}
        >
          취소
        </button>
      </div>

      <form className="diary-form" onSubmit={submit}>
        <div className="diary-form-group">
          <label className="diary-form-label">제목</label>
          <input
            className="diary-form-input"
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={100}
            required
          />
        </div>

        <div className="diary-form-group">
          <label className="diary-form-label">사진 (선택 · 여러 장 가능)</label>
          <div className="diary-img-list">
            {images.map((img, i) => (
              <div key={i} className="diary-img-thumb-wrap">
                {i === 0 && <span className="diary-img-thumb-badge">대표</span>}
                <img src={img.preview} alt="" className="diary-img-thumb" />
                <button type="button" className="diary-img-remove" onClick={() => removeImage(i)}>✕</button>
              </div>
            ))}
            <label className="diary-img-add" htmlFor="diary-img-input">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>추가</span>
              <input
                id="diary-img-input"
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <div className="diary-form-group">
          <label className="diary-form-label">내용</label>
          <textarea
            className="diary-form-textarea"
            placeholder="오늘은 어떤 하루였나요?"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="diary-submit-btn"
          disabled={!title.trim() || !content.trim() || saving}
        >
          {saving ? `업로드 중... (사진 ${images.length}장)` : '저장하기'}
        </button>
      </form>
    </div>
  )
}
