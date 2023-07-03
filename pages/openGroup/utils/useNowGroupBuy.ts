import { serverUtils } from "@/feature";
import { ErrorCode, GroupBuyObject, LoadStatus, LoggingLevel, UserInfo } from "@/interface";
import { useReduxSelector } from "@/redux";
import { toSBC } from "@/utils";
import { useEffect, useMemo, useState } from "react";

export function useGroupBuyList(type: 'now' | 'history'){
    const userInfo: UserInfo | null = useReduxSelector((state)=> state.userInfo) as  UserInfo | null;
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [groupBuyList, setGroupBuyList] = useState<GroupBuyObject[] | undefined>(undefined);
    const loadStatus: LoadStatus = (groupBuyList === undefined) ? LoadStatus['載入中'] :(errorMessage)? LoadStatus['載入失敗'] : LoadStatus['載入成功']
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [searchInput , setSearchInput] = useState<string>('');
    useEffect(()=>{
        if (userInfo) {
            loadGroupBuyList();
        } else {
            setGroupBuyList([]);
        }
        async function loadGroupBuyList(){
            try {
                const list =  await serverUtils.loadUserGroupBuyList(type); // 使用者資訊會用JWT去解
                setGroupBuyList(list);
            } catch (error) {
                const message = `取得目前團單列表發生錯誤。 錯誤訊息: ${error}`;
                setErrorMessage(message);
                serverUtils.addLog(message,LoggingLevel['ERROR'],ErrorCode['載入目前團單列表錯誤'])
            }
        }
    },[userInfo]);
    
    useEffect(()=>{
        setPageNumber(1);
    },[searchInput])

    
    const pageNation = 10; // 10筆一頁

    const filterList = useMemo(()=>{ // 經過input篩選的列表
        if (!groupBuyList || groupBuyList.length ===0 ) return [];
        return groupBuyList.filter((object: GroupBuyObject)=> {
            if (searchInput === '') return true;
            const title = toSBC(object.title).toLowerCase();
            const storeName = toSBC(object.store?.name || '').toLowerCase();
            const searchText = toSBC(searchInput).toLowerCase();
            return title.includes(searchText) || storeName.includes(searchText)
        })
    },[groupBuyList,searchInput])

    const showList = useMemo(()=>{ // 顯示的列表 (經過pageNation)
        return filterList.slice((pageNumber-1) * pageNation, pageNumber * pageNation);
    },[filterList,pageNumber]);

    const maxPage = Math.ceil(filterList.length / pageNation); // 最高頁數

    return {
        errorMessage,
        showList,
        loadStatus,
        pagination:{
            maxPage,
            pageNumber,
            setPageNumber
        },
        searchInput: {
            value: searchInput , 
            set: setSearchInput
        }
    }
}