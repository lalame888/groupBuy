import { Confirm, IconButton, MyHoverButton } from '@/component';
import { UserOrder } from '@/interface';
import { THEME } from '@/styles/theme';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CSSProperties } from 'react';
import { Table } from 'react-bootstrap';

interface MyOrderInfoProps {
  orderInfo: UserOrder;
  isEditable: boolean;
  onDeleteOrder(): void;
  toEditOrder(): void;
  receiptOrder?(): void; // 回報已取貨
  loadingLock: boolean;
}
export function MyOrderInfo(props: MyOrderInfoProps) {
  const style: CSSProperties = {
    border: THEME.border,
    borderRadius: THEME.buttonBorderRadius,
  };
  const titleStyle: CSSProperties = {
    borderBottom: THEME.border,
    padding: '0.6rem 1.4rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
  const bodyStyle: CSSProperties = {
    padding: '1.4rem',
    lineHeight: '0.7rem',
  };

  return (
    <div style={style}>
      <div style={titleStyle}>
        <span style={{ fontSize: '1.4rem' }}>我的訂單</span>

        {props.isEditable && (
          <div style={{ display: 'flex' }}>
            <MyHoverButton
              theme="green"
              onClick={props.toEditOrder}
              style={{ marginRight: '10px' }}
            >
              修改訂單
            </MyHoverButton>

            <Confirm
              disabled={props.loadingLock}
              confirmType="delete"
              title={'確定刪除訂單？'}
              text={
                '確認要刪除所有訂購資料？\n這同時會讓你退出團單，\n請確認是否繼續。'
              }
              onConfirm={props.onDeleteOrder}
            >
              <IconButton
                disabled={props.loadingLock}
                icon={faTrashAlt}
                style={{ fontSize: '20px' }}
              />
            </Confirm>
          </div>
        )}
        {!props.isEditable &&
          props.receiptOrder &&
          !props.orderInfo.isReceipted && (
            <Confirm
              disabled={props.loadingLock}
              title={'確定回報已簽收並完成訂單？'}
              text={
                '確定回報已簽收並完成訂單？\n訂單狀態將會顯示完成簽收，\n請確認是否繼續。'
              }
              onConfirm={props.onDeleteOrder}
            >
              <MyHoverButton theme="green">完成訂單簽收</MyHoverButton>
            </Confirm>
          )}
      </div>
      <div style={bodyStyle}>
        <p>
          總金額：{props.orderInfo.totalMoney}元{' '}
          {props.orderInfo.appendMoney > 0 &&
            ` (含團購額外運費${props.orderInfo.appendMoney}元)`}
        </p>
        <p>狀態：{props.orderInfo.payStatus}</p>
        <p>額外備註：{props.orderInfo.orderNote || '無'}</p>
        <p>訂單內容：</p>

        <Table bordered hover style={{ lineHeight: '1.5rem' }}>
          <thead>
            <tr>
              <td>項目名稱</td>
              <td>數量</td>
              <td>金額</td>
              <td>特製</td>
              <td>備註</td>
            </tr>
          </thead>
          <tbody>
            {props.orderInfo.orderList.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.number}</td>
                  <td>{order.totalMoney}</td>
                  <td>{order.appendTermText}</td>
                  <td>{order.note}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
