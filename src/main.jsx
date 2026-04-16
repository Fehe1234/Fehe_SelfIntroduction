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
  '%c개발자군요? 뭔가를 찾고 있다면...',
  'color:#8b949e;font-size:12px;'
)
console.log(
  '%c  키보드를 잘 살펴보세요. 특히 숫자 1 왼쪽에 있는 키를.',
  'color:#484f58;font-size:11px;font-style:italic;'
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
