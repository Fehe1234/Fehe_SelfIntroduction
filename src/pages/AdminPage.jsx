import { useState, useEffect } from 'react'
import { db, rtdb } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { ref, set, remove, onValue } from 'firebase/database'
import '../styles/admin.css'

async function fetchPW() {
  const snap = await getDoc(doc(db, 'config', 'admin'))
  return snap.exists() ? snap.data().pw : null
}

function encodeIp(ip) { return ip.replace(/\./g, '_') }
function decodeIp(key) { return key.replace(/_/g, '.') }

function formatTime(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
}

/* ── 비밀번호 모달 ── */
function PasswordModal({ onSuccess }) {
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
    <div className="admin-auth">
      <div className="admin-auth-box">
        <p className="admin-auth-title">관리자 인증</p>
        <p className="admin-auth-sub">비밀번호를 입력하세요.</p>
        <form onSubmit={submit}>
          <input
            className={`admin-auth-input${error ? ' error' : ''}`}
            type="password"
            placeholder="비밀번호"
            value={input}
            autoFocus
            onChange={e => { setInput(e.target.value); setError(false) }}
          />
          {error && <p className="admin-auth-error">비밀번호가 틀렸습니다.</p>}
          <button type="submit" className="admin-auth-btn">확인</button>
        </form>
      </div>
    </div>
  )
}

/* ── 메인 컴포넌트 ── */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [sessions, setSessions] = useState({})
  const [blocked, setBlocked] = useState({})
  const [banInput, setBanInput] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!authed) return

    const sessRef = ref(rtdb, 'sessions')
    const unsub = onValue(sessRef, snap => {
      const val = snap.val() || {}
      // app 키 제외
      const { app: _, ...rest } = val
      setSessions(rest)
      // blocked 목록은 sessions/app/blocked 안에 있음
      const blockedData = val?.app?.blocked || {}
      setBlocked(blockedData)
    })

    return () => unsub()
  }, [authed])

  async function kickSession(sid) {
    await remove(ref(rtdb, `sessions/${sid}`))
    setMsg(`세션 ${sid.slice(0, 8)}... 강제 퇴장 완료`)
    setTimeout(() => setMsg(''), 3000)
  }

  async function banIp(ip) {
    if (!ip || ip === '알 수 없음') return
    const key = encodeIp(ip)
    await set(ref(rtdb, `sessions/app/blocked/${key}`), {
      ip,
      bannedAt: Date.now(),
    })
    setMsg(`${ip} 차단 완료`)
    setTimeout(() => setMsg(''), 3000)
  }

  async function banAndKick(sid, ip) {
    await banIp(ip)
    await kickSession(sid)
  }

  async function unbanIp(key) {
    const ip = decodeIp(key)
    await remove(ref(rtdb, `sessions/app/blocked/${key}`))
    setMsg(`${ip} 차단 해제 완료`)
    setTimeout(() => setMsg(''), 3000)
  }

  async function manualBan(e) {
    e.preventDefault()
    const ip = banInput.trim()
    if (!ip) return
    await banIp(ip)
    setBanInput('')
  }

  if (!authed) return <PasswordModal onSuccess={() => setAuthed(true)} />

  const sessionList = Object.entries(sessions)
  const blockedList = Object.entries(blocked)

  return (
    <div className="admin-page">
      <div className="admin-container">

        <div className="admin-header">
          <h1 className="admin-title">관리 페이지</h1>
          {msg && <div className="admin-msg">{msg}</div>}
        </div>

        {/* 현재 접속자 */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">현재 접속자</h2>
            <span className="admin-badge">{sessionList.length}명</span>
          </div>

          {sessionList.length === 0 ? (
            <p className="admin-empty">현재 접속자가 없습니다.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>세션 ID</th>
                    <th>IP 주소</th>
                    <th>접속 시각</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {sessionList.map(([sid, data]) => (
                    <tr key={sid}>
                      <td className="admin-sid">{sid.slice(0, 10)}…</td>
                      <td className="admin-ip">{data.ip || '알 수 없음'}</td>
                      <td className="admin-time">{formatTime(data.joinedAt)}</td>
                      <td className="admin-actions">
                        <button
                          className="admin-btn admin-btn--kick"
                          onClick={() => kickSession(sid)}
                        >강제 퇴장</button>
                        <button
                          className="admin-btn admin-btn--ban"
                          onClick={() => banAndKick(sid, data.ip)}
                          disabled={!data.ip || data.ip === '알 수 없음'}
                        >IP 차단</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 차단된 IP */}
        <section className="admin-section">
          <div className="admin-section-header">
            <h2 className="admin-section-title">차단된 IP</h2>
            <span className="admin-badge admin-badge--red">{blockedList.length}개</span>
          </div>

          {/* 수동 IP 차단 */}
          <form className="admin-ban-form" onSubmit={manualBan}>
            <input
              className="admin-ban-input"
              placeholder="IP 직접 입력 (예: 123.45.67.89)"
              value={banInput}
              onChange={e => setBanInput(e.target.value)}
            />
            <button type="submit" className="admin-btn admin-btn--ban">차단</button>
          </form>

          {blockedList.length === 0 ? (
            <p className="admin-empty">차단된 IP가 없습니다.</p>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>IP 주소</th>
                    <th>차단 시각</th>
                    <th>액션</th>
                  </tr>
                </thead>
                <tbody>
                  {blockedList.map(([key, data]) => (
                    <tr key={key}>
                      <td className="admin-ip">{data.ip || decodeIp(key)}</td>
                      <td className="admin-time">{formatTime(data.bannedAt)}</td>
                      <td className="admin-actions">
                        <button
                          className="admin-btn admin-btn--unban"
                          onClick={() => unbanIp(key)}
                        >차단 해제</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
