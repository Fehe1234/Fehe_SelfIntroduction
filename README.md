# 페헤 자기소개 사이트

페헤(Fehe)의 개인 자기소개 웹사이트입니다.

## 🔗 링크

- **사이트**: [feheselfintroduction.netlify.app](https://feheselfintroduction.netlify.app/)
- **YouTube**: [@fehe1234](https://www.youtube.com/@fehe1234)
- **GitHub**: [Fehe1234](https://github.com/Fehe1234)
- **Steam**: [프로필](https://steamcommunity.com/profiles/76561199008770006/)

## 📄 페이지 구성

| 페이지 | URL | 내용 |
|--------|-----|------|
| 홈 | `/` | 프로필, 활동 히스토리, 기술 스택 (언어, DB, 서버, 디자인, 하드웨어, IDE / 에디터) |
| YouTube | `/youtube` | 업로드 영상 및 라이브 목록 |
| 취미 | `/hobby` | 음악, 게임 |

## 🛠 기술 스택

- **React 18**
- **Vite 5**
- **React Router v6**
- **YouTube Data API v3**

## 📁 프로젝트 구조

```
src/
  components/
    icons.jsx       # 공용 아이콘 모음
    BgDeco.jsx      # 배경 장식
    Header.jsx      # 헤더 & 드로어 메뉴
    Footer.jsx      # 푸터
  pages/
    HomePage.jsx    # 홈 (히스토리, 기술 스택)
    YoutubePage.jsx # 유튜브 영상 목록
    HobbyPage.jsx   # 취미 소개
  styles/
    base.css        # 변수, 리셋, 배경 장식
    header.css      # 헤더, 햄버거, 드로어
    home.css        # 히어로, 타임라인, 스킬
    youtube.css     # 유튜브 페이지
    hobby.css       # 취미 페이지
    footer.css      # 푸터
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
