import { serverUtils, useList } from '@/feature';
import { StoreObject, UserInfo } from '@/interface';
import { useReduxSelector } from '@/redux';
import { toSBC } from '@/utils';
import { useCallback } from 'react';

export function useStoryInfoList(
  type: 'favorite' | 'search',
  searchText?: string,
) {
  const userInfo = useReduxSelector(
    (state) => state.userInfo,
  ) as UserInfo | null;
  const loadFunction = useCallback(() => {
    console.log(searchText);
    return serverUtils.loadStoreList(type, searchText);
  }, [type, searchText]);
  const inputFilter = useCallback((item: StoreObject, searchName: string) => {
    const storeName = toSBC(item.name).toLowerCase();
    const searchText = searchName.toLowerCase();
    return storeName.includes(searchText);
  }, []);
  return useList<StoreObject>(userInfo, loadFunction, inputFilter);
}
