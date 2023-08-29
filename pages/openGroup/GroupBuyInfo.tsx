import { useRouter } from 'next/router';
import { useGroupBuyInfo } from './utils/useGroupBuyInfo';
import {
  EditGroup,
  EditOrder,
  GroupPageProps,
  Layout,
  GroupInfoPage,
} from '@/component';
import { GroupBuyObject, InfoPage } from '@/interface';
import { useReduxSelector } from '@/redux';

export default function GroupBuyInfo() {
  const router = useRouter();
  const groupId = (router.query.id as string) || '';
  const userInfo = useReduxSelector((state) => state.userInfo);

  const {
    groupBuyObject,
    pageName,
    setPageName,
    status,
    update,
    myOrder,
    loadingLock, // update中 按鈕要鎖起來
  } = useGroupBuyInfo(groupId, router.isReady, userInfo);
  const props: GroupPageProps = {
    groupBuyObject: groupBuyObject as GroupBuyObject,
    setPageName,
    userInfo,
    loadingLock,
  };

  return (
    <Layout status={status}>
      {pageName === InfoPage['資訊頁'] && (
        <GroupInfoPage
          {...props}
          updatePayState={update.updatePayState}
          updateGroupState={update.updateGroupState}
          myOrder={myOrder}
          deleteMyOrder={update.deleteMyOrder}
          receiptOrder={update.receiptOrder}
        />
      )}
      {pageName === InfoPage['編輯團單'] && props.userInfo && (
        <EditGroup {...props} />
      )}
      {pageName === InfoPage['編輯訂單'] && props.userInfo && (
        <EditOrder {...props} myOrder={myOrder} saveOrder={update.saveOrder} />
      )}
    </Layout>
  );
}
