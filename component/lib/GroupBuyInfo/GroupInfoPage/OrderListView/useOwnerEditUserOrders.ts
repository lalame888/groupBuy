import {
  EditOrderAction,
  EditOrderType,
  GoodsData,
  ReceiptType,
  UserOrder,
} from '@/interface';
import { useCallback, useState } from 'react';

export function useOwnerEditUserOrders(
  originalOrderList: Array<UserOrder>,
  update: (updateList: Array<UserOrder>) => Promise<void>,
) {
  const [orderList, setOrderList] = useState<Array<UserOrder>>([
    ...originalOrderList,
  ]);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);

  const onSave = useCallback(async () => {
    setSaveDisabled(true);
    try {
      const updateList = orderList.filter((o) => o.isEdit);
      await update(updateList);
    } catch (error) {
      throw new Error(`${error}`);
    }
    setSaveDisabled(false);
  }, [update, orderList]);

  const onChangeOrder = useCallback(
    (uid: string, editValue: EditOrderType) => {
      const originalOrder = originalOrderList.find((o) => o.uid === uid);
      if (!originalOrder) {
        console.error(`找不到原訂單資訊`);
        return;
      }
      setOrderList((oldList: UserOrder[]) => {
        const orderIndex = orderList.findIndex((o) => o.uid === uid);
        if (orderIndex === -1) return oldList;

        const newOrder = oldList[orderIndex];
        const changeIndex = newOrder.editArray.findIndex(
          (edit) => edit.type === editValue.type,
        );
        if (changeIndex === -1) {
          // 如果沒有針對這個項目修改過，一定是直接塞進去
          newOrder.editArray = [...newOrder.editArray, editValue];
        } else {
          let isCancel = false;
          // 有修改過，要看是不是取消原本的修改
          if (editValue.type === EditOrderAction['修改商品資訊']) {
            // 包含：標示缺貨 修改金額 修改特製金額
            // 要針對產品的資訊去判斷是不是取消原本修改
            const newGoods = editValue.value as GoodsData;
            const originalGoods = originalOrder.orderList.find(
              (g) => g.uid === newGoods.uid,
            );
            if (originalGoods) {
              isCancel =
                newGoods.isNoGoods !== originalGoods.isNoGoods ||
                newGoods.appendTermText !== originalGoods.appendTermText ||
                newGoods.money !== originalGoods.money;
            } else {
              // 找不到原本的
              isCancel = true; // 取消改動 => 沒有原本的商品
            }
          } else {
            // 包含： 已付款、收貨狀況、額外金額
            isCancel =
              originalOrder[editValue.type as 'receipt'] === editValue.value;
          }

          if (isCancel) {
            newOrder.editArray = [...newOrder.editArray];
            newOrder.editArray.splice(changeIndex, 1); // 把原本的取消掉
          } else {
            newOrder.editArray = [...newOrder.editArray]; // 把原本的再修改
            newOrder.editArray[changeIndex] = editValue;
          }
        }

        const newList = [...oldList];
        newList[orderIndex] = newOrder;
        return newList;
      });
    },
    [originalOrderList],
  );

  const onChangePayMoney = useCallback(
    (order: UserOrder, newValue: string) => {
      const value = parseInt(newValue || '0');
      if (!isNaN(value) && value >= 0) {
        onChangeOrder(order.uid, {
          type: EditOrderAction['已付金額'],
          value: value,
        });
      }
    },
    [onChangeOrder],
  );

  const onChangeIsPay = useCallback(
    (order: UserOrder, checked: boolean) => {
      let newMoney = order.payMoney;
      if (checked) {
        newMoney = Math.max(order.totalMoney, order.payMoney);
      } else {
        //取消勾選
        newMoney = 0;
      }
      onChangeOrder(order.uid, {
        type: EditOrderAction['已付金額'],
        value: newMoney,
      });
    },
    [onChangeOrder],
  );

  const onChangeReceipt = useCallback(
    (order: UserOrder, checked: boolean) => {
      const originalOrder = originalOrderList.find((o) => o.uid === order.uid);
      if (originalOrder) {
        const originalReceipt = originalOrder.receipt;
        const newReceipted =
          checked && originalReceipt === ReceiptType['未到貨']
            ? ReceiptType['團主已出貨，尚未簽收']
            : !checked
            ? ReceiptType['未到貨']
            : originalReceipt;
        onChangeOrder(order.uid, {
          type: EditOrderAction['收貨狀態'],
          value: newReceipted,
        });
      } else {
        console.error(`找不到原始訂單`);
      }
    },
    [originalOrderList, onChangeOrder],
  );

  const onChangeIsNoGoods = useCallback(
    (order: UserOrder, goods: GoodsData) => {
      const newGoods = goods.clone();
      newGoods.isNoGoods = !goods.isNoGoods;
      onChangeOrder(order.uid, {
        type: EditOrderAction['修改商品資訊'],
        value: newGoods,
      });
    },
    [onChangeOrder],
  );

  return {
    orderList,
    saveDisabled,
    onSave,
    onChange: {
      payMoney: onChangePayMoney,
      isPay: onChangeIsPay,
      receipt: onChangeReceipt,
      isNoGoods: onChangeIsNoGoods,
    },
  };
}
