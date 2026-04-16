import { useEffect, useRef } from 'react'
import { rtdb } from '../firebase'
import { ref, onValue, set } from 'firebase/database'

export default function VersionWatcher() {
  const initialVersion = useRef(null)

  useEffect(() => {
    const versionRef = ref(rtdb, 'app/version')

    const unsub = onValue(versionRef, snap => {
      const v = snap.val()
      if (v === null) return

      if (initialVersion.current === null) {
        // 처음 접속 시 현재 버전 기억
        initialVersion.current = v
      } else if (v !== initialVersion.current) {
        // 버전이 바뀌면 강제 새로고침
        window.location.reload()
      }
    })

    return () => unsub()
  }, [])

  return null
}
