import { UserInfo } from '@/interface';
import { ReduxDispatch } from '../store';
import { serverUtils } from '@/feature';

export enum UserInfoActionType {
  SET_USER_INFO = 'SET_USER_INFO',
  UPDATE_FAVORITE_STORE_UID_LIST = 'UPDATE_FAVORITE_STORE_UID_LIST',
}

export const UserInfoAction = {
  checkLogin() {
    return async (dispatch: ReduxDispatch) => {
      const userInfo: UserInfo | null = await serverUtils.checkLogin();
      dispatch(InnerAction.setUserInfo(userInfo));
    };
  },
  updateFavoriteStoreUidList(newList: Array<string>, userUid: string) {
    return {
      type: UserInfoActionType.UPDATE_FAVORITE_STORE_UID_LIST,
      payload: { newList, userUid },
    };
  },
};

const InnerAction = {
  setUserInfo(userInfo: UserInfo | null) {
    return { type: UserInfoActionType.SET_USER_INFO, payload: { userInfo } };
  },
};
