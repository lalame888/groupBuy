import { GroupBuyObject, InfoPage, UserInfo } from '@/interface';
import { Dispatch, SetStateAction } from 'react';

export interface GroupPageProps {
  groupBuyObject: GroupBuyObject;
  setPageName: Dispatch<SetStateAction<InfoPage>>;
  userInfo: UserInfo | null | undefined;
  loadingLock: boolean;
}
