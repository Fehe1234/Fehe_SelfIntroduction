import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function DiaryWritePage() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('diary_auth') !== '1') {
      navigate('/diary')
    }
  }, [navigate])

  async function submit(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    setSaving(true)
    try {
      const now = new Date()
      const date = `${now.getFullYear()}. ${now.getMonth() + 1}. ${now.getDate()}.`
      await addDoc(collection(db, 'diary'), {
        title: title.trim(),
        content: content.trim(),
        date,
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
