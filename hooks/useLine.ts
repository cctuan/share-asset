import { useRef, useEffect } from "react";
import type { Liff }  from '@line/liff'
const liffId = process.env.NEXT_PUBLIC_LIFF_ID || ''

export const useLine = () => {
  const liffRef = useRef<Liff>()
  useEffect(() => {
    connectLine()
  }, [])

  const connectLine = async() => {
    const liff = (await import('@line/liff')).default
    try {
      await liff.init({ liffId });
      liffRef.current = liff
    } catch (error) {
      console.error('liff init error')
    }
    if (!liff.isLoggedIn()) {
      liff.login({
        redirectUri: location.href
      });
    }
  }

  return {
    connectLine,
    liffConnector: liffRef.current
  }
}