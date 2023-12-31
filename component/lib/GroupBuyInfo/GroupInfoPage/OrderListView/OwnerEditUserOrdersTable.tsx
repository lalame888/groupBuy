import { GoodsData, ReceiptType, UserOrder } from '@/interface';
import {
  Button,
  Form,
  FormCheck,
  FormControl,
  OverlayTrigger,
  Popover,
  Table,
} from 'react-bootstrap';
import { CSSProperties } from 'react';
import { IconButton, MyHoverButton } from '@/component';
import React from 'react';
import { useHoverTable } from './useHoverTable';
import { faTrash, faTrashCanArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useOwnerEditUserOrders } from './useOwnerEditUserOrders';

interface OwnerEditUserOrdersTableProps {
  orderList: Array<UserOrder>;
  update(updateList: Array<UserOrder>): Promise<void>;
  cancel(): void;
}
// TODO: 需考慮到無貨或是漲價的情況

export function OwnerEditUserOrdersTable(props: OwnerEditUserOrdersTableProps) {
  const { onMouseEnter, onMouseLeave, hoverStyle } = useHoverTable();
  const { orderList, saveDisabled, onSave, onChange } = useOwnerEditUserOrders(
    props.orderList,
    props.update,
  );
  // TODO: 使用者編輯自己的清單&清單顯示，要看得到被團主選;缺貨的標示 &可以再另外編輯
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '10px',
        }}
      >
        <MyHoverButton
          onClick={() => props.cancel()}
          disabled={saveDisabled}
          style={{ marginRight: '10px' }}
        >
          取消修改
        </MyHoverButton>
        <MyHoverButton theme="green" onClick={onSave} disabled={saveDisabled}>
          儲存編輯
        </MyHoverButton>
      </div>
      <Table bordered style={{ wordBreak: 'keep-all' }}>
        <thead>
          <tr>
            <td colSpan={8} style={{ textAlign: 'center' }}>
              <h5>修改使用者訂單資訊與狀態</h5>
            </td>
          </tr>
          <tr>
            <td>訂購人</td>
            <td>項目</td>
            <td>金額</td>
            <td>備註</td>
            <td>總金額</td>
            <td>付款金額</td>
            <td>已出貨</td>
            <td>標示缺貨</td>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order: UserOrder, index) => (
            <React.Fragment key={`${order.user.loginId}-${index}`}>
              {order.orderList
                .sort((a) => {
                  if (a.isNoGoods) return 1;
                  return -1;
                })
                .map((goods: GoodsData, i: number) => {
                  const isNoGoodsStyle: CSSProperties = goods.isNoGoods
                    ? {
                        backgroundColor: 'lightgray',
                        color: 'gray',
                      }
                    : {};
                  const rowSpan = order.orderList.length;
                  return (
                    <tr
                      key={`${order.uid}-${i}`}
                      onMouseEnter={() => onMouseEnter(index)}
                      onMouseLeave={() => onMouseLeave(index)}
                    >
                      {i === 0 && (
                        <td
                          rowSpan={rowSpan}
                          style={hoverStyle(index, 'center')}
                        >
                          {order.user.userName}
                        </td>
                      )}
                      <td
                        style={{
                          ...hoverStyle(index),
                          ...isNoGoodsStyle,
                        }}
                      >
                        {`${goods.isNoGoods ? '(缺貨) ' : ''}${goods.name}${
                          goods.appendTermText !== ''
                            ? `(${goods.appendTermText})`
                            : ''
                        } * ${goods.number}份`}
                      </td>
                      <td
                        style={{
                          ...hoverStyle(index),
                          ...isNoGoodsStyle,
                        }}
                      >
                        {goods.totalMoney}
                      </td>
                      <td
                        style={{
                          ...hoverStyle(index),
                          ...isNoGoodsStyle,
                        }}
                      >
                        {goods.note}
                      </td>
                      {i === 0 && (
                        <td
                          rowSpan={rowSpan}
                          style={hoverStyle(index, 'center')}
                        >
                          {Math.max(order.totalMoney - order.appendMoney, 0)}
                        </td>
                      )}
                      {i === 0 && (
                        <td
                          rowSpan={rowSpan}
                          style={hoverStyle(index, 'center')}
                        >
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <FormControl
                              disabled={saveDisabled}
                              type="number"
                              min={0}
                              value={order.payMoney.toString()}
                              onChange={(e) => {
                                onChange.payMoney(order, e.target.value);
                              }}
                              style={{ marginRight: '10px', width: '100px' }}
                            />
                            <FormCheck
                              id={`payMoney-${order.uid}`}
                              label={'已繳'}
                              disabled={saveDisabled}
                              checked={order.payMoney >= order.totalMoney}
                              onChange={(e) => {
                                onChange.isPay(order, e.target.checked);
                              }}
                            />
                          </div>
                        </td>
                      )}
                      {i === 0 && (
                        <td
                          rowSpan={rowSpan}
                          style={hoverStyle(index, 'center')}
                        >
                          <Form.Check
                            disabled={saveDisabled}
                            checked={order.receipt !== ReceiptType['未到貨']}
                            onChange={(e) => {
                              onChange.receipt(order, e.target.checked);
                            }}
                          />
                        </td>
                      )}
                      <td style={hoverStyle(index, 'center')}>
                        <OverlayTrigger
                          overlay={
                            <Popover id={`isNoGoods-${index}-${i}`}>
                              <Popover.Header
                                as="h5"
                                style={{ fontSize: '15px' }}
                              >{`${
                                goods.isNoGoods ? '恢復' : '設定'
                              }刪除`}</Popover.Header>
                              <Popover.Body>
                                <p style={{ marginBottom: '3px' }}>{`是否要${
                                  goods.isNoGoods ? '恢復' : '設定為'
                                }刪除狀態？`}</p>
                                {!goods.isNoGoods && (
                                  <p
                                    style={{ marginBottom: '5px' }}
                                  >{`商品刪除狀態下將標示為: (缺貨)，且將不會算入統計數量與統計金額中。`}</p>
                                )}
                                <div
                                  style={{
                                    fontSize: '14px',
                                    lineHeight: '15px',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                  }}
                                >
                                  <Button onClick={() => document.body.click()}>
                                    取消
                                  </Button>
                                  <Button
                                    disabled={saveDisabled}
                                    onClick={() => {
                                      onChange.isNoGoods(order, goods);
                                      document.body.click();
                                    }}
                                    variant="danger"
                                  >
                                    確定
                                  </Button>
                                </div>
                              </Popover.Body>
                            </Popover>
                          }
                          trigger="click"
                          rootClose={true}
                          placement="bottom-end"
                        >
                          <IconButton
                            disabled={saveDisabled}
                            icon={goods.isNoGoods ? faTrashCanArrowUp : faTrash}
                            style={{ color: goods.isNoGoods ? 'red' : '' }}
                          />
                        </OverlayTrigger>
                      </td>
                    </tr>
                  );
                })}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  );
}
