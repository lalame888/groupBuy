import { serverUtils } from "@/feature";
import { ErrorCode, GroupBuyObject, GroupBuyStatus, InfoPage, LoadStatus, LoadingStatus, LoggingLevel, ReceiptType, UserInfo, UserOrder } from "@/interface";
import { getKeyByValue } from "@/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useGroupBuyInfo(groupId: string, isReady: boolean,userInfo: UserInfo | undefined | null){
    const mounted = useRef(false);
    useEffect(() => { // 在變更的時候進行mounted的取消
        mounted.current = true; 
        setLoadingLock(false)
        return () => { mounted.current = false; }; 
    }, [groupId]);


    const [groupBuyObject, setGroupBuyObject] = useState<undefined | null | GroupBuyObject>(undefined);
    const [pageName, setPageName] = useState<InfoPage>(InfoPage['資訊頁']);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const status: LoadingStatus = useMemo(()=>{
        
        if (groupBuyObject === undefined) {
            return {
                loadStatus: LoadStatus['載入中']
            }
        } else if (groupBuyObject === null) {
            return {
                loadStatus: LoadStatus['載入失敗'],
                errorMessage: errorMessage || '找不到團單'
            }
        } else {
            return {
                loadStatus: LoadStatus['載入成功']
            }
        }
    },[groupBuyObject])
    const [loadingLock, setLoadingLock] = useState<boolean>(false);
    
    const myOrder: UserOrder | undefined = useMemo(()=>{
        // TODO: 如果沒有權限看別人的清單，要怎麼拿自己的order userOrderList 會是undefined
        if (!userInfo || !groupBuyObject || !groupBuyObject.userOrderList?.length) return undefined;
        else {
            return groupBuyObject.userOrderList.find((userOrder)=>
                (userOrder.user.loginId === userInfo.loginId)
            )
        }
    },[userInfo, groupBuyObject])

    useEffect(()=>{
        if (!isReady) {
            setGroupBuyObject(undefined);
        } else if (!groupId) {
            // id為空，顯示找不到物件，錯誤
            setGroupBuyObject(null);
        } else {
            setGroupBuyObject(undefined);
            loadGroupBuy(groupId); // 載入團單資訊
        }
    },[groupId])
    async function loadGroupBuy(groupId: string){
        setLoadingLock(true);
        try {
            if (mounted.current) {
                setErrorMessage('');
                const group = await serverUtils.loadGroupBuy(groupId);
                if (mounted.current) {
                    setGroupBuyObject(group?.clone());

                }
            }
        } catch (error) {
            setErrorMessage(`載入團單發生錯誤！ 錯誤代碼：${ErrorCode['載入團單資訊發生錯誤']} , 請重新嘗試或來信回報`)
            serverUtils.addLog(`${error}`,LoggingLevel['FATAL'],ErrorCode['載入團單資訊發生錯誤']);
            setGroupBuyObject(null);
        }
        setLoadingLock(false);
    }
    

    // === 更動狀態的function ===
    const updatePayState = useCallback(async (updateList: Array<UserOrder>)=>{
        // 有更動的才傳過來
        throw Error('尚未實作') // TODO
        // TODO 如果有error要繼續throw出去
    },[groupBuyObject])
    
    const updateGroupState = useCallback((type: GroupBuyStatus)=>{
        if (groupBuyObject) {
            groupState(groupBuyObject,type);
        }
        async function groupState(groupBuyObject: GroupBuyObject,type: GroupBuyStatus) {
            setLoadingLock(true);
            try {
                const changeTime: string = await serverUtils.updateGroupState(groupBuyObject.uid, type);
                if (mounted.current) {
                    setGroupBuyObject((old)=>{
                        if (old) {
                            const newObject = old.clone();
                            newObject.setStatues(type,changeTime); // TODO: 確認一下是要整個重新load還是只改前端
                            return newObject;
                        }
                        return old;
                    })
                }
            } catch (error) {
                setErrorMessage(`狀態變更失敗! 錯誤代碼: ${ErrorCode['團單變更狀態失敗']} ，請再試一次或是來信回報`);
                const errorLog = `團單變更狀態失敗 >> groupId = ${groupBuyObject.uid} ，從${groupBuyObject.statusText} 狀態改成 :${getKeyByValue(GroupBuyStatus,type)}，錯誤訊息: ${error}`;
                serverUtils.addLog(errorLog,LoggingLevel['FATAL'],ErrorCode['團單變更狀態失敗'])
            }
            setLoadingLock(false);

        }
        throw Error('尚未實作') // TODO
    },[groupBuyObject])
    const receiptOrder = useCallback(async(order: UserOrder)=>{
        if (userInfo ) {
            setLoadingLock(true);
            const newState = (order.user.loginId === userInfo.loginId)? ReceiptType['已簽收完畢'] : ReceiptType['團主已出貨，尚未簽收'];
            try {
                await serverUtils.receiptOrder(order,newState);
                
                const newOrderList =  await serverUtils.loadUserOrderList(groupId);
                if (mounted.current) {
                    setGroupBuyObject((old)=>{
                        if (!old || old.uid !== groupId) return old;
                        const newObject = old.clone();
                        newObject.userOrderList = newOrderList;
                        return newObject;
                    })
                }
           } catch (error) {
                setErrorMessage(`訂單收貨狀態變更失敗! 錯誤代碼: ${ErrorCode['訂單收貨狀態變更失敗']} ，請再試一次或是來信回報`);
                const errorLog = `訂單收貨狀態變更失敗 >> order = ${order.uid} ，從${order.receipt} 狀態改成 :${newState}，錯誤訊息: ${error}`;
                serverUtils.addLog(errorLog,LoggingLevel['ERROR'],ErrorCode['訂單收貨狀態變更失敗'])
           }
           setLoadingLock(false);
        } else {
            // TODO: 無登入使用者不應該執行，狀態異常
        }
    },[userInfo,myOrder,groupId])

    const deleteMyOrder = useCallback(async()=>{
        if (myOrder) {
            setLoadingLock(true);
            try {
                await serverUtils.deleteOrder(groupId,myOrder);
                if (mounted.current) {
                    loadGroupBuy(groupId); // 重新載入
                }
            } catch (error) {
                setErrorMessage(`刪除訂單失敗! 錯誤代碼: ${ErrorCode['刪除訂單失敗']} ，請再試一次或是來信回報`);
                const errorLog = `刪除訂單失敗 >> orderId = ${myOrder.uid} ,userId = ${userInfo?.loginId} 刪除自己訂單失敗，錯誤訊息: ${error}`;
                serverUtils.addLog(errorLog,LoggingLevel['FATAL'],ErrorCode['刪除訂單失敗'])
                setLoadingLock(false);
            }
        }
    },[myOrder,groupId])

    const saveOrder = useCallback(async (newOrder: UserOrder) =>{
        setLoadingLock(true);
        try {
            await serverUtils.saveOrder(groupId,newOrder);
            // 最後要儲存的時候，再看使用者送出的Order裡面有哪些商品是原本沒有的 & 看設定是可不可以更改的
            try {
                if (groupBuyObject?.store  && groupBuyObject.store.editable) {
                    const menuData =  groupBuyObject.store.menuData || [];
                    const newMenuData = newOrder.orderList.filter((goods)=>{
                        const data =  menuData.find((d)=> d.name)
                        if (data) {
                            if (data.money!== goods.money) return true;
                            return goods.appendTermList.some((append)=>{
                                data.appendMenu.find((t)=> t.name === append.name && t.money === append.money) === undefined 
                            })
                        } else {
                            return true    // 新增的
                        }
                    })
                    if (newMenuData.length > 0) {
                        // 有被更動的 => 去改store的資料
                        await serverUtils.updateStoreMenuData(groupBuyObject.store,newMenuData);
                    }
                    
                }
            } catch (error) {
                const errorLog = `更改商家MenuData失敗 >> storeUid = ${groupBuyObject?.store?.uid}, newOrder =${newOrder.stringify()}}
                ，錯誤訊息: ${error}`;
                serverUtils.addLog(errorLog,LoggingLevel['ERROR'],ErrorCode['儲存訂單失敗'])
            }
            
            await loadGroupBuy(groupId);
            setPageName(InfoPage['資訊頁']); // 成功之後自動到成功畫面
        } catch (error) {
            setErrorMessage(`儲存訂單失敗! 錯誤代碼: ${ErrorCode['儲存訂單失敗']} ，請再試一次或是來信回報`);
            const errorLog = `儲存訂單失敗 >> orderId = ${newOrder.uid} ,userId = ${userInfo?.loginId} 儲存自己訂單失敗，錯誤訊息: ${error}`;
            serverUtils.addLog(errorLog,LoggingLevel['FATAL'],ErrorCode['儲存訂單失敗'])
            setLoadingLock(false);
        }
        setLoadingLock(false);
    },[groupId,groupBuyObject?.store])
    return {
        groupBuyObject,
        pageName,setPageName,
        status,
        myOrder,
        loadingLock,
        update:{
            updatePayState,
            updateGroupState,
            deleteMyOrder,
            saveOrder,
            receiptOrder
        },
        errorMessage
    }
}