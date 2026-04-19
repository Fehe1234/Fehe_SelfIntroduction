import { IconGithub, IconYoutube, IconSteam, IconDiscord } from '../components/icons'

const TIMELINE = [
  {
    year: '2014',
    heading: '인터넷 활동 시작',
    body: '페헤라는 이름으로 인터넷 활동을 시작했습니다. 이때부터 온라인 커뮤니티와 콘텐츠 제작에 관심을 갖게 되었습니다.',
  },
  {
    year: '2020',
    heading: '디스코드 서버 활동 본격화',
    body: '본격적인 디스코드 서버 활동을 시작하며 커뮤니티를 확장했습니다. 다양한 사람들과 교류하며 개발자이자 인플루언서로서의 역량을 키워나갔습니다.',
  },
  {
    year: '2022 — 무기한',
    heading: '디스코드 서버 매니저 & 관리자',
    body: '다수의 크리에이터 디스코드 서버를 운영·관리하며 커뮤니티 빌딩 경험을 쌓아왔습니다.',
    managed: [
      { name: '약 10만 구독자 유튜버', desc: '서버 매니저', note: '자진 활동 종료 · 비공개', active: false },
      { name: '시류', desc: '병맛·개그 크리에이터 서버 관리자', note: '비활동으로 관리 종료', active: false },
      { name: '단풍나무', desc: '오버워치 크리에이터 서버 관리자', note: '비활동으로 관리 종료', active: false },
      { name: '대타맨', desc: '게임 스토리 크리에이터 서버 관리자', note: '현재 관리 중', active: true },
    ],
  },
  {
    year: '2024. 03. 04',
    heading: '전문대학교 입학',
    body: '컴퓨터공학과에 진학하여 본격적으로 소프트웨어 개발을 공부하기 시작했습니다.',
    projects: [
      { name: 'CarScope', role: '팀장으로 개발에 임함', period: '2025년 2학기' },
      { name: 'WatchMan', role: '프론트 개발자로 임함', period: '2026년 1학기' },
    ],
  },
  {
    year: '2025 — 2027',
    heading: '키오스크 회사 국가근로장학생',
    body: '결제 단말기 및 키오스크 솔루션 전문 기업에서 IT 운영 지원 업무를 담당하고 있습니다.',
    duties: [
      { label: '원격 지원', desc: '씨트롤 · K-Remote 활용, 현장 장애 대응 및 기술 지원' },
      { label: '기기 관리', desc: '크라이저 활용, 키오스크 설정 · 유지보수 보조' },
      { label: 'VAN 결제', desc: 'VAN사 연동 결제 시스템 운영 · 설정 · 장애 처리' },
      { label: '문서 작업', desc: '엑셀을 활용한 데이터 정리 및 업무 문서 작성' },
      { label: '블로그 관리', desc: '네이버 블로그 콘텐츠 작성 및 게시물 관리' },
    ],
  },
  {
    year: '2024. 05. 16 — 무기한',
    heading: 'Hello! VRChat World! 디스코드 서버 운영',
    body: 'VRChat 비공식 친목 서버 Hello! VRChat World!를 개설하여 현재까지 운영 중입니다. VRChat 유저들이 편하게 모여 교류할 수 있는 커뮤니티를 만들어가고 있습니다.',
    discord: true,
  },
]

const SKILLS = [
  {
    label: '언어',
    items: ['Python', 'JavaScript', 'TypeScript', 'PHP', 'JSP', 'HTML / CSS', 'Flutter', 'React', 'C#', 'C++', 'Java'],
    cls: 'lang',
  },
  {
    label: 'DB',
    items: ['MySQL', 'Firebase'],
    cls: 'db',
  },
  {
    label: '서버',
    items: ['Node.js', 'Linux (Kali)', 'Linux (Ubuntu)'],
    cls: 'server',
  },
  {
    label: '디자인',
    items: [{ name: 'Photoshop (기본)', style: { background: 'rgba(49,103,211,0.1)', color: '#1a56c4', borderColor: 'rgba(49,103,211,0.35)' } }],
    cls: 'custom',
  },
  {
    label: '하드웨어',
    items: [
      { name: '라즈베리파이', style: { background: 'rgba(220,38,38,0.1)', color: '#b91c1c', borderColor: 'rgba(220,38,38,0.3)' } },
      { name: '아두이노',     style: { background: 'rgba(220,38,38,0.1)', color: '#b91c1c', borderColor: 'rgba(220,38,38,0.3)' } },
    ],
    cls: 'custom',
  },
  {
    label: 'IDE / 에디터',
    items: [
      { name: 'Visual Studio Code', style: { background: 'rgba(0,122,204,0.1)', color: '#007acc', borderColor: 'rgba(0,122,204,0.35)' } },
      { name: 'Visual Studio',      style: { background: 'rgba(0,122,204,0.1)', color: '#007acc', borderColor: 'rgba(0,122,204,0.35)' } },
      { name: 'Eclipse',            style: { background: 'rgba(0,122,204,0.1)', color: '#007acc', borderColor: 'rgba(0,122,204,0.35)' } },
      { name: 'Python IDLE',        style: { background: 'rgba(0,122,204,0.1)', color: '#007acc', borderColor: 'rgba(0,122,204,0.35)' } },
      { name: 'Arduino IDE',        style: { background: 'rgba(0,122,204,0.1)', color: '#007acc', borderColor: 'rgba(0,122,204,0.35)' } },
    ],
    cls: 'custom',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bubble">
          <img
            className="hero-avatar"
            src="/profile1.png"
            alt="페헤 프로필"
          />
          <p className="hero-label">Hello! I&apos;m</p>
          <h1 className="hero-name">페헤</h1>
          <p className="hero-sub">Developer &nbsp;·&nbsp; Creator &nbsp;·&nbsp; Community Builder</p>
          <div className="hero-badges">
            <span className="badge">개발자</span>
            <span className="badge">인플루언서</span>
            <span className="badge">커뮤니티</span>
          </div>
          <div className="hero-links">
            <a className="hero-link gh" href="https://github.com/Fehe1234" target="_blank" rel="noopener noreferrer">
              <IconGithub /> GitHub
            </a>
            <a className="hero-link yt" href="https://www.youtube.com/@fehe1234" target="_blank" rel="noopener noreferrer">
              <IconYoutube /> YouTube
            </a>
            <a className="hero-link steam" href="https://steamcommunity.com/profiles/76561199008770006/" target="_blank" rel="noopener noreferrer">
              <IconSteam /> Steam
            </a>
          </div>
        </div>

        <div className="scroll-hint">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <polyline points="19 12 12 19 5 12"/>
          </svg>
          scroll
        </div>
      </section>

      {/* ── Timeline ── */}
      <main className="section">
        <div className="section-header">
          <div className="section-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="8" y1="2" x2="8" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="2" y1="8" x2="14" y2="8" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="section-title">
            History
            <small>페헤의 활동 기록</small>
          </div>
        </div>

        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div className="timeline-card" key={i}>
              <div className="card-top">
                <span className="timeline-year">{item.year}</span>
              </div>
              <h2 className="timeline-heading">{item.heading}</h2>
              {item.body && <p className="timeline-body">{item.body}</p>}
              {item.extra && <div className="timeline-body">{item.extra}</div>}
              {item.managed && item.managed.map((m, mi) => (
                <p key={mi} className="timeline-body" style={{ marginTop: mi === 0 ? '0.6rem' : '0.3rem', paddingTop: mi === 0 ? '0.6rem' : 0, borderTop: mi === 0 ? '1px solid var(--border)' : 'none', fontSize: '0.82rem' }}>
                  <strong style={{ color: m.active ? 'var(--sky-deep)' : 'var(--text-muted)' }}>{m.name}</strong>
                  {' '}&mdash; {m.desc}{' '}
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({m.note})</span>
                </p>
              ))}
              {item.duties && item.duties.map((d, di) => (
                <p key={di} className="timeline-body" style={{ marginTop: di === 0 ? '0.6rem' : '0.3rem', paddingTop: di === 0 ? '0.6rem' : 0, borderTop: di === 0 ? '1px solid var(--border)' : 'none', fontSize: '0.82rem' }}>
                  <strong style={{ color: 'var(--sky-deep)' }}>{d.label}</strong>
                  &nbsp; {d.desc}
                </p>
              ))}
              {item.projects && item.projects.map((proj, pi) => (
                <p key={pi} className="timeline-body" style={{ marginTop: pi === 0 ? '0.6rem' : '0.3rem', paddingTop: pi === 0 ? '0.6rem' : 0, borderTop: pi === 0 ? '1px solid var(--border)' : 'none', fontSize: '0.82rem' }}>
                  <strong style={{ color: 'var(--sky-deep)' }}>프로젝트</strong>
                  &nbsp; {proj.name} — {proj.role}{' '}
                  <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({proj.period})</span>
                </p>
              ))}
              {item.discord && (
                <a className="timeline-link" href="https://discord.gg/6K2CT7fUZA" target="_blank" rel="noopener noreferrer">
                  <IconDiscord /> Discord 서버 참가
                </a>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* ── Skills ── */}
      <section className="skills-section">
        <div className="section-header" style={{ marginBottom: '1.5rem' }}>
          <div className="section-icon" style={{ background: 'linear-gradient(135deg,#60a5fa,#3b82f6)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/>
              <polyline points="8 6 2 12 8 18"/>
            </svg>
          </div>
          <div className="section-title">
            기술 스택
            <small>사용 가능한 언어 및 도구</small>
          </div>
        </div>

        {SKILLS.map((cat, i) => (
          <div className="skill-card" key={i}>
            <p className="skill-cat-label">{cat.label}</p>
            <div className="skill-badges">
              {cat.items.map((item, j) =>
                typeof item === 'string'
                  ? <span className={`skill-badge ${cat.cls}`} key={j}>{item}</span>
                  : <span className="skill-badge" key={j} style={item.style}>{item.name}</span>
              )}
            </div>
          </div>
        ))}

        <div className="skill-card cert-card">
          <p className="skill-cat-label">자격증</p>
          <div className="skill-badges">
            <span className="cert-empty">취득한 자격증이 없습니다.</span>
          </div>
        </div>
      </section>
    </>
  )
}
