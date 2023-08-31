import { UserInfo } from '@/interface';
import { UserInfoActionType } from '../action';

export type StateType = {
  userInfo: undefined | UserInfo | null; // null表示驗證過後沒有登入
};

const initState: StateType = {
  userInfo: undefined,
};

type ActionType = {
  type: UserInfoActionType;
  payload: any;
};

export function userInfoReducer(
  state = initState,
  action: ActionType,
): StateType {
  switch (action.type) {
    case UserInfoActionType.SET_USER_INFO: {
      const userInfo: UserInfo | null = action.payload.userInfo;
      return { ...state, userInfo };
    }
    case UserInfoActionType.UPDATE_FAVORITE_STORE_UID_LIST: {
      const userInfo = state.userInfo;
      if (!userInfo) return state;
      const { userUid, newList } = action.payload;
      if (userInfo.uid !== userUid) return state;

      const newUserInfo = userInfo.clone();
      newUserInfo.favoriteStoreUidList = newList;
      return { ...state, userInfo: newUserInfo };
    }

    default:
      return state;
  }
}
