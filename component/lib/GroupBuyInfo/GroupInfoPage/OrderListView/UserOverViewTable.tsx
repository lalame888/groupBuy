
import { UserOrder } from "@/interface";
import { OrderListViewProps } from "./OrderListView";


export function UserOverViewTable(props: OrderListViewProps){
        //TODO 還要可以勾選是不是已經繳錢
    return(
        <>
            <thead>
                <tr><td colSpan={3} style={{textAlign: 'center'}}><h5>{props.groupName}</h5></td></tr>
                <tr>
                    <td>訂購人</td>
                    <td>金額</td>
                    <td>項目</td>
                </tr>
            </thead>
            <tbody>
                {props.orderList.map((order: UserOrder)=>
                    <tr key={order.uid}>
                        <td>{order.user.userName}</td>
                        <td>{order.totalMoney}</td>
                        <td>{order.orderContainText}</td>
                    </tr>
                )}
            </tbody>
        </>
    )
}