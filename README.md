# 페헤 자기소개 사이트

페헤(Fehe)의 개인 자기소개 웹사이트입니다.

## 🔗 링크

- **사이트**: [fehe-self-introduction.vercel.app](https://fehe-self-introduction.vercel.app/)
- **YouTube**: [@fehe1234](https://www.youtube.com/@fehe1234)
- **GitHub**: [Fehe1234](https://github.com/Fehe1234)
- **Steam**: [프로필](https://steamcommunity.com/profiles/76561199008770006/)

## 📄 페이지 구성

| 페이지 | URL | 내용 |
|--------|-----|------|
| 홈 | `/` | 프로필, 활동 히스토리, 기술 스택 (언어, DB, 서버, 클라우드, 디자인, 하드웨어, IDE / 에디터, 자격증) |
| YouTube | `/youtube` | 업로드 영상 및 라이브 목록 |
| 취미 | `/hobby/:tab` | 음악 (`/hobby/music`), 게임 (`/hobby/rhythm`), 보유 기기 (`/hobby/device`) |
| 일기 | `/diary` | 비밀번호 인증 후 글 작성/삭제, Firebase Firestore 저장 (기기 간 공유) |

## ✨ 특수 기능

- **BGM 플레이어**: 우하단 고정, 재생/일시정지·볼륨·재생바 조절, 수동 재생 후 반복 재생
- **접속자 제한**: 동시 접속 10명 초과 시 대기실 표시 (Firebase Realtime Database)

## 🛠 기술 스택

- **React 18**
- **Vite 5**
- **React Router v6**
- **YouTube Data API v3**
- **YouTube IFrame API** (BGM 플레이어)
- **Firebase Firestore** (일기 저장)
- **Firebase Realtime Database** (접속자 제한)

## 📁 프로젝트 구조

```
src/
  components/
    icons.jsx         # 공용 아이콘 모음
    BgDeco.jsx        # 배경 장식
    Header.jsx        # 헤더 & 드로어 메뉴
    Footer.jsx        # 푸터
    MusicPlayer.jsx   # BGM 플레이어
    VisitorGate.jsx   # 접속자 제한 대기실
  pages/
    HomePage.jsx      # 홈 (히스토리, 기술 스택)
    YoutubePage.jsx   # 유튜브 영상 목록
    HobbyPage.jsx     # 취미 소개
    DiaryPage.jsx     # 일기 목록
    DiaryWritePage.jsx# 일기 작성
    TestGatePage.jsx  # 대기실 UI 테스트 (/test-gate)
  styles/
    base.css          # 변수, 리셋, 배경 장식
    header.css        # 헤더, 햄버거, 드로어
    home.css          # 히어로, 타임라인, 스킬
    youtube.css       # 유튜브 페이지
    hobby.css         # 취미 페이지
    footer.css        # 푸터
    musicplayer.css   # BGM 플레이어
    diary.css         # 일기 페이지
    visitor.css       # 접속자 대기실
  firebase.js         # Firebase 초기화 (Firestore, Realtime Database)
```

## ⚙️ 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```
