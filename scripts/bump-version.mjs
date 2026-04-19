// Firebase RTDB app/version 을 현재 타임스탬프로 업데이트합니다.
// 사용: node scripts/bump-version.mjs
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// .env 파일에서 FIREBASE_DB_SECRET 읽기
let secret = ''
try {
  const env = readFileSync(join(__dirname, '..', '.env'), 'utf-8')
  const match = env.match(/^FIREBASE_DB_SECRET=(.+)$/m)
  if (match) secret = match[1].trim()
} catch {}

if (!secret) {
  console.error('❌  .env 파일에 FIREBASE_DB_SECRET 값이 없습니다.')
  console.error('    Firebase 콘솔 > 프로젝트 설정 > 서비스 계정 > 데이터베이스 보안 비밀')
  process.exit(1)
}

const version = Date.now().toString()
const url = `https://fehe-selfintroduction-default-rtdb.firebaseio.com/app/version.json?auth=${secret}`

const res = await fetch(url, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(version),
})

if (res.ok) {
  console.log(`✓ 버전 업데이트 완료: ${version}`)
} else {
  const text = await res.text()
  console.error('❌ 업데이트 실패:', text)
  process.exit(1)
}
