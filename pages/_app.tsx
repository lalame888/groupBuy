import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { StrictMode, useEffect } from 'react'
import { UserInfoAction } from '@/redux/action';
import { Provider } from 'react-redux';
import {groupBuyStore, useReduxDispatch} from '@/redux'
import { UserInfo } from '@/interface';


export default function App(props: AppProps &{userInfo: UserInfo}) {  
  return (
    <StrictMode>
      <Provider store={groupBuyStore}>
        <AppContent {...props} />
      </Provider>
    </StrictMode>
  )
}
function AppContent({ Component, pageProps,userInfo}: AppProps &{userInfo: UserInfo}) {
  const dispatch = useReduxDispatch();
  useEffect(()=>{ // 確認登入
      dispatch(UserInfoAction.checkLogin());
  },[userInfo])
  return <Component {...pageProps} />;
}

