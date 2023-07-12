import { serverUtils } from "@/feature";
import { ErrorCode, GroupBuyObject, GroupBuyStatus, InfoPage, LoadStatus, LoadingStatus, LoggingLevel, UserInfo, UserOrder } from "@/interface";
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
                    setGroupBuyObject(group);
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
                serverUtils.addLog(errorLog,LoggingLevel['DEBUG'],ErrorCode['團單變更狀態失敗'])
            }
            setLoadingLock(false);

        }
        throw Error('尚未實作') // TODO
    },[groupBuyObject])

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
                serverUtils.addLog(errorLog,LoggingLevel['DEBUG'],ErrorCode['團單變更狀態失敗'])
                setLoadingLock(false);
            }
        }
    },[myOrder,groupId])
    return {
        groupBuyObject,
        pageName,setPageName,
        status,
        myOrder,
        loadingLock,
        update:{
            updatePayState,
            updateGroupState,
            deleteMyOrder
        },
        errorMessage
    }
}