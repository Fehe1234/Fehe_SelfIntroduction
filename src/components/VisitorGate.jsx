import { useEffect, useState, useRef } from 'react'
import { rtdb } from '../firebase'
import {
  ref, get, set, remove, onValue, onDisconnect, runTransaction
} from 'firebase/database'

const MAX = 10

function getSessionId() {
  let id = sessionStorage.getItem('visitor_sid')
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36)
    sessionStorage.setItem('visitor_sid', id)
  }
  return id
}

export default function VisitorGate({ children }) {
  const [status, setStatus] = useState('checking') // checking | allowed | waiting | blocked
  const [activeCount, setActiveCount] = useState(0)
  const [queuePos, setQueuePos] = useState(0)
  const sid = useRef(getSessionId()).current
  const allowedRef = useRef(false)

  useEffect(() => {
    const sessionRef = ref(rtdb, `sessions/${sid}`)
    const sessionsRef = ref(rtdb, 'sessions')
    const myQueueRef = ref(rtdb, `queue/${sid}`)
    const allQueueRef = ref(rtdb, 'queue')

    async function tryEnter() {
      // IP 확인 + 차단 체크
      let myIp = null
      try {
        const res = await fetch('https://api.ipify.org?format=json')
        const data = await res.json()
        myIp = data.ip
      } catch {}

      if (myIp) {
        const blockedKey = myIp.replace(/\./g, '_')
        const blockedSnap = await get(ref(rtdb, `sessions/app/blocked/${blockedKey}`))
        if (blockedSnap.exists()) {
          setStatus('blocked')
          return
        }
      }

      // 트랜잭션으로 동시 접속 경쟁 방지
      let entered = false
      await runTransaction(ref(rtdb, 'sessions'), (sessions) => {
        const count = sessions
          ? Object.keys(sessions).filter(k => k !== 'app').length
          : 0
        if (count >= MAX) return sessions
        entered = true
        return { ...sessions, [sid]: { joinedAt: Date.now(), ip: myIp || '알 수 없음' } }
      })

      if (entered) {
        allowedRef.current = true
        onDisconnect(sessionRef).remove()
        remove(myQueueRef)
        setStatus('allowed')
      } else {
        const qSnap = await get(myQueueRef)
        if (!qSnap.exists()) {
          await set(myQueueRef, { joinedAt: Date.now() })
          onDisconnect(myQueueRef).remove()
        }
        setStatus('waiting')
      }
    }

    tryEnter()

    // 실시간 접속자 수 감지
    const unsubSessions = onValue(sessionsRef, snap => {
      const count = snap.exists()
        ? Object.keys(snap.val()).filter(k => k !== 'app').length
        : 0
      setActiveCount(count)

      // 대기 중이었는데 자리 남으면 재시도
      if (!allowedRef.current && count < MAX) {
        tryEnter()
      }
    })

    // 대기 순서 감지
    const unsubQueue = onValue(allQueueRef, snap => {
      if (!snap.exists()) { setQueuePos(0); return }
      const all = snap.val()
      const mine = all[sid]
      if (!mine) { setQueuePos(0); return }
      const pos = Object.values(all).filter(v => v.joinedAt < mine.joinedAt).length
      setQueuePos(pos)
    })

    return () => {
      unsubSessions()
      unsubQueue()
      if (allowedRef.current) remove(sessionRef)
      else remove(myQueueRef)
    }
  }, [sid])

  if (status === 'checking') {
    return (
      <div className="vg-overlay">
        <div className="vg-box">
          <div className="vg-spinner" />
          <p className="vg-sub">접속 확인 중...</p>
        </div>
      </div>
    )
  }

  if (status === 'waiting') {
    return (
      <div className="vg-overlay">
        <div className="vg-box">
          <div className="vg-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <h1 className="vg-title">대기 중</h1>
          <p className="vg-desc">현재 접속자가 가득 찼습니다.<br/>자리가 나면 자동으로 입장됩니다.</p>

          <div className="vg-stats">
            <div className="vg-stat">
              <span className="vg-stat-num">{queuePos}</span>
              <span className="vg-stat-label">내 앞 대기자</span>
            </div>
            <div className="vg-divider" />
            <div className="vg-stat">
              <span className="vg-stat-num">{activeCount}<span className="vg-stat-max">/{MAX}</span></span>
              <span className="vg-stat-label">현재 접속자</span>
            </div>
          </div>

          <div className="vg-bar-wrap">
            <div className="vg-bar-fill" style={{ width: `${(activeCount / MAX) * 100}%` }} />
          </div>
          <p className="vg-hint">창을 닫지 마세요. 자동으로 입장됩니다.</p>
        </div>
      </div>
    )
  }

  if (status === 'blocked') {
    return (
      <div className="vg-overlay">
        <div className="vg-box">
          <div className="vg-icon" style={{ color: '#f85149' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
            </svg>
          </div>
          <h1 className="vg-title">접근 차단됨</h1>
          <p className="vg-desc">이 IP 주소는 관리자에 의해 차단되었습니다.</p>
        </div>
      </div>
    )
  }

  return children
}
