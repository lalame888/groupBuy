
import { useMemo } from "react"
import { OrderListViewProps } from "./OrderListView";
import { UserOrder } from "@/interface";


export function GoodsViewTable(props: OrderListViewProps){
    
    // 根據品項歸類顯示
    const goodsList = useMemo(()=>{
        // 先把一樣的東西搜集起來
        const map: {[goodsName: string]: {name: string,list: {[name: string]: {appendText: string, number: number, noteList: Array<string>}}}}={};
        props.orderList.forEach((userOrder: UserOrder)=>{
            userOrder.orderList.forEach((goods)=>{
                if (map[goods.name] === undefined) {
                    map[goods.name] = {list: {},name: goods.name}
                }
                if (map[goods.name].list[goods.appendTermText] === undefined) {
                    map[goods.name].list[goods.appendTermText] = {appendText: goods.appendTermText, noteList:[],number: 0};
                }

                map[goods.name].list[goods.appendTermText].number+=goods.number; 
                if (goods.note!== '') {
                    map[goods.name].list[goods.appendTermText].noteList.push(
                        `${userOrder.user.userName}: ${goods.note} (${goods.number}份)`
                    )
                }
            })
            
            
        })
        return Object.values(map)
    },[props.orderList])
    const goodsMoney: number = useMemo(()=>{
        return props.orderList.map((order)=> order.totalMoney - order.appendMoney).reduce((a,b)=> a+b)
    },[props.orderList])
    const appendMoney: number= useMemo(()=>{
        return props.orderList.map((order)=> order.appendMoney).reduce((a,b)=> a+b)
    },[props.orderList])

    return(
        <>
            <thead>
                <tr><td colSpan={4} style={{textAlign: 'center'}}><h5>{props.groupName}</h5></td></tr>

                <tr>
                    <td>品項</td>
                    <td>特製</td>
                    <td>數量</td>
                    <td>備註</td>
                </tr>
            </thead>
            <tbody>
                {goodsList.map((goods,index)=>{
                    const list:Array<{
                        appendText: string;
                        number: number;
                        noteList: Array<string>;
                    }> = Object.values(goods.list);
                    return(
                        <>
                        {list.map((term,i)=>
                            <tr key={`${index}-${i}`} >
                                {(i===0) && <td rowSpan={list.length}>{goods.name}</td>}
                                <td>{term.appendText}</td>
                            <td>{term.number}</td>
                            <td>{term.noteList.map((note,key)=>
                                <p key={key} style={{marginBottom:'5px'}}>{note}</p>
                            )}</td>
                        </tr>
                        )}
                        </>
                    )
                }
                )}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4}>
                        <h4>商品金額總計 {goodsMoney}元
                        {(appendMoney>0)?`，額外金額 ${appendMoney} 元，合計${goodsMoney+appendMoney}元`:''}
                        </h4>
                    </td>
                    
                </tr>
                
            </tfoot>
       </> 
            
            
    )
}