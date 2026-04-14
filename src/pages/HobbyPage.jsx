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

function CollapsibleGroup({ label, count, nested, children }) {
  const [open, setOpen] = useState(false)
  const n = nested ? ' nested' : ''
  return (
    <div className={`collapsible-group${nested ? ' nested' : ''}`}>
      <button className={`collapsible-group-btn${n}${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
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
      {open && <div className={`collapsible-group-body${nested ? ' nested' : ''}`}>{children}</div>}
    </div>
  )
}

function MusicPanel() {
  return (
    <div className="game-cards">
      <CollapsibleGroup label="동방 프로젝트" count={6}>
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
        <GameCard
          image="https://lh3.googleusercontent.com/kPrHv2vpwhp3oS0xywItx9FWsi_weVy4ZhM5q0rsUu2-BoZ5cxnAhuHQV7eDkzG6ZApys83zhjgSIX0=w544-h544-l90-rj"
          name="Bad Apple!! feat.nomico"
          full="Alstroemeria Records — Bad Apple!! アレンジ — 東方妙有夢"
          desc="Alstroemeria Records가 동방묘유몽의 'Bad Apple!!'을 원곡으로 nomico의 보컬을 얹어 제작한 어레인지 곡입니다. 흑백 실루엣 MV로 전 세계적으로 유명해진 동방 어레인지의 전설적인 명곡입니다."
          tags={['동방 프로젝트', 'Alstroemeria Records', 'nomico', '동방묘유몽']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/8ECujnPWR2ch4nC-uN-8gNQR6A7C-eYbQcPvPpmTGbvlMjfeMs_-xEVX_tbASbcLD450SnaPgmN3IampZw=w544-h544-l90-rj"
          name="ナイト・オブ・ナイツ"
          full="cool&create (ビートまりお) — 月時計～ルナ・ダイアル アレンジ — 東方紅魔郷"
          desc="cool&create의 ビートまりお가 동방홍마향의 이자요이 사쿠야 테마곡 '월시계～루나 다이얼'을 원곡으로 제작한 어레인지 곡입니다. 동방 어레인지를 대표하는 전설적인 명곡 중 하나입니다."
          tags={['동방 프로젝트', 'cool&create', 'ビートまりお', '동방홍마향']}
        />
      </CollapsibleGroup>
      <CollapsibleGroup label="보컬로이드" count={4}>
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
          image="https://i.ytimg.com/vi/DEBIiKV8L_s/hq720.jpg?sqp=-oaymwEXCNUGEOADIAQqCwjVARCqCBh4INgESFo&rs=AMzJL3nmFZ6LtESichMcx47X0RgLDQ0fSA"
          name="抜錨 (Cover)"
          full="ナナホシ管弦楽団 feat. 巡音ルカ 원곡 — SERRA Cover"
          desc="ナナホシ管弦楽団이 巡音ルカを보컬로 제작한 보컬로이드 곡을 SERRA가 커버한 버전입니다. 독특한 기타 솔로와 서정적인 가사가 특징인 곡으로 유튜브 100만 뷰를 달성한 인기곡입니다."
          tags={['보컬로이드', 'ナナホシ管弦楽団', '巡音ルカ', 'SERRA']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/vp1M4sPY4qAKebggZtSMVYyFq1YI6ANUG0ktBgZMgRJd7WFG1C6apLtFyYWNPWOiJNGOudt_xqNo4rNY=w544-h544-l90-rj"
          name="ループザルーム (feat. Hatsune Miku)"
          full="ルシノ (rusino) feat. 初音ミク"
          desc="ルシノ(rusino)가 제작한 보컬로이드 곡으로, 백룸과 리미널 스페이스를 테마로 한 곡입니다. 빌보드 재팬 차트 미국 1위를 달성하며 국제적으로 큰 화제를 모았습니다."
          tags={['보컬로이드', 'ルシノ', 'rusino', '初音ミク']}
        />
      </CollapsibleGroup>
      <CollapsibleGroup label="리듬게임 수록곡" count={6}>
        <GameCard
          image="https://lh3.googleusercontent.com/E2TJv1LWVKHSkH1aDXWpidNBTBkMOzhd4oNKzDV9u0WLAsgBlCjbmLQHQiAvy_bktvms30WRJzzBGDyi=w544-h544-l90-rj"
          name="竹 (feat. Choko)"
          full="立秋 (Rissyuu) feat. ちょこ"
          desc="立秋가 제작한 오리지널 곡으로, SOUND VOLTEX와 Arcaea 등 다양한 리듬게임에 수록된 곡입니다."
          tags={['立秋', 'Rissyuu', 'SOUND VOLTEX', 'Arcaea']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/oInw8XQxQ5zShP_A0WnA9pDGeBoVq0dB5WgzM62wmikCv_wBcOni3hsHXHAHq54twt1FelYrOSdIKG5m=w544-h544-l90-rj"
          name="Brain Power"
          full="NOMA — SOUND VOLTEX 수록"
          desc="NOMA가 제작한 J-Core 곡으로 SOUND VOLTEX에 수록되어 큰 인기를 얻었습니다. Cytus, Rotaeno 등 다양한 리듬게임에도 이식된 곡으로, 인터넷 밈으로도 널리 알려진 명곡입니다."
          tags={['NOMA', 'SOUND VOLTEX', 'J-Core', 'Cytus']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/Damg11FsGi3Bugbvsh46iRxA6ewM9JDY4G6zoe7laOzCr1MzZnN-o3PCbF8AOeTv733-eaLgY44ac5TG=w544-h544-l90-rj"
          name="Freedom Dive↓"
          full="xi — BMS 원곡"
          desc="xi가 BMS 콘테스트를 위해 제작한 오리지널 곡으로, osu!와 SOUND VOLTEX 등 수많은 리듬게임에 이식된 전설적인 초고난도 곡입니다."
          tags={['xi', 'BMS', 'osu!', 'SOUND VOLTEX']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/pWi4f8rB0xt88SEWsMMzizcoDZOlyoPG9tMSlyKGRHvtOG15g1ZN9IMeqBu1IDWfHx9073rA0x84LfeU=w544-h544-l90-rj"
          name="Oshama Scramble! (uncut edition)"
          full="t+pazolite — maimai ORANGE PLUS 원곡"
          desc="t+pazolite가 제작한 곡으로 maimai를 시작으로 Arcaea, CHUNITHM 등 다양한 리듬게임에 이식된 인기곡입니다. SEGA 도쿄 조이폴리스 어트랙션에서 처음 선보인 곡입니다."
          tags={['t+pazolite', 'maimai', 'Arcaea', 'CHUNITHM']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/pWi4f8rB0xt88SEWsMMzizcoDZOlyoPG9tMSlyKGRHvtOG15g1ZN9IMeqBu1IDWfHx9073rA0x84LfeU=w544-h544-l90-rj"
          name="Garakuta Doll Play (uncut edition)"
          full="t+pazolite — maimai GreeN 원곡"
          desc="t+pazolite가 제작한 멜로딕 개버 곡으로 maimai GreeN에 수록된 것을 시작으로 CHUNITHM, Groove Coaster 등 다양한 리듬게임에 이식된 명곡입니다."
          tags={['t+pazolite', 'maimai', 'CHUNITHM', 'Groove Coaster']}
        />
        <GameCard
          image="https://i.namu.wiki/i/ozhHL13HYAitmd6CYKZk66YESzgn-o8LZMmPFxYefnjFU1lS1TrrAHFT4l33t4BXXzAY0VKN95jw9nMEXU0seZXOrIo_eYcBf-RssVKCAS95oDTtCVg1rwBw0nHzrmJdgaYEBfD_20YBPmPfi-ppSw.webp"
          name="666"
          full="RoughSketch — SOUND VOLTEX"
          desc="RoughSketch가 제작한 SOUND VOLTEX 수록곡입니다. 강렬한 하드코어 사운드와 고난도 패턴으로 리듬게임 유저들에게 잘 알려진 곡입니다."
          tags={['RoughSketch', 'SOUND VOLTEX', 'SDVX']}
        />
      </CollapsibleGroup>
      <CollapsibleGroup label="DJMAX" count={9}>
        <GameCard
          image="https://lh3.googleusercontent.com/4AL25VSiv__SDFNleL0U59TcC8Q-b5KoyIazIsja-J6a1J9kbz3JCi3jdN-k3QOVpTSmhvDp4wkcXKw=w544-h544-l90-rj"
          name="glory day (Extended ver.)"
          full="Prod. BEXTER X Mycin.T — DJMAX"
          desc="BEXTER와 Mycin.T가 제작한 DJMAX 시리즈의 수록곡입니다. DEEMO, Cytus 등 다양한 리듬게임에도 이식된 인기곡입니다."
          tags={['DJMAX', 'BEXTER', 'Mycin.T', 'DEEMO', 'Cytus']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/1VOEK9eGXKL1vRqf4oFMQHIC0ofGCSl1EUgabyuebokDg1UfUmKZuUBKAeCbbxo_K1ZBjMCvlbAQ91Rj=w544-h544-l90-rj"
          name="glory MAX -나의 최대치로 너와 함께할게-"
          full="TAK — DJMAX RESPECT V"
          desc="TAK이 제작한 DJMAX RESPECT V의 V EXTENSION 시리즈 테마곡입니다. glory day의 보컬 DyoN Joo가 3년 만에 다시 참여했으며, 원제 'glory MAX'에 BEXTER가 제안한 부제가 합쳐져 최종 제목이 완성되었습니다."
          tags={['DJMAX', 'TAK', 'V EXTENSION']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/Ak15D_jWaO2DBfYxQGcRiTZXQ5yi-J6pWeJDPvf2mH0q7c28O5TcM2GgP6o8a2Z3XnJByfpTfYkIHSU1Yw=w544-h544-l90-rj"
          name="Rhythm In My Head"
          full="KATOMORI — DJMAX RESPECT V V LIBERTY DLC"
          desc="KATOMORI가 제작한 DJMAX RESPECT V V LIBERTY DLC 수록곡입니다. 빠른 템포와 강렬한 전자음이 특징으로, 후반부의 신시사이저 하이라이트가 인상적인 고난도 리듬게임 곡입니다."
          tags={['DJMAX', 'KATOMORI', 'V LIBERTY']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/Tizk95WT1rlFdsRPdFtMCenQTCJYGzVOcP3Q0urYFQluzuVdai742HcnIf-QI7LGgh6E_ZgBD9FZ8f28=w544-h544-l90-rj"
          name="Kakera"
          full="CLTH — DJMAX RESPECT V V LIBERTY II DLC"
          desc="CLTH이 제작한 DJMAX RESPECT V V LIBERTY II DLC 수록곡입니다."
          tags={['DJMAX', 'CLTH', 'V LIBERTY II']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/ov18Qe1aPI1RC9y9dZHz5ZBJcXCM5BuyKdbYZMIVHNZLmyqIFzkr3EtJLOCaDaWc-j-KovnegvuBg4Cf4A=w544-h544-l90-rj"
          name="Mad (feat. WAMI)"
          full="ESAI feat. WaMi — DJMAX RESPECT V V LIBERTY II DLC"
          desc="ESAI가 제작하고 WaMi가 보컬을 맡은 DJMAX RESPECT V V LIBERTY II DLC 수록곡입니다."
          tags={['DJMAX', 'ESAI', 'WaMi', 'V LIBERTY II']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/US0PZAgS6JRmilirNakfOJEw1He7swjdop4fgFdySgAXr4nLWu4JnP9JridO0dkkLYxnV2FtvyeGDYBYbw=w544-h544-l90-rj"
          name="AURORA"
          full="DJMAX RESPECT V 수록곡"
          desc="DJMAX RESPECT V 2주년 기념으로 추가된 수록곡입니다."
          tags={['DJMAX']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/Ak15D_jWaO2DBfYxQGcRiTZXQ5yi-J6pWeJDPvf2mH0q7c28O5TcM2GgP6o8a2Z3XnJByfpTfYkIHSU1Yw=w544-h544-l90-rj"
          name="Final Hour (Game Ver.)"
          full="Pure 100% feat. Chloe — DJMAX RESPECT V V LIBERTY DLC"
          desc="Pure 100%가 제작하고 Chloe가 보컬을 맡은 DJMAX RESPECT V의 V LIBERTY DLC 6번째 타이틀 테마곡입니다. 오리지널 버전에 없는 파트가 포함된 게임 전용 버전입니다."
          tags={['DJMAX', 'Pure 100%', 'Chloe', 'V LIBERTY']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/ov18Qe1aPI1RC9y9dZHz5ZBJcXCM5BuyKdbYZMIVHNZLmyqIFzkr3EtJLOCaDaWc-j-KovnegvuBg4Cf4A=w544-h544-l90-rj"
          name="TOXIC (Extended Ver.) (feat. Shabel Tonya)"
          full="INFX & MIIM feat. Shabel Tonya — DJMAX RESPECT V V LIBERTY II DLC"
          desc="INFX & MIIM이 제작하고 버튜버 Shabel Tonya가 보컬을 맡은 DJMAX RESPECT V V LIBERTY II DLC 수록곡입니다."
          tags={['DJMAX', 'INFX', 'MIIM', 'Shabel Tonya', 'V LIBERTY II']}
        />
        <GameCard
          image="https://lh3.googleusercontent.com/OY5kGq4pdUR89oq1UNSk5g00wK0ym2pUoMBjsLz3XLFuvib37Q9CFgK4T30Re8IZZ8pcHP6lRPABHXG9=w544-h544-l90-rj"
          name="Shining Light (feat. Shabel Tonya)"
          full="DJMAX RESPECT V V EXTENSION 5 DLC"
          desc="버튜버 Shabel Tonya가 보컬로 참여한 DJMAX RESPECT V V EXTENSION 5 DLC 수록곡입니다."
          tags={['DJMAX', 'Shabel Tonya', 'V EXTENSION 5']}
        />
      </CollapsibleGroup>
      <CollapsibleGroup label="애니메이션" count={2}>
        <CollapsibleGroup nested label="超かぐや姫！" count={5}>
          <GameCard
            image="https://lh3.googleusercontent.com/lYY90gjZzj-KcJRg6ecDp3okUJlXuMv4f-fcakUAKuZmxmIWbvVj4QHhl_X-imyEcj1Kk7It_SEozll2=w544-h544-l90-rj"
            name="星降る海 - Starry Sea"
            full="超かぐや姫！ 오리지널 삽입곡"
            desc="Netflix 애니메이션 超かぐや姫！의 오리지널 삽입곡입니다."
            tags={['超かぐや姫！', 'Netflix']}
          />
          <GameCard
            image="https://lh3.googleusercontent.com/lYY90gjZzj-KcJRg6ecDp3okUJlXuMv4f-fcakUAKuZmxmIWbvVj4QHhl_X-imyEcj1Kk7It_SEozll2=w544-h544-l90-rj"
            name="ray (超かぐや姫！ Version)"
            full="TAKU INOUE — Kalafina 원곡 (魔法少女まどか☆マギカ OP) 커버"
            desc="마법소녀 마도카 마기카의 오프닝 테마 'ray'를 TAKU INOUE가 편곡하여 超かぐや姫！ 버전으로 재탄생시킨 곡입니다. かぐや(cv.夏吉ゆうこ)와 月見ヤチヨ(cv.早見沙織)가 노래합니다."
            tags={['超かぐや姫！', 'TAKU INOUE', 'Kalafina', '마도카 마기카']}
          />
          <GameCard
            image="https://lh3.googleusercontent.com/H2hyZlbMuwfHye6UoON1M0aIFeCGeI7yvaaOnoxAOY5qbV1LDQrMWTgvCJ57s3tfYf1SLFBAP35GcpQljg=w544-h544-l90-rj"
            name="メルト (かぐや ver.) [CPK! Remix]"
            full="ryo (supercell) — 初音ミク 원곡 커버"
            desc="ryo(supercell)의 명곡 'Melt'를 超かぐや姫！ 버전으로 리믹스한 곡입니다. かぐや(cv.夏吉ゆうこ)의 보컬로 새롭게 재탄생했습니다."
            tags={['超かぐや姫！', 'ryo (supercell)', '初音ミク']}
          />
          <GameCard
            image="https://lh3.googleusercontent.com/lYY90gjZzj-KcJRg6ecDp3okUJlXuMv4f-fcakUAKuZmxmIWbvVj4QHhl_X-imyEcj1Kk7It_SEozll2=w544-h544-l90-rj"
            name="ハッピーシンセサイザ (Cover)"
            full="EasyPop 원곡 커버 — 超かぐや姫！"
            desc="EasyPop의 명곡 'Happy Synthesizer'를 超かぐや姫！ 버전으로 커버한 곡입니다."
            tags={['超かぐや姫！', 'EasyPop']}
          />
          <GameCard
            image="https://lh3.googleusercontent.com/lYY90gjZzj-KcJRg6ecDp3okUJlXuMv4f-fcakUAKuZmxmIWbvVj4QHhl_X-imyEcj1Kk7It_SEozll2=w544-h544-l90-rj"
            name="ワールドイズマイン (かぐや&月見ヤチヨ ver.) [CPK! Remix]"
            full="ryo (supercell) — 超かぐや姫！ 삽입곡"
            desc="ryo(supercell)의 명곡 'World Is Mine'을 Netflix 애니메이션 超かぐや姫！의 삽입곡으로 리믹스한 버전입니다. かぐや(cv.夏吉ゆうこ)와 月見ヤチヨ(cv.早見沙織)가 듀엣으로 노래합니다."
            tags={['超かぐや姫！', 'ryo (supercell)', 'Netflix']}
          />
        </CollapsibleGroup>
        <CollapsibleGroup nested label="체인소 맨" count={2}>
          <GameCard
            image="https://lh3.googleusercontent.com/VGf2lFXKQdSyrz2g3Czj66doPtUxvJBrWDK6UFeOj8zRqS-tgs_D8FG5-8pYTX-Uh9FxZBDJIXtN1nKF=w544-h544-l90-rj"
            name="IRIS OUT"
            full="米津玄師 — チェンソーマン 극장판: 레제 편"
            desc="Kenshi Yonezu가 제작한 체인소맨 극장판 레제 편의 주제곡입니다. JANE DOE와 함께 더블 A사이드 싱글로 발매되었습니다."
            tags={['체인소 맨', '米津玄師', '극장판']}
          />
          <GameCard
            image="https://lh3.googleusercontent.com/Gn65QHGx26uZBC6Xtnn31y8TdqoIKqoa9az2Yw8ThFnA8EpszdJCoaCMbEiRjKa6kvStFWT9SkQHf0M=w544-h544-l90-rj"
            name="JANE DOE"
            full="米津玄師 × 宇多田ヒカル — チェンソーマン 극장판: 레제 편 엔딩"
            desc="Kenshi Yonezu와 Hikaru Utada가 함께 제작한 체인소맨 극장판 레제 편의 엔딩 테마입니다. 두 아티스트의 이름을 건 특별한 협업곡으로, 덴지와 레제의 얽힌 운명을 담아냈습니다."
            tags={['체인소 맨', '米津玄師', '宇多田ヒカル', '극장판']}
          />
        </CollapsibleGroup>
      </CollapsibleGroup>
    </div>
  )
}

function RhythmPanel() {
  return (
    <div className="game-cards">
      <CollapsibleGroup label="아케이드" count={3}>
        <GameCard
          icon="SD"
          iconStyle={{ background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }}
          name="SOUND VOLTEX"
          full="SOUND VOLTEX EXCEED GEAR"
          desc="KONAMI의 아케이드 리듬게임으로, 두 개의 아날로그 노브와 버튼을 조합해 플레이하는 독특한 조작감이 특징입니다."
          tags={['KONAMI', '아날로그 노브']}
        />
        <GameCard
          icon="mai"
          iconStyle={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)' }}
          name="maimai DX"
          full="maimai DX UNiVERSE PLUS"
          desc="SEGA의 아케이드 리듬게임으로, 원형 디스플레이 주변의 버튼과 터치 패널을 활용해 플레이합니다."
          tags={['SEGA', '터치 패널']}
        />
        <GameCard
          icon="CHU"
          iconStyle={{ background: 'linear-gradient(135deg,#06b6d4,#3b82f6)' }}
          name="CHUNITHM"
          full="CHUNITHM SUN PLUS"
          desc="SEGA의 아케이드 리듬게임으로, 슬라이더와 에어 센서를 활용하는 독창적인 조작 방식이 특징입니다."
          tags={['SEGA', '에어 센서']}
        />
      </CollapsibleGroup>
      <CollapsibleGroup label="PC 게임" count={3}>
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
        <GameCard
          icon="DS"
          iconStyle={{ background: 'linear-gradient(135deg,#1c1c2e,#4a0e0e)' }}
          name="The Deadseat"
          full="Curious Fox Sox — Steam"
          desc="뒷좌석에서 부모님의 싸움을 피해 핸드헬드 게임을 하는 공포 게임입니다. 게임 속 세계가 현실을 반영하기 시작하며 뒷좌석으로 침입하려는 괴물을 막아야 합니다."
          tags={['공포', 'Steam', 'Curious Fox Sox']}
        />
      </CollapsibleGroup>
      <CollapsibleGroup label="콘솔 게임" count={1}>
        <GameCard
          icon="BS"
          iconStyle={{ background: 'linear-gradient(135deg,#f43f5e,#be123c)' }}
          name="Beat Saber"
          full="Beat Saber"
          desc="Beat Games의 VR 리듬게임으로, 광선검으로 날아오는 블록을 리듬에 맞춰 자르는 직관적인 게임플레이가 특징입니다."
          tags={['Beat Games', 'VR', '콘솔']}
        />
      </CollapsibleGroup>
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
