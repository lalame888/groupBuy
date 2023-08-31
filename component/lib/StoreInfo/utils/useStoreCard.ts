import { serverUtils } from '@/feature';
import { ErrorCode, LoggingLevel } from '@/interface';
import { StoreObject } from '@/interface/lib/Store';
import { useReduxSelector } from '@/redux';
import { UserInfoAction } from '@/redux/action';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

export function useStoreCard(store: StoreObject) {
  const userInfo = useReduxSelector((state) => state.userInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const dispatch = useDispatch();

  const isFavoriteStore = useMemo(() => {
    if (!userInfo) return false;
    return userInfo.isFavoriteStore(store.uid);
  }, [userInfo?.favoriteStoreUidList, store.uid]);

  const toggleFavorite = useCallback(async () => {
    if (loading || !userInfo) return;
    setLoading(true);
    try {
      // 去更新收藏狀態
      await serverUtils.updateFavoriteStore(!isFavoriteStore, store.uid);
      // 取得最新的userList
      const newList = await serverUtils.loadFavoriteStoreUidList();
      // 如果登入狀態沒有更變，就把最新的userList塞進reduce內
      dispatch(
        UserInfoAction.updateFavoriteStoreUidList(newList, userInfo?.uid),
      );
    } catch (error) {
      const message = `更改收藏狀態失敗 >> ${error}`;
      setErrorMessage(message);
      serverUtils.addLog(
        message,
        LoggingLevel['ERROR'],
        ErrorCode['更變店家收藏狀態失敗'],
      );
    }
    setLoading(false);
  }, [isFavoriteStore, loading, userInfo]);

  return {
    isLogin: userInfo !== null,
    isFavoriteStore,
    loading,
    toggleFavorite,
    errorMessage,
  };
}
