import { CSSProperties } from 'react';
import { OrderListViewProps } from './OrderListView';
import { UserOrder, GoodsData } from '@/interface';
import { Table } from 'react-bootstrap';
import { useHoverTable } from './useHoverTable';
import React from 'react';

export function UserViewTable(props: OrderListViewProps) {
  // 做自己的hover
  const { onMouseEnter, onMouseLeave, hoverStyle } = useHoverTable();
  return (
    <Table bordered id={props.tableId}>
      <thead>
        <tr>
          <td colSpan={7} style={{ textAlign: 'center' }}>
            <h5>{props.groupName}</h5>
          </td>
        </tr>

        <tr>
          <td>訂購人</td>
          <td>項目</td>
          <td>金額</td>
          <td>備註</td>
          <td>總金額</td>
          <td>已付款</td>
          <td>已取</td>
        </tr>
      </thead>
      <tbody>
        {props.orderList.map((order: UserOrder, index) => (
          <React.Fragment key={`${order.user.loginId}-${index}`}>
            {order.orderList
              .sort((a) => {
                if (a.isNoGoods) return 1;
                return -1;
              })
              .map((goods: GoodsData, i: number) => {
                const centerStyle: CSSProperties = {
                  verticalAlign: 'middle',
                  textAlign: 'center',
                };
                const isNoGoodsStyle: CSSProperties = goods.isNoGoods
                  ? {
                      backgroundColor: 'lightgray',
                      color: 'gray',
                    }
                  : {};
                return (
                  <tr
                    key={`${order.uid}-${i}`}
                    onMouseEnter={() => onMouseEnter(index)}
                    onMouseLeave={() => onMouseLeave(index)}
                  >
                    {i === 0 && (
                      <td
                        rowSpan={order.orderList.length}
                        style={hoverStyle(index, 'center')}
                      >
                        {order.user.userName}
                      </td>
                    )}
                    <td style={{ ...hoverStyle(index), ...isNoGoodsStyle }}>{`${
                      goods.isNoGoods ? '(缺貨) ' : ''
                    }${goods.name}${
                      goods.appendTermText !== ''
                        ? `(${goods.appendTermText})`
                        : ''
                    } * ${goods.number}份`}</td>
                    <td style={{ ...hoverStyle(index), ...isNoGoodsStyle }}>
                      {goods.totalMoney}
                    </td>
                    <td style={{ ...hoverStyle(index), ...isNoGoodsStyle }}>
                      {goods.note}
                    </td>
                    {i === 0 && (
                      <td
                        rowSpan={order.orderList.length}
                        style={{ ...centerStyle, ...hoverStyle(index) }}
                      >
                        {Math.max(order.totalMoney - order.appendMoney, 0)}
                      </td>
                    )}
                    {i === 0 && (
                      <td
                        rowSpan={order.orderList.length}
                        style={{ ...centerStyle, ...hoverStyle(index) }}
                      >
                        {order.totalMoney === order.payMoney ||
                        order.totalMoney === 0
                          ? 'V'
                          : order.payMoney === 0
                          ? ''
                          : `${order.payStatus}`}
                      </td>
                    )}
                    {i === 0 && (
                      <td
                        rowSpan={order.orderList.length}
                        style={{ ...centerStyle, ...hoverStyle(index) }}
                      >
                        {order.isReceipted ? 'v' : ''}
                      </td>
                    )}
                  </tr>
                );
              })}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}
