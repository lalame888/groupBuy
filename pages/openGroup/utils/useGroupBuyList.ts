import { serverUtils, useList } from '@/feature';
import { GroupBuyObject, UserInfo } from '@/interface';
import { useReduxSelector } from '@/redux';
import { toSBC } from '@/utils';
import { useCallback } from 'react';

export function useGroupBuyList(type: 'now' | 'history') {
  const loadFunction = useCallback(() => {
    return serverUtils.loadUserGroupBuyList(type);
  }, [type]);
  const userInfo = useReduxSelector(
    (state) => state.userInfo,
  ) as UserInfo | null;
  const inputFilter = useCallback(
    (item: GroupBuyObject, searchName: string) => {
      const title = toSBC(item.title).toLowerCase();
      const storeName = toSBC(item.store?.name || '').toLowerCase();
      const searchText = searchName.toLowerCase();
      return title.includes(searchText) || storeName.includes(searchText);
    },
    [],
  );
  return useList<GroupBuyObject>(userInfo, loadFunction, inputFilter);
}
