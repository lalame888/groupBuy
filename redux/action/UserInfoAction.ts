import { UserInfo } from "@/interface";
import { ReduxDispatch, RootState } from "../store"
import { serverUtils } from "@/feature";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export enum UserInfoActionType  {
    SET_USER_INFO = 'SET_USER_INFO' 
}

export const UserInfoAction = {
    checkLogin(){
        return (async (dispatch: ReduxDispatch)=>{
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
