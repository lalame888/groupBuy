import { LoadStatus, UserInfo } from "@/interface";
import { useReduxSelector } from "@/redux";
import { useEffect } from "react";
import { MyHoverButton } from "../Button";
import { Container } from "react-bootstrap";

interface LayoutProps {
    children: React.ReactNode,
    shouldLogin?: boolean, // 是否應該登入，沒有登入顯示固定的資訊&前往登入的按鈕
    shouldLoginTurnToHome?: boolean, // 沒有登入的時候直接返回登入入口
    status?:{
        loadStatus: LoadStatus,
        errorMessage?: string // 是否有錯誤訊息，如果狀態為失敗＆有錯誤訊息顯示錯誤訊息
    }
}
export function Layout(props: LayoutProps){
    const userInfo: UserInfo | null | undefined = useReduxSelector((state)=> state.userInfo) 

    useEffect(()=>{
        if (userInfo === null && props.shouldLoginTurnToHome) {
            location.href = 'index.html'; // TODO: 還要測試這個是否正確
        }
    },[userInfo,props.shouldLoginTurnToHome])

    if (props.status && props.status.loadStatus === LoadStatus['載入失敗']) {
        // TODO: 顯示錯誤訊息顯示頁面
        // 如果有錯誤訊息就顯示錯誤訊息
        return <div>錯誤訊息頁面 {props.status.errorMessage ?`、錯誤訊息 = ${props.status.errorMessage}` :''}</div>
    } else if (userInfo === null && props.shouldLogin) {
        // TODO: 顯示該頁面應該要登入&可以登入的按鈕
        return <div>請登入頁面 <MyHoverButton to="login">登入</MyHoverButton></div>
    } else if (props.status && props.status.loadStatus === LoadStatus['載入中']){
        // TODO: 顯示載入畫面
        return <div>載入中頁面</div>
    } else {
        return (
            <Container style={{maxWidth: '900px'}}>
                {props.children}
            </Container>
        ) // 照常顯示
    }
}