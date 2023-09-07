import { serverUtils } from '@/feature';
import { BusinessHours, MenuData, StoreObject } from '@/interface';
import { useCallback, useState } from 'react';

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
    if (storeName.trim() === '') {
      setShowInvalid(true);
      return;
    }
    setShowInvalid(false);
    try {
      setIsSaving(true);
      setErrorMessage('');

      // 儲存時把營業時間中有空字串的移除
      const hours = businessHours
        ? businessHours.map((t) => ({
            ...t,
            openTime: t.openTime.filter((d) => d.trim() !== ''),
          }))
        : undefined;
      const store = new StoreObject({
        name: storeName,
        address,
        phone,
        businessHours: hours,
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
  }, [storeName, businessHours, address, phone, storeImage, menuImage, menu]);
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
