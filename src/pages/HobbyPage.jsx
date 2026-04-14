import { useState } from 'react'

const HOBBY_TABS = [
  { key: 'music',  label: '음악' },
  { key: 'rhythm', label: '게임' },
]

function GameCard({ icon, iconStyle, image, name, full, desc, tags }) {
  return (
    <div className="game-card">
      {image
        ? <img src={image} alt={name} style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
        : <div className="game-icon" style={iconStyle}>{icon}</div>
      }
      <div className="game-info">
        <p className="game-name">{name}</p>
        <p className="game-full">{full}</p>
        <p className="game-desc">{desc}</p>
        <div className="game-tags">
          {tags.map(t => <span className="game-tag" key={t}>{t}</span>)}
        </div>
      </div>
    </div>
  )
}

function CollapsibleGroup({ label, count, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="collapsible-group">
      <button className={`collapsible-group-btn${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
        <span className="collapsible-group-accent" />
        <span className="collapsible-group-label">{label}</span>
        {count != null && <span className="collapsible-group-count">{count}</span>}
        <svg
          className={`collapsible-group-chevron${open ? ' open' : ''}`}
          width="15" height="15" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
      {open && <div className="collapsible-group-body">{children}</div>}
    </div>
  )
}

function MusicPanel() {
  return (
    <div className="game-cards">
      <CollapsibleGroup label="동방 프로젝트" count={4}>
        <GameCard
          image="https://lh3.googleusercontent.com/nkVcEQAFBSf7ZqWy-xa6LB2Us60QNTNL74E3iHlu1TBXHW1LUNGWts0jzkpWvSW8PYdmgYG_WeNZJKxDHA=w544-h544-l90-rj"
          name="最終鬼畜妹フランドール・Ｓ"
          full="U.N. Owen Was Her? — 東方紅魔郷"
          desc="ZUN이 제작한 동방 프로젝트의 대표곡으로, 동방홍마향에 등장하는 플랑드르 스칼렛의 테마곡입니다. 강렬하고 광기 넘치는 멜로디로 수많은 어레인지 버전이 탄생한 전설적인 곡입니다."
          tags={['동방 프로젝트', 'ZUN', '동방홍마향']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/FoDhaEo0MbLk_ZMzm5AkMHCz7_OArkPqCYlr2xBHnx_-BYNss9ponHJHl4Lx1ghyJNfCI41t4rt1MDO0UA=w544-h544-l90-rj"
          name="魔理沙は大変なものを盗んでいきました"
          full="恋色マスタースパーク アレンジ — 東方永夜抄"
          desc="IOSYS가 동방영야초의 키리사메 마리사 테마곡 '연색 마스터 스파크'를 원곡으로 제작한 어레인지 곡입니다. 중독성 강한 멜로디와 가사로 동방 팬덤을 대표하는 명곡 중 하나입니다."
          tags={['동방 프로젝트', 'IOSYS', '동방영야초']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/bHhfTAG1RM5ad3DXctqHZZIxsF1ghZoPIuTytJxwzmvRJpA9XyU6PKKl7xzrD5bLdpj4u0drUfy591qq=w544-h544-l90-rj"
          name="ベースラインやってる？笑"
          full="Can I friend you on Bassbook? lol — ハートフェルトファンシー アレンジ — 東方地霊殿"
          desc="IOSYS가 동방지령전의 고메이지 사토리 테마곡 'ハートフェルトファンシー'를 원곡으로 제작한 어레인지 곡입니다. 경쾌한 베이스라인과 독특한 제목으로 많은 사랑을 받는 곡입니다."
          tags={['동방 프로젝트', 'IOSYS', '동방지령전']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/KA_o7yhf4OzGaHj4CN3zd5SncZHi4eTR4SDD_-d4U5DhhB74T3pintSlHx9cVg_X4NxSLUeUpe254Zw=w544-h544-l90-rj"
          name="Ultimate taste"
          full="U.N.オーエンは彼女なのか？ アレンジ — 東方紅魔郷"
          desc="ぱらどっと(Paradot)가 동방홍마향의 플랑드르 스칼렛 테마곡 'U.N. Owen Was Her?'를 원곡으로 제작한 어레인지 곡입니다. Arcaea 등 리듬게임에도 수록되었습니다."
          tags={['동방 프로젝트', 'Paradot', '동방홍마향', 'Arcaea']}
        />
      </CollapsibleGroup>
      <CollapsibleGroup label="보컬로이드" count={3}>
        <GameCard
          image="https://lh3.googleusercontent.com/YSDUjBs7wGeo6Vef4j0SZoHNpWiyLgqERx7JVB4sxEvdPOW6oWNRj3Z3nSiSHrrqd_JOS6LwcnIKeic=w544-h544-l90-rj"
          name="失敗作少女 (MARETU Remix)"
          full="かいりきベア feat. 初音ミク — MARETU Remix"
          desc="かいりきベア가 초음 미쿠를 보컬로 제작한 곡을 MARETU가 리믹스한 버전입니다. 원곡과 리믹스 모두 니코니코 전당입성을 달성한 명곡입니다."
          tags={['보컬로이드', 'かいりきベア', 'MARETU', '初音ミク']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/bFw1V4bmysN7lcKpq6KKTaWSxs7XwaxTSM5cQEDfeqQmWdSaSICrwmoewJvYfl_e6KirgC54kZEVr5Af=w544-h544-l90-rj"
          name="PPPP (feat. Hatsune Miku, Kasane Teto)"
          full="TAK feat. 初音ミク & 重音テト"
          desc="TAK이 제작한 초음 미쿠와 카사네 테토의 듀엣 곡입니다. 유튜브 4000만 뷰를 달성한 인기곡으로, 두 캐릭터의 유쾌한 라이벌 관계를 담은 가사가 특징입니다."
          tags={['보컬로이드', 'TAK', '初音ミク', '重音テト']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/lYY90gjZzj-KcJRg6ecDp3okUJlXuMv4f-fcakUAKuZmxmIWbvVj4QHhl_X-imyEcj1Kk7It_SEozll2=w544-h544-l90-rj"
          name="ワールドイズマイン (かぐや&月見ヤチヨ ver.) [CPK! Remix]"
          full="ryo (supercell) — 超かぐや姫！ 삽입곡"
          desc="ryo(supercell)의 명곡 'World Is Mine'을 Netflix 애니메이션 超かぐや姫！의 삽입곡으로 리믹스한 버전입니다. かぐや(cv.夏吉ゆうこ)와 月見ヤチヨ(cv.早見沙織)가 듀엣으로 노래합니다."
          tags={['보컬로이드', 'ryo (supercell)', '超かぐや姫！', 'Netflix']}
        />
      </CollapsibleGroup>
      <CollapsibleGroup label="리듬게임 수록곡" count={1}>
        <GameCard
          image="https://lh3.googleusercontent.com/E2TJv1LWVKHSkH1aDXWpidNBTBkMOzhd4oNKzDV9u0WLAsgBlCjbmLQHQiAvy_bktvms30WRJzzBGDyi=w544-h544-l90-rj"
          name="竹 (feat. Choko)"
          full="立秋 (Rissyuu) feat. ちょこ"
          desc="立秋가 제작한 오리지널 곡으로, SOUND VOLTEX와 Arcaea 등 다양한 리듬게임에 수록된 곡입니다."
          tags={['立秋', 'Rissyuu', 'SOUND VOLTEX', 'Arcaea']}
        />
      </CollapsibleGroup>
    </div>
  )
}

function RhythmPanel() {
  return (
    <div className="game-cards">
      <p className="sub-label">아케이드</p>
      <GameCard
        icon="SD"
        iconStyle={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
        name="SDVX"
        full="SOUND VOLTEX"
        desc="KONAMI의 아케이드 리듬게임으로, 두 개의 아날로그 노브와 버튼을 조합해 플레이하는 독특한 조작감이 특징입니다."
        tags={['KONAMI', '아날로그 노브']}
      />
      <GameCard
        icon="mai"
        iconStyle={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)' }}
        name="maimai"
        full="maimai DX"
        desc="SEGA의 아케이드 리듬게임으로, 원형 디스플레이 주변의 버튼과 터치 패널을 활용해 플레이합니다."
        tags={['SEGA', '터치 패널']}
      />
      <GameCard
        icon="CHU"
        iconStyle={{ background: 'linear-gradient(135deg,#06b6d4,#3b82f6)' }}
        name="CHUNITHM"
        full="CHUNITHM"
        desc="SEGA의 아케이드 리듬게임으로, 슬라이더와 에어 센서를 활용하는 독창적인 조작 방식이 특징입니다."
        tags={['SEGA', '에어 센서']}
      />

      <p className="sub-label">PC 게임</p>
      <GameCard
        icon="DM"
        iconStyle={{ background: 'linear-gradient(135deg,#0ea5e9,#2563eb)' }}
        name="DJMAX RESPECT V"
        full="DJMAX RESPECT V"
        desc="NEOWIZ의 PC 리듬게임으로, 다양한 키 모드와 방대한 수록곡이 특징입니다. 한국 리듬게임의 대표작 중 하나입니다."
        tags={['NEOWIZ', 'PC', 'Steam']}
      />
      <GameCard
        icon="VR"
        iconStyle={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}
        name="VRChat"
        full="VRChat"
        desc="다양한 유저 제작 월드와 아바타로 소통하는 VR 소셜 플랫폼입니다. 리듬게임 월드를 비롯한 다양한 콘텐츠를 즐길 수 있습니다."
        tags={['VRChat Inc.', 'PC / VR', '소셜']}
      />

      <p className="sub-label">콘솔 게임</p>
      <GameCard
        icon="BS"
        iconStyle={{ background: 'linear-gradient(135deg,#f43f5e,#be123c)' }}
        name="Beat Saber"
        full="Beat Saber"
        desc="Beat Games의 VR 리듬게임으로, 광선검으로 날아오는 블록을 리듬에 맞춰 자르는 직관적인 게임플레이가 특징입니다."
        tags={['Beat Games', 'VR', '콘솔']}
      />
    </div>
  )
}


const PANELS = { music: MusicPanel, rhythm: RhythmPanel }

export default function HobbyPage() {
  const [activeTab, setActiveTab] = useState('music')
  const Panel = PANELS[activeTab]

  return (
    <div className="hobby-page">
      <div className="section-header">
        <div className="section-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        </div>
        <div className="section-title">
          취미
          <small>페헤의 관심사</small>
        </div>
      </div>

      <div className="hobby-tabs">
        {HOBBY_TABS.map(tab => (
          <button
            key={tab.key}
            className={`hobby-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="hobby-panel active">
        <Panel />
      </div>
    </div>
  )
}
