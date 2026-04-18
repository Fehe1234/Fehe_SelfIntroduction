import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBbyBjAPMNSKXn_tzd1h0G2LF2ghy5bjj0",
  authDomain: "fehe-selfintroduction.firebaseapp.com",
  projectId: "fehe-selfintroduction",
  storageBucket: "fehe-selfintroduction.firebasestorage.app",
  messagingSenderId: "84438118334",
  appId: "1:84438118334:web:11ca0cda2cedd670b913ef",
  measurementId: "G-J46TBM80SC",
  databaseURL: "https://fehe-selfintroduction-default-rtdb.firebaseio.com"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const rtdb = getDatabase(app)
export const auth = getAuth(app)

export const storage = getStorage(app)

// 일기 전용 Auth 인스턴스 (admin 세션과 독립)
const diaryApp = initializeApp(firebaseConfig, 'diary')
export const diaryAuth = getAuth(diaryApp)
