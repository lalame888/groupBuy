import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProps } from 'next/app';
import { GetServerSideProps, GetServerSidePropsContext } from "next";

import { StrictMode, useEffect } from 'react'
import { UserInfoAction } from '@/redux/action';
import { Provider } from 'react-redux';
import {groupBuyStore, useReduxDispatch, useReduxSelector} from '@/redux'
import { Header } from '@/component';
import { UserInfo } from '@/interface';


export function App(props: AppProps) {  
  return (
    <StrictMode>
      <Provider store={groupBuyStore}>
        <AppContent {...props} />
      </Provider>
    </StrictMode>
  )
}
function AppContent({ Component, pageProps}: AppProps) {
  const dispatch = useReduxDispatch();
  const userInfo: UserInfo | null | undefined = useReduxSelector((state)=> state.userInfo);

  useEffect(()=>{ // 確認登入
      dispatch(UserInfoAction.checkLogin());
  },[])
  if (userInfo === undefined) return <div></div>
  return(
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )
  ;
}

export default App;