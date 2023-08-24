import { GroupBuyObject, UserInfo } from '@/interface';
import { UserInfoActionType } from '../action';

export type StateType = {
  userInfo: undefined | UserInfo | null; // null表示驗證過後沒有登入
};

const initState: StateType = {
  userInfo: undefined,
};

type ActionType = {
  type: string;
  payload: any;
};

export function groupBuyReducer(
  state = initState,
  action: ActionType,
): StateType {
  switch (action.type) {
    case UserInfoActionType.SET_USER_INFO: {
      const userInfo: UserInfo | null = action.payload.userInfo;
      return { ...state, userInfo };
    }

    default:
      return state;
  }
}
