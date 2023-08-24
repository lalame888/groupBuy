import { GroupBuyStatus, InfoPage, UserOrder } from '@/interface';
import { GroupPageProps } from '../utils';
import { GroupInfoDiv } from './GroupInfoDiv';
import { BackButton, MyHoverButton, PageTitle } from '@/component';
import { GroupTool } from './GroupTool';
import { THEME } from '@/styles/theme';
import { MyOrderInfo } from './MyOrderInfo';
import { OrderListView } from './OrderListView/OrderListView';
import { CSSProperties } from 'react';

interface GroupInfoPageProps extends GroupPageProps {
  updatePayState(updateList: Array<UserOrder>): Promise<void>; // 更動繳費或取貨狀態
  updateGroupState(type: GroupBuyStatus): Promise<void>;
  deleteMyOrder(): Promise<void>;
  receiptOrder(order: UserOrder): Promise<void>;
  myOrder: UserOrder | undefined;
}
export function GroupInfoPage(props: GroupInfoPageProps) {
  const {
    store,
    builder,
    statusText,
    endTimeString,
    joinListCount,
    groupName,
    isEnd,
    isEditAble,
    endTime,
    setting,
    userOrderList,
  } = props.groupBuyObject;
  const isOwner = builder.loginId === props.userInfo?.loginId;

  const centerRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
  };
  return (
    <div>
      <BackButton />
      <PageTitle title={groupName}>
        <>
          {' '}
          {!isEnd && (
            <GroupTool
              loadingLock={props.loadingLock}
              isOwner={builder.loginId === props.userInfo?.loginId}
              isEditAble={isEditAble}
              endTime={endTime}
              changeStatus={props.updateGroupState}
              toEditGroup={() => props.setPageName(InfoPage['編輯團單'])}
            />
          )}
        </>
      </PageTitle>
      <GroupInfoDiv
        store={store}
        builder={builder}
        statusText={statusText}
        endTimeString={endTimeString}
        joinListCount={joinListCount}
      />

      {props.myOrder !== undefined && props.myOrder.orderList.length > 0 ? (
        <MyOrderInfo
          orderInfo={props.myOrder}
          isEditable={isEditAble}
          loadingLock={props.loadingLock}
          onDeleteOrder={props.deleteMyOrder}
          toEditOrder={() => props.setPageName(InfoPage['編輯訂單'])}
          receiptOrder={
            !isEnd
              ? () => props.receiptOrder(props.myOrder as UserOrder)
              : undefined
          }
        />
      ) : props.userInfo && isEditAble ? (
        <div style={centerRowStyle}>
          <MyHoverButton
            style={{ border: THEME.border, backgroundColor: '#E5E5E533' }}
            onClick={() => {
              props.setPageName(InfoPage['編輯訂單']);
            }}
          >
            <div style={{ marginTop: '1rem' }}>
              <p>你還沒有填寫任何訂單！</p>
              <p>點選此區塊以新增訂單資訊</p>
            </div>
          </MyHoverButton>
        </div>
      ) : (
        isEditAble && (
          <div style={centerRowStyle}>
            <MyHoverButton
              // TODO: 導向登入/ 訪客登記
              style={{ border: THEME.border, backgroundColor: '#E5E5E533' }}
              to={`./login`}
            >
              <div style={{ marginTop: '1rem' }}>
                <p>登入後才可新增訂單</p>
                <p>點選此區塊以登入帳號</p>
              </div>
            </MyHoverButton>
          </div>
        )
      )}
      {(setting.openOrderView || isOwner) && userOrderList && (
        <OrderListView
          isOwner={isOwner}
          updatePayState={props.updatePayState}
          groupName={groupName}
          orderList={userOrderList}
        />
      )}
    </div>
  );
}
// TODO 截止之後還要有讓人家更動每個人狀態的(繳錢)

/** Info有幾個狀況組合
 *
 * - 能否編輯團單 -
 *  1. 是自己創的，可以
 *     a. 還在進行中，可以提前結算、可以編輯團單設定、可以改為刪除
 *     b. 已經無法跟團，還沒完成，可以進行完成團單 （結束團單）、可以編輯團單設定、可以改為刪除
 *     c. 歷史團單，已完成或是已刪除(取消的)、無法編輯團單設定 （已經是歷史了）
 *  2. 不是自己創的，不行
 * 動作：
 * (其他頁面: EditGroup)：編輯團單設定
 * (此頁面)：提前結算、刪除團單、完成團單
 *
 * - 我的訂單 -
 *  1. 無登入 單純看資訊，需登入後可以跟團
 *  2. 有登入 無建立自己的訂單、可以建立 (切換頁面)
 *  3. 有登入 有建立自己的訂單、可以修改(切換頁面)、已完成取貨
 * 動作：
 * (其他頁面: EditOrder)：建立&修改
 * (此頁面)：回報繳費、回報完成取貨
 *
 * - 檢視目前跟團名單&內容 -
 *  1. 有開放檢視，任何人都可以看、可以下載成excel
 *  2. 無開放檢視，只有自己創的可以看
 *
 * - 跟團名單&簽收狀況 -
 *  1. 自己的創的團＆還沒完結，可以更動全員的繳費狀況、收貨狀況
 *  2. 自己創的團＆已完結，無法更動
 *  3. 不是自己創的團，無法更動
 * 動作：
 *  (此頁面)：更動繳費狀況、更動收貨狀況
 *
 * 所以此頁需要的動作是
 * 1. 更動繳費&收貨狀況
 * 2. 提前結算團單
 * 3. 刪除團單
 * 4. 完成團單
 *  */

// TODO:  我的訂單頁面，資料應該重新拿
// 整個團單的其他客人下單資訊，也不能一開始就拿，而是要用的時候拿(或是有開放的時候拿、有權限的人可以拿)
// 不然沒觀看所有團單權限的人，只要f12打開就可以看到所有資訊
