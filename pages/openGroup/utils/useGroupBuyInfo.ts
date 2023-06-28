import { serverUtils } from "@/feature";
import { ErrorCode, GroupBuyObject, InfoPage, LoadStatus, LoadingStatus, LoggingLevel } from "@/interface";
import { useCallback, useEffect, useMemo, useState } from "react";




export function useGroupBuyInfo(groupId: string, isReady: boolean){
    const [groupBuyObject, setGroupBuyObject] = useState<undefined | null | GroupBuyObject>(undefined);
    const [pageName, setPageName] = useState<InfoPage>(InfoPage['資訊頁']);
    
    const status: LoadingStatus = useMemo(()=>{
        if (groupBuyObject === undefined) {
            return {
                loadStatus: LoadStatus['載入中']
            }
        } else if (groupBuyObject === null) {
            return {
                loadStatus: LoadStatus['載入失敗'],
                errorMessage: '找不到團單'
            }
        } else {
            return {
                loadStatus: LoadStatus['載入成功']
            }
        }
    },[groupBuyObject])
    
    useEffect(()=>{
        if (!isReady) {
            setGroupBuyObject(undefined);
        } else if (!groupId) {
            // id為空，顯示找不到物件，錯誤
            setGroupBuyObject(null);
        } else {
            setGroupBuyObject(undefined);
            loadGroupBuy(); // 載入團單資訊
        }

        async function loadGroupBuy(){
            try {
                const group = await serverUtils.loadGroupBuy(groupId);
                console.log(group)
                if (groupId && groupId === group?.uid)setGroupBuyObject(group);
            } catch (error) {
                setGroupBuyObject(null);
                serverUtils.addLog(``,LoggingLevel['ERROR'],ErrorCode['載入團單資訊發生錯誤']);
            }
        }
    },[groupId])
    

    // === 更動狀態的function ===
    const updatePayState = useCallback(()=>{
        throw Error('尚未實作')
    },[groupBuyObject])
    
    const updateGroupState = useCallback((type:'結算'|'刪除'|'完成')=>{
        throw Error('尚未實作')
    },[groupBuyObject])
    return {
        groupBuyObject,
        pageName,setPageName,
        status,
        update:{
            updatePayState,
            updateGroupState
        }
    }
}