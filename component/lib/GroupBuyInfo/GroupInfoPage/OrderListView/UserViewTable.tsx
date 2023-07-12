
import { CSSProperties } from "react"
import { OrderListViewProps } from "./OrderListView";
import { UserOrder,GoodsData } from "@/interface";

export function UserViewTable(props: OrderListViewProps){
        //TODO 還要可以勾選是不是已經繳錢
    return(
        <>
            <thead>
                <tr><td colSpan={7} style={{textAlign: 'center'}}><h5>{props.groupName}</h5></td></tr>

                <tr>
                    <td>訂購人</td>
                    <td>項目</td>
                    <td>金額</td>
                    <td>備註</td>
                    <td>總金額</td>
                    <td>已繳錢</td>
                    <td>已取</td>
                </tr>
            </thead>
            <tbody>
                {props.orderList.map((order: UserOrder,index)=>
                    <>
                    {   
                        order.orderList.map((goods: GoodsData, i: number)=>{
                            const centerStyle: CSSProperties = {
                                verticalAlign: 'middle',
                                textAlign: 'center'
                            }
                            return (
                                <tr key={`${order.uid}-${i}`}>
                                    { (i===0) && <td rowSpan={order.orderList.length} style={centerStyle}>{order.user.userName}</td>}                                  
                                    <td>{`${goods.name}${goods.appendTermText!== '' ?`(${goods.appendTermText})`:''} * ${goods.number}份`}</td>
                                    <td >{goods.totalMoney}</td>
                                    <td>{goods.note}</td>
                                    {(i===0) && <td rowSpan={order.orderList.length} style={centerStyle}>{order.totalMoney - order.appendMoney}</td>}
                                    {(i===0) && <td rowSpan={order.orderList.length} style={centerStyle}>{(order.payMoney === 0)? '' : (order.totalMoney === order.payMoney)? 'V': `${order.payStatus}`}</td>}
                                    <td></td>
                                </tr>
                            )
                        })
                    }
                    </>
                )}
            </tbody>
        </>  
    )
}