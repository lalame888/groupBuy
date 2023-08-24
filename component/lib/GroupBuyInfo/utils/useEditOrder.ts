import { GoodsData, UserData, UserOrder } from '@/interface';
import { useCallback, useEffect, useState } from 'react';

export function useEditOrder(order: UserOrder | undefined, userData: UserData) {
  const [myOrder, setMyOrder] = useState<UserOrder>(
    order || new UserOrder(userData),
  );
  const [orderNote, setOrderNode] = useState<string>(myOrder.orderNote);

  useEffect(() => {
    setMyOrder(order || new UserOrder(userData));
    setOrderNode(myOrder.orderNote);
  }, [order]);

  const editGoods = useCallback(
    (newGoods: GoodsData, index: number) => {
      const newOrder = myOrder.clone();
      const newList = [...newOrder.orderList];
      newList[index] = newGoods;
      newOrder.orderList = newList;
      setMyOrder(newOrder);
    },
    [myOrder],
  );
  const deleteGoods = useCallback(
    (index: number) => {
      const newOrder = myOrder.clone();
      const newList = [...newOrder.orderList];
      newList.splice(index, 1);
      newOrder.orderList = newList;
      setMyOrder(newOrder);
    },
    [myOrder],
  );
  const addBlankGoods = useCallback(() => {
    if (myOrder.orderList.find((o) => o.name === '') === undefined) {
      // 沒有其他name = undefined的了
      const newOrder = myOrder.clone();
      const newList = [...newOrder.orderList];
      newList.push(new GoodsData('', 0));
      newOrder.orderList = newList;
      setMyOrder(newOrder);
    }
  }, [myOrder]);

  //頁面離開或者瀏覽器關閉的時候給予提示
  useEffect(() => {
    function checkHasFile(): string | undefined {
      return '資料尚未儲存，確定要離開本頁面嗎？';
    }
    window.onbeforeunload = checkHasFile;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return {
    myOrder,
    editGoods,
    deleteGoods,
    addBlankGoods,
    orderNote,
    setOrderNode,
  };
}
