import { serverUtils } from "@/feature";
import { ErrorCode, GroupBuyObject, GroupBuyStatus, InfoPage, LoadStatus, LoadingStatus, LoggingLevel } from "@/interface";
import { getKeyByValue } from "@/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useGroupBuyInfo(groupId: string, isReady: boolean){
    const mounted = useRef(false);
    useEffect(() => { // 在變更的時候進行mounted的取消
            mounted.current = true; 
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
        }
    },[groupId])
    

    // === 更動狀態的function ===
    const updatePayState = useCallback(()=>{
        
        throw Error('尚未實作') // TODO
    },[groupBuyObject])
    
    const updateGroupState = useCallback((type: GroupBuyStatus)=>{
        if (groupBuyObject) {
            groupState(groupBuyObject,type);
        }
        async function groupState(groupBuyObject: GroupBuyObject,type: GroupBuyStatus) {
            try {
                const changeTime: string = await serverUtils.updateGroupState(groupBuyObject.uid, type);
                if (mounted.current) {
                    setGroupBuyObject((old)=>{
                        if (old) {
                            const newObject = old.clone();
                            newObject.setStatues(type,changeTime);
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
        }
        throw Error('尚未實作') // TODO
    },[groupBuyObject])
    return {
        groupBuyObject,
        pageName,setPageName,
        status,
        update:{
            updatePayState,
            updateGroupState
        },
        errorMessage
    }
}