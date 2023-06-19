import { UserInfo } from "@/interface";
import { ReduxDispatch, RootState } from "../store"
import { serverUtils } from "@/feature";

export enum UserInfoActionType  {
    SET_USER_INFO = 'SET_USER_INFO' 
}

export const UserInfoAction = {
    checkLogin(){
        return (async (dispatch: ReduxDispatch)=>{
            const userInfo: UserInfo | null = await serverUtils.checkLogin();
            setTimeout(()=>{
                dispatch(InnerAction.setUserInfo(userInfo))
            },4000)
           
        })
    },
}

const InnerAction = {
    setUserInfo(userInfo: UserInfo | null) {
        return {type: UserInfoActionType.SET_USER_INFO , payload:{userInfo}}
    }
}
