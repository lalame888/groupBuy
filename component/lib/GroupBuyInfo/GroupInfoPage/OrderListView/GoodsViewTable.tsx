import { useMemo } from 'react';
import { OrderListViewProps } from './OrderListView';
import { UserOrder } from '@/interface';
import { Table } from 'react-bootstrap';
import { useHoverTable } from './useHoverTable';
import React from 'react';

export function GoodsViewTable(props: OrderListViewProps) {
  // 做自己的hover
  const { onMouseEnter, onMouseLeave, hoverStyle } = useHoverTable();

  // 根據品項歸類顯示
  const goodsList = useMemo(() => {
    // 先把一樣的東西搜集起來
    const map: {
      [goodsName: string]: {
        name: string;
        list: {
          [name: string]: {
            appendText: string;
            number: number;
            noteList: Array<string>;
            money: number;
          };
        };
      };
    } = {};
    props.orderList.forEach((userOrder: UserOrder) => {
      userOrder.orderList.forEach((goods) => {
        if (goods.isNoGoods) return; // 不算已經標示成缺貨的

        if (map[goods.name] === undefined) {
          map[goods.name] = { list: {}, name: goods.name };
        }
        if (map[goods.name].list[goods.appendTermText] === undefined) {
          map[goods.name].list[goods.appendTermText] = {
            appendText: goods.appendTermText,
            noteList: [],
            number: 0,
            money: 0,
          };
        }

        map[goods.name].list[goods.appendTermText].number += goods.number;
        map[goods.name].list[goods.appendTermText].money += goods.totalMoney;
        if (goods.note !== '') {
          map[goods.name].list[goods.appendTermText].noteList.push(
            `${userOrder.user.userName}: ${goods.note} (${goods.number}份)`,
          );
        }
      });
    });
    return Object.values(map);
  }, [props.orderList]);
  const goodsMoney: number = useMemo(() => {
    return props.orderList
      .map((order) => order.totalMoney - order.appendMoney)
      .reduce((a, b) => a + b);
  }, [props.orderList]);
  const appendMoney: number = useMemo(() => {
    return props.orderList
      .map((order) => order.appendMoney)
      .reduce((a, b) => a + b);
  }, [props.orderList]);

  return (
    <Table bordered id={props.tableId}>
      <thead>
        <tr>
          <td colSpan={5} style={{ textAlign: 'center' }}>
            <h5>{props.groupName}</h5>
          </td>
        </tr>

        <tr>
          <td>品項</td>
          <td>特製</td>
          <td>數量</td>
          <td>項目總額</td>
          <td>備註</td>
        </tr>
      </thead>
      <tbody>
        {goodsList.map((goods, index) => {
          const list: Array<{
            appendText: string;
            number: number;
            noteList: Array<string>;
            money: number;
          }> = Object.values(goods.list);
          return (
            <React.Fragment key={`${goods.name}-${index}}`}>
              {list.map((term, i) => (
                <tr
                  key={`${index}-${i}`}
                  onMouseEnter={() => onMouseEnter(index)}
                  onMouseLeave={() => onMouseLeave(index)}
                >
                  {i === 0 && (
                    <td rowSpan={list.length} style={hoverStyle(index)}>
                      {goods.name}
                    </td>
                  )}
                  <td style={hoverStyle(index)}>{term.appendText}</td>
                  <td style={hoverStyle(index)}>{term.number}</td>
                  <td style={hoverStyle(index)}>{term.money}</td>
                  <td style={hoverStyle(index)}>
                    {term.noteList.map((note, key) => (
                      <p
                        key={key}
                        style={{ marginBottom: '5px', ...hoverStyle(index) }}
                      >
                        {note}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}>
            <h4>
              商品金額總計 {goodsMoney}元
              {appendMoney > 0
                ? `，額外金額 ${appendMoney} 元，合計${
                    goodsMoney + appendMoney
                  }元`
                : ''}
            </h4>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}
