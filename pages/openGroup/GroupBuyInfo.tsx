import { useRouter } from "next/router"
import { useGroupBuyInfo } from "./utils/useGroupBuyInfo";
import { EditGroup, EditOrder, GroupPageProps, Layout,GroupInfoPage } from "@/component";
import { GroupBuyObject, InfoPage } from "@/interface";
import { useReduxSelector } from "@/redux";

export default function GroupBuyInfo(){
    const router = useRouter();
    const groupId = router.query.id as string || ''
    const userInfo = useReduxSelector((state)=> state.userInfo);

    const {
        groupBuyObject,
        pageName,setPageName,
        status,
        update,
        myOrder,
        loadingLock, // update中 按鈕要鎖起來
        errorMessage // TODO: 可能是變更團單發生失敗等等，是update的失敗
    } = useGroupBuyInfo(groupId, router.isReady,userInfo);
    const props: GroupPageProps = {
        groupBuyObject: groupBuyObject as GroupBuyObject,
        setPageName,userInfo,loadingLock
    }


    return (
        <Layout status={status}>
            {(pageName === InfoPage['資訊頁']) && 
                <GroupInfoPage {...props} 
                    updatePayState={update.updatePayState}
                    updateGroupState={update.updateGroupState}
                    myOrder={myOrder}
                    deleteMyOrder={update.deleteMyOrder}
                />
            }
            {(pageName === InfoPage['編輯團單']) && 
                <EditGroup {...props} />}
            {(pageName === InfoPage['編輯訂單']) && 
                <EditOrder {...props} />}
        </Layout>
    )
}