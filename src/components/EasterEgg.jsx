import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/* ── 매트릭스 비 이펙트 ── */
function MatrixRain({ onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const fontSize = 14
    const cols = Math.floor(canvas.width / fontSize)
    const drops = Array(cols).fill(1)
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノFEHEフェヘ0123456789ABCDEF'

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#6bbde0'
      ctx.font = `${fontSize}px monospace`

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, y * fontSize)
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }, 40)

    const timer = setTimeout(() => {
      clearInterval(interval)
      onDone()
    }, 4500)

    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [onDone])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9998, pointerEvents: 'none' }}
    />
  )
}

/* ── VR 비주얼 노벨 대화 트리 ── */
const VR_STORY = {
  intro: {
    speaker: '???',
    text: '...처음 보는 분이시네요. 이 카페에 자주 오세요?',
    choices: [
      { label: '아, 네. 자주 와요.', next: 'a1' },
      { label: '처음이에요.', next: 'b1' },
      { label: '(말없이 주위를 둘러본다)', next: 'c1' },
    ],
  },

  // 경로 A
  a1: { speaker: '???', text: '그렇군요. 저는 매일 오는데 한 번도 못 봤네요.', next: 'a2' },
  a2: {
    speaker: '???',
    text: '...혹시 다른 시간대에 오시는 건가요?',
    choices: [
      { label: '네, 주로 밤에 와요.', next: 'merge' },
      { label: '아, 사실 오늘 처음이에요.', next: 'a3' },
    ],
  },
  a3: { speaker: '???', text: '어머. 거짓말을 하셨군요.', next: 'a4' },
  a4: { speaker: '???', text: '...귀엽네요.', next: 'merge' },

  // 경로 B
  b1: { speaker: '???', text: '처음이시구나. 잘 오셨어요.', next: 'b2' },
  b2: {
    speaker: '???',
    text: '여기 분위기, 마음에 드세요?',
    choices: [
      { label: '네, 좋은 것 같아요.', next: 'b3a' },
      { label: '아직 잘 모르겠어요.', next: 'b3b' },
    ],
  },
  b3a: { speaker: '???', text: '그죠? 저는 현실이 답답할 때 여기 와요.', next: 'merge' },
  b3b: { speaker: '???', text: '괜찮아요. 여기는 그냥 있어도 되는 곳이에요.', next: 'merge' },

  // 경로 C
  c1: { speaker: '???', text: '...', next: 'c2' },
  c2: { speaker: '???', text: '말이 없는 분이시네요. 그것도 좋아요.', next: 'c3' },
  c3: { speaker: '???', text: '여긴 조용한 사람이 어울리는 곳이거든요.', next: 'merge' },

  // 합류
  merge: { speaker: '???', text: '이상하게 들릴 수도 있는데...', next: 'merge2' },
  merge2: {
    speaker: '???',
    text: '여기 오면 현실이 조금 멀어지는 것 같아서 좋아요.',
    choices: [
      { label: '저도요.', next: 'end_a' },
      { label: '현실에서 도망치는 건가요?', next: 'end_b' },
      { label: '(아무 말도 하지 않는다)', next: 'end_c' },
    ],
  },

  // 엔딩 분기
  end_a:  { speaker: '???', text: '...그렇군요.', next: 'end_wave' },
  end_b:  { speaker: '???', text: '도망이라기보다... 숨 고르기, 라고 하면 될까요.', next: 'end_wave' },
  end_c:  { speaker: '???', text: '...', next: 'end_c2' },
  end_c2: { speaker: '???', text: '(아바타가 조용히 고개를 끄덕인다)', action: true, next: 'end_wave' },

  end_wave: { speaker: '???', text: '(아바타가 손을 흔든다)', action: true, next: 'end_final' },
  end_final: { speaker: '???', text: '또 봐요.', next: null },
}

/* ── VR 비주얼 노벨 컴포넌트 ── */
function VRNovel({ onEnd }) {
  const [key, setKey] = useState('intro')
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  const node = VR_STORY[key]

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const text = node.text
    const speed = text === '...' ? 200 : 28
    const timer = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(timer); setDone(true) }
    }, speed)
    return () => clearInterval(timer)
  }, [key])

  function skip() {
    if (!done) { setDisplayed(node.text); setDone(true) }
  }

  function advance() {
    if (!done) { skip(); return }
    if (node.next) setKey(node.next)
    else onEnd()
  }

  function choose(next) { setKey(next) }

  return (
    <div className="vr-novel" onClick={(!done || (!node.choices && node.next !== null)) ? advance : undefined}>
      {/* 위쪽 장소 표시 */}
      <div className="vr-novel-location">📍 어느 조용한 카페</div>

      {/* 하단 대화창 */}
      <div className="vr-novel-box" onClick={e => e.stopPropagation()}>
        <div className="vr-novel-name">{node.speaker}</div>
        <p className={`vr-novel-text${node.action ? ' action' : ''}`}>
          {displayed}
          {!done && <span className="vr-cursor">▌</span>}
        </p>

        {done && node.choices && (
          <div className="vr-choices">
            {node.choices.map((c, i) => (
              <button key={i} className="vr-choice" onClick={() => choose(c.next)}>
                {c.label}
              </button>
            ))}
          </div>
        )}

        {done && !node.choices && node.next !== null && (
          <div className="vr-advance" onClick={advance}>▼</div>
        )}

        {done && node.next === null && (
          <div className="vr-choices">
            <button className="vr-choice vr-end" onClick={onEnd}>[ 접속 종료 ]</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── 시크릿 접근 모달 ── */
function SecretModal({ onClose, onSuccess }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const answer = input.trim()
    if (answer === '어느 조용한 카페') {
      onSuccess()
    } else {
      setError(true)
      setShake(true)
      setInput('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div className="ee-secret-overlay" onClick={onClose}>
      <div
        className={`ee-secret-modal${shake ? ' shake' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <p className="ee-secret-label">[ ACCESS CODE REQUIRED ]</p>
        <p className="ee-secret-question">페헤가 매일 찾아가는 그 세계의 이름은?</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={`ee-secret-input${error ? ' error' : ''}`}
            value={input}
            onChange={e => { setInput(e.target.value); setError(false) }}
            placeholder="_ _ _ _ _ _ _ _ _ _"
            spellCheck={false}
            autoComplete="off"
          />
          {error && <p className="ee-secret-error">접근이 거부되었습니다.</p>}
          <div className="ee-secret-btns">
            <button type="button" className="ee-secret-cancel" onClick={onClose}>취소</button>
            <button type="submit" className="ee-secret-confirm">접속</button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── 메인 컴포넌트 ── */
export default function EasterEgg() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [lines, setLines] = useState([
    { type: 'system', text: '페헤 터미널 v1.0.0  ·  백틱(`) 또는 ESC로 닫기' },
    { type: 'system', text: '"help" 를 입력하면 명령어 목록을 볼 수 있습니다.' },
    { type: 'system', text: '' },
  ])
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [matrix, setMatrix] = useState(false)
  const [secretModal, setSecretModal] = useState(false)
  const [vrNovel, setVrNovel] = useState(false)
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === '`') { e.preventDefault(); setOpen(o => !o) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  function addLines(newLines) {
    setLines(prev => [...prev, ...newLines])
  }

  function handleSecretSuccess() {
    setSecretModal(false)
    addLines([{ type: 'accent', text: '접속 중...' }])
    setTimeout(() => {
      setOpen(false)
      sessionStorage.setItem('secret_auth', '1')
      navigate('/secret')
    }, 800)
  }

  function processCommand(raw) {
    const cmd = raw.trim().toLowerCase()

    setCmdHistory(h => [raw, ...h])
    setHistIdx(-1)

    const out = []
    out.push({ type: 'input', text: `fehe@site ~ % ${raw}` })

    switch (cmd) {
      case 'help':
        out.push(
          { type: 'info', text: '┌─ 사용 가능한 명령어 ─────────────────────┐' },
          { type: 'info', text: '│  help      명령어 목록                    │' },
          { type: 'info', text: '│  whoami    이게 누구 터미널이죠?           │' },
          { type: 'info', text: '│  fehe      페헤에 대해                    │' },
          { type: 'info', text: '│  vr        VRChat 이야기                  │' },
          { type: 'info', text: '│  ls        페이지 목록                    │' },
          { type: 'info', text: '│  music     현재 재생 중인 곡              │' },
          { type: 'info', text: '│  date      현재 시각                      │' },
          { type: 'info', text: '│  ping      연결 테스트                    │' },
          { type: 'info', text: '│  matrix    ???                            │' },
          { type: 'info', text: '│  clear     화면 지우기                    │' },
          { type: 'info', text: '│  exit      터미널 닫기                    │' },
          { type: 'info', text: '└───────────────────────────────────────────┘' },
        )
        break

      case 'whoami':
        out.push(
          { type: 'output', text: '페헤 (Fehe)' },
          { type: 'output', text: '개발자 · 인플루언서 · 커뮤니티 빌더' },
          { type: 'output', text: 'uid=1234(fehe) gid=1234(fehe) groups=developer,creator' },
        )
        break

      case 'fehe':
        out.push(
          { type: 'output', text: '안녕하세요! 저는 페헤입니다.' },
          { type: 'output', text: '2014년부터 인터넷 활동을 해온 개발자입니다.' },
          { type: 'output', text: '' },
          { type: 'output', text: '현실이 답답할 때, 그 사람이 매일 찾아가는 세계가 있다.' },
        )
        break

      case 'vr': {
        out.length = 0
        const steps = [
          [0,    [{ type: 'input',  text: `fehe@site ~ % ${raw}` },
                  { type: 'output', text: '[SYS] VRChat 클라이언트 초기화 중...' }]],
          [400,  [{ type: 'accent', text: '[OK]  Steam 연결됨' },
                  { type: 'accent', text: '[OK]  헤드셋 감지: Meta Quest 2  ↔  USB 3.0' },
                  { type: 'accent', text: '[OK]  컨트롤러 페어링: L ✔  R ✔' }]],
          [900,  [{ type: 'error',  text: '[!!]  경고: 현실 감각이 일시적으로 차단됩니다.' },
                  { type: 'output', text: '' },
                  { type: 'output', text: '      월드 불러오는 중...' },
                  { type: 'progress', duration: 2.8 }]],
          [3900, [{ type: 'accent', text: '[OK]  로드 완료  ✔' },
                  { type: 'output', text: '' },
                  { type: 'output', text: '      월드: 어느 조용한 카페  ·  5 / 10명  ·  ping 9ms' },
                  { type: 'output', text: '' },
                  { type: 'output', text: '      아바타 스폰 중...' }]],
          [4600, [{ type: 'accent', text: '[OK]  페헤 v4.2 로드됨  (물리 연산: ON)' },
                  { type: 'output', text: '' },
                  { type: 'info',   text: '      ── 입 장 완 료 ──' },
                  { type: 'output', text: '' }]],
          [5300, [{ type: 'output', text: '      > 누군가 손을 흔들며 인사한다.' }]],
        ]
        steps.forEach(([delay, ls]) => setTimeout(() => addLines(ls), delay))
        setTimeout(() => setVrNovel(true), 6400)
        addLines(out)
        return
      }

      case 'ls':
        out.push(
          { type: 'output', text: 'total 4' },
          { type: 'output', text: 'drwxr-xr-x  /           →  홈' },
          { type: 'output', text: 'drwxr-xr-x  /youtube    →  YouTube 영상' },
          { type: 'output', text: 'drwxr-xr-x  /hobby      →  취미' },
          { type: 'output', text: 'drwxr-xr-x  /diary      →  일기' },
        )
        break

      case 'music':
        out.push(
          { type: 'output', text: '♪ Now Playing ──────────────────' },
          { type: 'accent', text: '  ray (超かぐや姫！ Version) — Ray' },
          { type: 'output', text: '  우하단 플레이어에서 볼륨 조절 가능' },
        )
        break

      case 'date':
        out.push({ type: 'output', text: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }) + ' (KST)' })
        break

      case 'ping':
        out.push(
          { type: 'output', text: 'PING fehe-self-introduction.vercel.app' },
          { type: 'accent', text: `64 bytes: icmp_seq=1 ttl=64 time=${Math.floor(Math.random() * 20 + 1)}ms` },
          { type: 'accent', text: `64 bytes: icmp_seq=2 ttl=64 time=${Math.floor(Math.random() * 20 + 1)}ms` },
          { type: 'output', text: '--- ping statistics ---' },
          { type: 'output', text: '2 packets transmitted, 2 received, 0% packet loss' },
        )
        break

      case 'matrix':
        out.push({ type: 'accent', text: '빨간 약을 먹으시겠습니까? (y/n) ... y' })
        out.push({ type: 'output', text: '현실에 오신 것을 환영합니다.' })
        setMatrix(true)
        break

      case 'secret':
        addLines(out)
        setSecretModal(true)
        return

      case 'sudo rm -rf /':
      case 'sudo rm -rf':
      case 'rm -rf /':
        out.push(
          { type: 'error', text: 'rm: /: Operation not permitted' },
          { type: 'error', text: '이 사이트는 파괴되지 않습니다. 😤' },
        )
        break

      case 'clear':
        setLines([
          { type: 'system', text: '페헤 터미널 v1.0.0' },
          { type: 'system', text: '' },
        ])
        return

      case 'exit':
      case 'close':
      case 'quit':
        setOpen(false)
        return

      case '':
        setLines(prev => [...prev, { type: 'input', text: 'fehe@site ~ %' }])
        return

      default:
        out.push({ type: 'error', text: `zsh: command not found: ${raw}` })
        out.push({ type: 'error', text: `'help'를 입력해 명령어 목록을 확인하세요.` })
    }

    addLines(out)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistIdx(i => {
        const next = Math.min(i + 1, cmdHistory.length - 1)
        setInput(cmdHistory[next] ?? '')
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistIdx(i => {
        const next = Math.max(i - 1, -1)
        setInput(next === -1 ? '' : (cmdHistory[next] ?? ''))
        return next
      })
    } else if (e.key === 'Escape') {
      if (vrNovel) { setVrNovel(false); return }
      if (secretModal) { setSecretModal(false); return }
      setOpen(false)
    } else if (e.key === '`') {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <>
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}

      {open && (
        <div className="ee-backdrop" onClick={() => setOpen(false)}>
          <div className="ee-terminal" onClick={e => e.stopPropagation()}>

            <div className="ee-titlebar">
              <div className="ee-dots">
                <span className="ee-dot red" onClick={() => setOpen(false)} title="닫기" />
                <span className="ee-dot yellow" />
                <span className="ee-dot green" />
              </div>
              <span className="ee-title">fehe@terminal — zsh</span>
              <span style={{ width: 52 }} />
            </div>

            <div className="ee-body" onClick={() => inputRef.current?.focus()}>
              {lines.map((line, i) => (
                line.type === 'progress' ? (
                  <div key={i} className="ee-progress-wrap">
                    <div className="ee-progress-fill" style={{ animationDuration: `${line.duration}s` }} />
                  </div>
                ) : (
                  <div key={i} className={`ee-line ee-line-${line.type}`}>
                    {line.text || '\u00A0'}
                  </div>
                )
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="ee-input-row">
              <span className="ee-prompt">fehe@site ~ %</span>
              <input
                ref={inputRef}
                className="ee-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
              />
            </div>

            {vrNovel && (
              <VRNovel onEnd={() => {
                setVrNovel(false)
                addLines([
                  { type: 'output', text: '' },
                  { type: 'output', text: '      > 접속이 종료됩니다.' },
                  { type: 'output', text: '' },
                ])
              }} />
            )}

            {secretModal && (
              <SecretModal
                onClose={() => setSecretModal(false)}
                onSuccess={handleSecretSuccess}
              />
            )}

          </div>
        </div>
      )}
    </>
  )
}
