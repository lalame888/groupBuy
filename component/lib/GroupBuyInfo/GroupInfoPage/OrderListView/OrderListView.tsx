import { UserOrder } from "@/interface";
import { THEME } from "@/styles/theme";
import { getKeyByValue } from "@/utils";
import { useState } from "react"
import { Alert, Button, Form, OverlayTrigger, Popover, Table } from "react-bootstrap";
import { UserOverViewTable } from "./UserOverViewTable";
import { GoodsViewTable } from "./GoodsViewTable";
import { UserViewTable } from "./UserViewTable";
import { ExportPdfButton } from "@/component/lib/Button";

enum TableViewType {
    '使用者總覽清單'='UserOverViewTable',
    '使用者訂購清單'='UserOrderTable',
    '訂購品項清單' = 'GoodsViewTable',
}


//TODO 先不要excel 因為有合併儲存格的計算問題 太花時間了
export interface OrderListViewProps {
    groupName: string
    orderList: Array<UserOrder>
    updatePayState(updateList: Array<UserOrder>): void // TODO: 更動付款狀態
}
export function OrderListView(props: OrderListViewProps){
    const [tableType, setTableType] = useState<TableViewType>(TableViewType['使用者總覽清單'])
    const tableId = 'ViewTable'
    return(
       
        <div style={{marginTop: '30px',marginBottom: '60px'}}> 
            <p style={{fontSize:'18px',display: 'flex', alignItems: 'center',justifyContent: 'space-between'}}>
                
                <span>所有人的團單</span>
                {
                    (props.orderList.length>0) &&  
                    <span style={{marginLeft: '20px',display: 'flex',wordBreak: 'keep-all',alignItems:'center',fontSize: '1rem'}}>
                        <OverlayTrigger 
                            trigger="click" 
                            placement="top" 
                            overlay={
                                <Popover id={'exportFile'}>
                                    <Popover.Header as="h5" style={{fontSize:'15px'}}>匯出&下載表格</Popover.Header>
                                    <Popover.Body style={{display: 'flex', flexDirection: 'column'}}>
                                        <ExportPdfButton tableId={tableId} saveName={`${props.groupName}-${getKeyByValue(TableViewType,tableType)}`}/>
                                        <Button variant="success" style={{marginTop: '10px', display: 'none'}}>下載EXCEL</Button>
                                    </Popover.Body>
                                </Popover>
                            }
                            rootClose={true}
		                >
                            <Button 
                                variant="light"
                                style={{marginRight: '10px', border: '1px solid gray'}}
                            >
                                下載
                            </Button>
				
			    
		                </OverlayTrigger>

                        <span>表格顯示：</span>
                        <Form.Select
                            style={{marginLeft: '10px',width: 'auto'}}
                            onChange={(e)=>{
                                const value = e.target.value as TableViewType;
                                setTableType(value);
                            }}
                            value={tableType}
                        >
                            <option value={TableViewType['使用者總覽清單']}>使用者總覽清單</option>
                            <option value={TableViewType['使用者訂購清單']}>使用者訂購清單</option>
                            <option value={TableViewType['訂購品項清單']}>訂購品項清單</option>

                        </Form.Select>
                    </span>
                    
                }
            </p>
            {
                // TODO: 要有按鈕讓開團人去編輯、修改、刪除別人的團單
                // 開團人可以設定是不是已經繳錢、繳了多少錢、是不是已經取貨
                // 要可以下載匯出檔案可是又想統一點
            }
            {(props.orderList.length ===0) ?
                <Alert style={{backgroundColor: THEME.lightGreenColor,color:'black'}}>尚無人跟單</Alert> :
                <Table hover bordered id={tableId}>
                    <>
                        {
                            (tableType === TableViewType['使用者總覽清單'])&& <UserOverViewTable {...props}/>
                        }
                        {
                            (tableType === TableViewType['訂購品項清單']) && <GoodsViewTable {...props}/>
                        }
                        {
                            (tableType === TableViewType['使用者訂購清單']) && <UserViewTable {...props} />
                        }
                    </>
                </Table>
            }
        </div>
    )
}