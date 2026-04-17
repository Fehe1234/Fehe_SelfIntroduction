import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

console.log(
  '%c페헤의 사이트에 오신 것을 환영합니다.',
  'color:#6bbde0;font-size:14px;font-weight:bold;'
)
console.log(
  '%c이 사이트 어딘가엔 메뉴에 없는 공간이 숨어있습니다.',
  'color:#8b949e;font-size:12px;'
)
console.log(
  '%c  — grave accent',
  'color:#484f58;font-size:11px;font-style:italic;'
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
