import { UserInfo } from "@/interface";
import { UserInfoActionType } from "../action";

export type StateType = {
  userInfo: undefined | UserInfo
  isLoading: boolean
}

const initState: StateType = {
  isLoading: false,
  userInfo: undefined
};

type ActionType = {
    type: string,
    payload: any
}

export function groupBuyReducer(state = initState, action: ActionType): StateType {
  switch (action.type) {
    case UserInfoActionType.SET_USER_INFO: {
      const userInfo:UserInfo | undefined = action.payload.userInfo;
        return {...state, userInfo};
    }
    

    default:
      return state;
  }
}
  
