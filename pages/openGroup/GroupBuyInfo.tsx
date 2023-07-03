import { useRouter } from "next/router"
import { useGroupBuyInfo } from "./utils/useGroupBuyInfo";
import { EditGroup, EditOrder, GroupPageProps, Layout,GroupInfoPage } from "@/component";
import { GroupBuyObject, InfoPage } from "@/interface";
import { useReduxSelector } from "@/redux";

export default function GroupBuyInfo(){
    const router = useRouter();
    const groupId = router.query.id as string || ''
    
    const {
        groupBuyObject,
        pageName,setPageName,
        status,
        update,
        errorMessage // TODO: 可能是變更團單發生失敗等等，是update的失敗
    } = useGroupBuyInfo(groupId, router.isReady);
    const userInfo = useReduxSelector((state)=> state.userInfo);
    const props: GroupPageProps = {
        groupBuyObject: groupBuyObject as GroupBuyObject,
        setPageName,userInfo
    }
    return (
        <Layout status={status}>
            {(pageName === InfoPage['資訊頁']) && 
                <GroupInfoPage {...props} 
                    updatePayState={update.updatePayState}
                    updateGroupState={update.updateGroupState}
                />
            }
            {(pageName === InfoPage['編輯團單']) && 
                <EditGroup {...props} />}
            {(pageName === InfoPage['編輯訂單']) && 
                <EditOrder {...props} />}
        </Layout>
    )
}