import { UserOrder } from '@/interface';
import { OrderListViewProps } from './OrderListView';
import { Table } from 'react-bootstrap';
import { CSSProperties } from 'react';

export function UserOverViewTable(props: OrderListViewProps) {
  const keepAllStyle: CSSProperties = { wordBreak: 'keep-all' };
  return (
    <Table bordered id={props.tableId} hover>
      <thead>
        <tr>
          <td colSpan={5} style={{ textAlign: 'center' }}>
            <h5>{props.groupName}</h5>
          </td>
        </tr>
        <tr style={keepAllStyle}>
          <td>訂購人</td>
          <td>金額</td>
          <td>項目</td>
          <td>已付款</td>
          <td>已取</td>
        </tr>
      </thead>
      <tbody>
        {props.orderList.map((order: UserOrder) => (
          <tr key={order.uid} style={keepAllStyle}>
            <td>{order.user.userName}</td>
            <td>{order.totalMoney}</td>
            <td> {order.orderContainText}</td>
            <td>
              {order.payMoney === 0
                ? ''
                : order.payMoney === order.totalMoney
                ? 'v'
                : order.payStatus}
            </td>
            <td>{order.isReceipted ? 'v' : ''}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
