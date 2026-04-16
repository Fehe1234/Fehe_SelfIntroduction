import { useState, useEffect, useRef } from 'react'

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

/* ── 메인 컴포넌트 ── */
export default function EasterEgg() {
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
  const inputRef = useRef(null)
  const bottomRef = useRef(null)

  /* 백틱으로 열기/닫기 */
  useEffect(() => {
    function onKey(e) {
      if (e.key === '`') { e.preventDefault(); setOpen(o => !o) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* 열릴 때 포커스 */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
  }, [open])

  /* 항상 맨 아래로 스크롤 */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  function addLines(newLines) {
    setLines(prev => [...prev, ...newLines])
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
          { type: 'info', text: '│  secret    힌트가 있을지도...             │' },
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
          { type: 'accent', text: '이 터미널을 발견한 당신, 꽤 눈썰미가 있군요. 👀' },
        )
        break

      case 'vr':
        out.push(
          { type: 'output', text: 'VRChat에 접속하는 중...' },
          { type: 'output', text: '▓▓▓▓▓▓▓▓░░░░░░░░  Loading world...' },
          { type: 'output', text: 'World: Hello! VRChat World! ✔' },
          { type: 'output', text: 'Spawning avatar... ✔' },
          { type: 'output', text: '' },
          { type: 'accent', text: '...사실 이건 그냥 터미널입니다.' },
          { type: 'output', text: '진짜 VRChat은 취미 → 게임 탭에서 확인하세요.' },
        )
        break

      case 'ls':
        out.push(
          { type: 'output', text: 'total 4' },
          { type: 'output', text: 'drwxr-xr-x  /           →  홈' },
          { type: 'output', text: 'drwxr-xr-x  /youtube    →  YouTube 영상' },
          { type: 'output', text: 'drwxr-xr-x  /hobby      →  취미' },
          { type: 'output', text: 'drwxr-xr-x  /diary      →  일기' },
          { type: 'output', text: '-rw-------  /.secret    →  ???' },
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
        out.push(
          { type: 'output', text: '...찾았군요.' },
          { type: 'output', text: '' },
          { type: 'accent', text: '여기까지 왔다면, 더 깊이 들어갈 용기도 있겠죠.' },
          { type: 'output', text: '' },
          { type: 'info',   text: '  $ cd /secret' },
          { type: 'output', text: '' },
          { type: 'output', text: '무엇을 발견하게 될지는... 직접 확인하세요.' },
        )
        break

      case 'cd /secret':
      case 'cd/secret':
        out.push({ type: 'accent', text: '접속 중...' })
        setTimeout(() => {
          setOpen(false)
          window.location.href = '/secret'
        }, 800)
        break

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
      setOpen(false)
    } else if (e.key === '`') {
      e.preventDefault()
      setOpen(false)
    }
  }

  return (
    <>
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}

      {!open && (
        <div className="ee-hint" title="숨겨진 터미널 열기">
          <kbd>`</kbd>
        </div>
      )}

      {open && (
        <div className="ee-backdrop" onClick={() => setOpen(false)}>
          <div className="ee-terminal" onClick={e => e.stopPropagation()}>

            {/* 타이틀바 */}
            <div className="ee-titlebar">
              <div className="ee-dots">
                <span className="ee-dot red" onClick={() => setOpen(false)} title="닫기" />
                <span className="ee-dot yellow" />
                <span className="ee-dot green" />
              </div>
              <span className="ee-title">fehe@terminal — zsh</span>
              <span style={{ width: 52 }} />
            </div>

            {/* 출력 영역 */}
            <div className="ee-body" onClick={() => inputRef.current?.focus()}>
              {lines.map((line, i) => (
                <div key={i} className={`ee-line ee-line-${line.type}`}>
                  {line.text || '\u00A0'}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* 입력 */}
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

          </div>
        </div>
      )}
    </>
  )
}
