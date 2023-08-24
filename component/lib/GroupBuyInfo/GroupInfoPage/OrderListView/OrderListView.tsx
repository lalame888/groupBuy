import { UserOrder } from '@/interface';
import { THEME } from '@/styles/theme';
import { getKeyByValue } from '@/utils';
import { useState } from 'react';
import { Alert, Button, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { UserOverViewTable } from './UserOverViewTable';
import { GoodsViewTable } from './GoodsViewTable';
import { UserViewTable } from './UserViewTable';
import { ExportPdfButton, MyHoverButton } from '@/component/lib/Button';
import { OwnerEditUserOrdersTable } from './OwnerEditUserOrdersTable';

enum TableViewType {
  '使用者總覽清單' = 'UserOverViewTable',
  '使用者訂購清單' = 'UserOrderTable',
  '訂購品項清單' = 'GoodsViewTable',
}

//TODO 先不要excel 因為有合併儲存格的計算問題 太花時間了
export interface OrderListViewProps {
  isOwner: boolean;
  groupName: string;
  orderList: Array<UserOrder>;
  updatePayState(updateList: Array<UserOrder>): Promise<void>; // TODO: 更動付款狀態
  tableId?: string;
}
export function OrderListView(props: OrderListViewProps) {
  const [tableType, setTableType] = useState<TableViewType>(
    TableViewType['使用者總覽清單'],
  );
  const [isEditPayState, setIsEditPayState] = useState<boolean>(false);
  const tableId = 'ViewTable';

  async function updatePayState(updateList: Array<UserOrder>) {
    try {
      await props.updatePayState(updateList);
      setIsEditPayState(false);
    } catch (error) {
      // TODO: 顯示錯誤訊息
    }
  }
  return (
    <div style={{ marginTop: '30px', marginBottom: '60px' }}>
      <p
        style={{
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontSize: '24px' }}>所有人的團單</span>
        <div style={{ display: 'flex' }}>
          {props.orderList.length > 0 && !isEditPayState && (
            <span
              style={{
                marginLeft: '20px',
                display: 'flex',
                wordBreak: 'keep-all',
                alignItems: 'center',
                fontSize: '1rem',
              }}
            >
              <OverlayTrigger
                trigger="click"
                placement="top"
                overlay={
                  <Popover id={'exportFile'}>
                    <Popover.Header as="h5" style={{ fontSize: '15px' }}>
                      匯出&下載表格
                    </Popover.Header>
                    <Popover.Body
                      style={{ display: 'flex', flexDirection: 'column' }}
                    >
                      <ExportPdfButton
                        tableId={tableId}
                        saveName={`${props.groupName}-${getKeyByValue(
                          TableViewType,
                          tableType,
                        )}`}
                      />
                      <Button
                        variant="success"
                        style={{ marginTop: '10px', display: 'none' }}
                      >
                        下載EXCEL
                      </Button>
                    </Popover.Body>
                  </Popover>
                }
                rootClose={true}
              >
                <Button
                  variant="light"
                  style={{ marginRight: '10px', border: '1px solid gray' }}
                >
                  下載
                </Button>
              </OverlayTrigger>

              <span>表格顯示：</span>
              <Form.Select
                style={{ marginLeft: '10px', width: 'auto' }}
                onChange={(e) => {
                  const value = e.target.value as TableViewType;
                  setTableType(value);
                }}
                value={tableType}
              >
                <option value={TableViewType['使用者總覽清單']}>
                  使用者總覽清單
                </option>
                <option value={TableViewType['使用者訂購清單']}>
                  使用者訂購清單
                </option>
                <option value={TableViewType['訂購品項清單']}>
                  訂購品項清單
                </option>
              </Form.Select>
            </span>
          )}
          {props.isOwner && !isEditPayState && (
            <MyHoverButton
              onClick={() => setIsEditPayState(true)}
              style={{ marginLeft: '5px' }}
            >
              編輯付款與收貨狀態
            </MyHoverButton>
          )}
        </div>
      </p>
      {
        // TODO: 要有按鈕讓開團人去編輯、修改、刪除別人的團單
        // 開團人可以設定是不是已經繳錢、繳了多少錢、是不是已經取貨
        // 要可以下載匯出檔案可是又想統一點
      }
      {props.orderList.length === 0 ? (
        <Alert
          style={{ backgroundColor: THEME.lightGreenColor, color: 'black' }}
        >
          尚無人跟單
        </Alert>
      ) : (
        <>
          {isEditPayState ? (
            <OwnerEditUserOrdersTable
              update={updatePayState}
              orderList={props.orderList}
              cancel={() => setIsEditPayState(false)}
            />
          ) : tableType === TableViewType['使用者總覽清單'] ? (
            <UserOverViewTable {...props} tableId={tableId} />
          ) : tableType === TableViewType['訂購品項清單'] ? (
            <GoodsViewTable {...props} tableId={tableId} />
          ) : tableType === TableViewType['使用者訂購清單'] ? (
            <UserViewTable {...props} tableId={tableId} />
          ) : null}
        </>
      )}
    </div>
  );
}
