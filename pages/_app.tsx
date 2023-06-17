import { useReduxDispatch } from '@/redux';
import { UserInfoAction } from '@/redux/action';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
    useEffect(()=>{ // 確認登入
        UserInfoAction.checkLogin()
    },[])

  
  return <Component {...pageProps} />
}
