import { GroupBuyObject, InfoPage, LoadStatus, LoadingStatus } from "@/interface";
import { useCallback, useMemo, useState } from "react";




export function useGroupBuyInfo(groupId: string){
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