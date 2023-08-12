
import { GoodsData, ReceiptType, UserOrder } from "@/interface";
import { Button, Col, Form, FormCheck, FormControl, Modal, OverlayTrigger, Popover, Row, Table } from "react-bootstrap";
import { CSSProperties, useEffect, useState } from "react";
import { IconButton, MyHoverButton } from "@/component";
import React from "react";
import { useHoverTable } from "./useHoverTable";
import { faTrash, faTrashCanArrowUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useOwnerEditUserOrders } from "./useOwnerEditUserOrders";

// const StyledIconButton = styled(IconButton)`
//     color: 'gray';
//     &:hover {
//         color: red;
//     }
// `

interface OwnerEditUserOrdersTableProps {
    orderList: Array<UserOrder>
    update(updateList: Array<UserOrder>): Promise<void>
    cancel(): void
}
// TODO: 需考慮到無貨或是漲價的情況

export function OwnerEditUserOrdersTable(props: OwnerEditUserOrdersTableProps){
        //TODO 可以勾選是不是已經繳錢
    const {onMouseEnter,onMouseLeave,hoverStyle} = useHoverTable();
    const {
        orderList,saveDisabled,onSave, onChange
    } = useOwnerEditUserOrders(props.orderList, props.update)
    // TODO: 使用者編輯自己的清單&清單顯示，要看得到被團主選缺貨的標示 &可以再另外編輯
    return(
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px',
            }}>
                <MyHoverButton
                    onClick={()=> props.cancel()}
                    disabled={saveDisabled}
                    style={{marginRight: '10px'}}
                >
                    取消修改
                </MyHoverButton>
                <MyHoverButton theme="green"
                    onClick={onSave}
                    disabled={saveDisabled}
                >
                    儲存編輯
                </MyHoverButton>
            </div>
            <Table bordered style={{wordBreak: 'keep-all'}}>
                <thead>
                    <tr><td colSpan={8} style={{textAlign: 'center'}}><h5>修改使用者訂單資訊與狀態</h5></td></tr>
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
                    {orderList.map((order: UserOrder,index)=>
                        <React.Fragment key={`${order.user.loginId}-${index}`}>
                        {   
                            order.orderList.sort((a,b)=>{
                                if (a.isNoGoods) return 1
                                return -1
                            }).map((goods: GoodsData, i: number) => {
                                const isNoGoodsStyle: CSSProperties =(goods.isNoGoods)? {
                                    backgroundColor: 'lightgray',
                                    color: 'gray'
                                }: {}
                                const rowSpan = order.orderList.length;
                                return (
                                    <tr 
                                        key={`${order.uid}-${i}`}
                                        onMouseEnter={()=>onMouseEnter(index)} 
                                        onMouseLeave={()=>onMouseLeave(index)}
                                        style={isNoGoodsStyle}
                                    >
                                        { (i===0) && <td rowSpan={rowSpan} style={hoverStyle(index, 'center')}>{order.user.userName}</td>}                                  
                                        <td style={hoverStyle(index)}>{`${goods.isNoGoods? '(缺貨) ':''}${goods.name}${goods.appendTermText!== '' ?`(${goods.appendTermText})`:''} * ${goods.number}份`}
                                        {(!goods.isNoGoods)&&
                                            <OwnerEditGoodsButton
                                                disabled={saveDisabled}
                                                goods={goods}
                                                update={()=>{
                                                    //
                                                }}
                                            />
                                        }
                                        </td>
                                        <td style={hoverStyle(index)}>{goods.totalMoney}</td>
                                        <td style={hoverStyle(index)}>{goods.note}</td>
                                        {(i===0) && <td rowSpan={rowSpan} style={hoverStyle(index, 'center')}>{ Math.max(order.totalMoney - order.appendMoney, 0 )}</td>}
                                        {(i===0) && <td rowSpan={rowSpan} style={hoverStyle(index, 'center')}>
                                            <div style={{display: 'flex', alignItems: 'center'}}>
                                                <FormControl 
                                                    disabled={saveDisabled}
                                                    type="number"
                                                    min={0}
                                                    value={order.payMoney.toString()}
                                                    onChange={(e)=>{onChange.payMoney(order, e.target.value)}}
                                                    style={{marginRight: '10px', width: '100px'}}
                                                />
                                                <FormCheck
                                                    label={'已繳'}
                                                    disabled={saveDisabled}
                                                    checked={order.payMoney >= order.totalMoney}
                                                    onChange={(e)=>{onChange.isPay(order, e.target.checked)}}
                                                />
                                            </div> 
                                            
                                        </td>}
                                        {(i===0) && <td rowSpan={rowSpan} style={hoverStyle(index, 'center')}>
                                            <Form.Check 
                                                disabled={saveDisabled}
                                                checked={order.receipt !== ReceiptType['未到貨']}
                                                onChange={(e)=>{onChange.receipt(order, e.target.checked)}}    
                                            />
                                        </td>}
                                        <td style={hoverStyle(index, 'center')}>
                                            <OverlayTrigger
                                                overlay={
                                                    <Popover id={`isNoGoods-${index}-${i}`} >
                                                        <Popover.Header as="h5" style={{fontSize:'15px'}}>{`${(goods.isNoGoods? '恢復':'設定')}刪除`}</Popover.Header>
                                                        <Popover.Body >
                                                            <p style={{marginBottom: '3px'}}>{`是否要${(goods.isNoGoods? '恢復':'設定為')}刪除狀態？`}</p>
                                                            { (!goods.isNoGoods) &&
                                                                <p style={{marginBottom: '5px'}}>{`商品刪除狀態下將標示為: (缺貨)，且將不會算入統計數量與統計金額中。`}</p>
                                                            }
                                                            <div style={{fontSize:'14px',lineHeight: '15px', display: 'flex'}}>
                                                                <Button onClick={()=>{document.body.click();}}>取消</Button>
                                                                <Button 
                                                                    disabled={saveDisabled}
                                                                    onChange={()=>{ onChange.isNoGoods(order, goods);}}
                                                                    variant="danger"
                                                                >確定</Button>
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
                                                    icon={(goods.isNoGoods)? faTrashCanArrowUp : faTrash}
                                                />
                                            </OverlayTrigger>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </React.Fragment>
                    )}
                </tbody>
            </Table> 
        </>
    )
}

interface OwnerEditGoodsProps {
    goods: GoodsData,
    update(goods: GoodsData):void
    disabled?: boolean
}
function OwnerEditGoodsButton(props: OwnerEditGoodsProps){
    const [isShow, setIsShow] = useState<boolean>(false);
    const [goods, setGoods] = useState<GoodsData>(props.goods.clone());
    useEffect(()=>{
        setGoods(props.goods.clone())
    },[props.goods])

// TODO: 修改原商品金額，或是特製的金額，但項目不能改
    return (<>
        <MyHoverButton onClick={()=> setIsShow(true)} disabled={props.disabled}>修改</MyHoverButton>
        {(isShow && !props.disabled)&& <Modal size="sm">
                <Modal.Header closeButton >{`修改商品金額: ${goods.name}`}</Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={3} md={2}>名稱：</Col>
                        <Col sm={9} md={4}>{goods.name}</Col>
                        <Col sm={3} md={2}>金額：</Col>
                        <Col sm={9} md={4}>
                            <FormControl 
                                onChange={()=>{}}
                                value={goods.money}
                                
                            />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            
        </Modal>}
    </>)
}