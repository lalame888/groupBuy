import { UserInfo } from "@/interface";
import { AppDispatch } from "../store"
import { serverUtils } from "@/feature";

export enum UserInfoActionType  {
    SET_USER_INFO = 'SET_USER_INFO' 
}

export const UserInfoAction = {
    checkLogin(){
        return (async (dispatch: AppDispatch)=>{
            const userInfo: UserInfo | undefined = await serverUtils.checkLogin();
            dispatch(InnerAction.setUserInfo(userInfo))
        })
    },
}

const InnerAction = {
    setUserInfo(userInfo: UserInfo | undefined | null) {
        return {type: UserInfoActionType.SET_USER_INFO , payload:{userInfo}}
    }
}
