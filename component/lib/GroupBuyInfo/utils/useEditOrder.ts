import { GoodsData, UserData, UserOrder } from "@/interface"
import { useCallback, useState } from "react"


export function useEditOrder(order: UserOrder | undefined, userData: UserData){
    const [myOrder, setMyOrder] = useState<UserOrder>(order || new UserOrder(userData))
    const [orderNote, setOrderNode] = useState<string>(myOrder.orderNote);

    const editGoods = useCallback((newGoods: GoodsData,index: number)=>{
        const newOrder = myOrder.clone();
        const newList = [...newOrder.orderList];
        newList[index]=newGoods;
        newOrder.orderList = newList;
        setMyOrder(newOrder);
    },[myOrder])
    const deleteGoods = useCallback((index: number)=>{
        const newOrder = myOrder.clone();
        const newList = [...newOrder.orderList];
        newList.splice(index,1);
        newOrder.orderList = newList;
        setMyOrder(newOrder);
    },[myOrder])
    const addBlankGoods = useCallback(()=>{
        if (myOrder.orderList.find((o)=>o.name === '') === undefined) {
            // 沒有其他name = undefined的了
            const newOrder = myOrder.clone();
            const newList = [...newOrder.orderList];
            newList.push(new GoodsData('',0));
            newOrder.orderList = newList
            setMyOrder(newOrder);
        }
    },[myOrder])

    // TODO: 最後要儲存的時候，再看使用者送出的Order裡面有哪些商品是原本沒有的 & 看設定是可不可以更改的
    return {
          myOrder,
          editGoods,
          deleteGoods,
          addBlankGoods,
          orderNote, setOrderNode
    }
}