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

export default function DiaryWritePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef()

  useEffect(() => {
    if (sessionStorage.getItem('diary_auth') !== '1') {
      navigate('/diary')
    }
  }, [navigate])

  function handleImage(e) {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  function removeImage() {
    setImage(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function submit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setSaving(true)
    try {
      let imageUrl = null
      if (image) {
        imageUrl = await uploadToImgBB(image)
      }

      const now = new Date()
      const date = `${now.getFullYear()}. ${now.getMonth() + 1}. ${now.getDate()}.`
      await addDoc(collection(db, 'diary'), {
        title: title.trim(),
        content: content.trim(),
        date,
        imageUrl,
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
          <label className="diary-form-label">사진 (선택)</label>
          {preview ? (
            <div className="diary-img-preview-wrap">
              <img src={preview} alt="미리보기" className="diary-img-preview" />
              <button type="button" className="diary-img-remove" onClick={removeImage}>✕</button>
            </div>
          ) : (
            <label className="diary-img-upload" htmlFor="diary-img-input">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
              <span>사진 추가</span>
              <input
                id="diary-img-input"
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                style={{ display: 'none' }}
              />
            </label>
          )}
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
          {saving ? '저장 중...' : '저장하기'}
        </button>
      </form>
    </div>
  )
}
