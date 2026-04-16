// 대기실 UI 테스트용 페이지 — /test-gate
export default function TestGatePage() {
  const activeCount = 10
  const MAX = 10
  const queuePos = 3

  return (
    <div className="vg-overlay" style={{ position: 'relative', minHeight: '100vh' }}>
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
        <p style={{ marginTop: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)', opacity: 0.6 }}>* 테스트 페이지입니다</p>
      </div>
    </div>
  )
}
