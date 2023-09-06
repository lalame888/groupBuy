import { serverUtils } from '@/feature';
import {
  BusinessHours,
  ErrorCode,
  GroupBuyObject,
  GroupBuyStatus,
  InfoPage,
  LoadStatus,
  LoadingStatus,
  LoggingLevel,
  MenuData,
  ReceiptType,
  StoreObject,
  UserInfo,
  UserOrder,
} from '@/interface';
import { getKeyByValue } from '@/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export function useAddStore(initName?: string) {
  const [storeName, setStoreName] = useState<string>(initName || '');
  const [storeImage, setStoreImage] = useState<string | undefined>(undefined);
  const [menuImage, setMenuImage] = useState<Array<string>>([]);
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [businessHours, setBusinessHours] = useState<Array<BusinessHours>>([]);
  const [menu, setMenu] = useState<Array<MenuData>>([]);
  const [showInvalid, setShowInvalid] = useState<boolean>(false);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const saveStore = useCallback(async () => {
    // 先防呆，確認基本的有填寫
    if (!storeName.trim() || !address.trim() || !phone) {
      setShowInvalid(true);
      return;
    }
    setShowInvalid(false);
    try {
      setIsSaving(true);
      setErrorMessage('');
      const store = new StoreObject({
        name: storeName,
        address,
        phone,
        businessHours,
        coverImage: storeImage,
        menuImage: menuImage.length > 0 ? menuImage : undefined,
        menuData: menu,
      });

      await serverUtils.saveStore(store);
      // TODO : 到store info頁面
    } catch (error) {
      setErrorMessage(`${error}`);
    }
    setIsSaving(false);
  }, []);
  return {
    state: {
      storeName,
      storeImage,
      menuImage,
      address,
      phone,
      businessHours,
      menu,
    },
    set: {
      setStoreName,
      setStoreImage,
      setMenuImage,
      setAddress,
      setPhone,
      setBusinessHours,
      setMenu,
    },
    isSaving,
    showInvalid,
    errorMessage,
    saveStore,
  };
}
