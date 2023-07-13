import { GoodsData, InfoPage, UserOrder } from "@/interface";
import { GroupPageProps, useEditOrder } from "../utils";
import { PageTitle } from "../../Other";
import { GroupInfoDiv } from "../GroupInfoPage/GroupInfoDiv";
import { MenuCanvas } from "../../Image/MenuCanvas";
import { BackButton, Confirm, MyHoverButton } from "../../Button";
import { CSSProperties, useEffect } from "react";
import { EditGoodsCard } from "./EditGoodsCard";

interface EditOrderProps extends GroupPageProps {
    myOrder: UserOrder | undefined
    saveOrder(newOrder: UserOrder): void
}
export function EditOrder(props: EditOrderProps){
    const {
        groupName,
        store,
        builder,
        statusText,
        endTimeString,
        joinListCount,
        setting
    } = props.groupBuyObject
    if (!props.userInfo || !store) return null; // 如果userInfo 或 store不存在不該在這個頁面

    const {
        myOrder,orderNote, setOrderNode,
        editGoods,deleteGoods,
        addBlankGoods
    } = useEditOrder(props.myOrder,props.userInfo.userData);

    function saveOrder(order: UserOrder, orderNote: string) {
        if (!props.loadingLock) {
            const newOrder = order.clone();
            newOrder.orderNote = orderNote;
            props.saveOrder(newOrder);
        }
    }
    const sideBarStyle: CSSProperties = {
        position: 'fixed', 
        right: '0px',
        top: '50px',
        height: 'calc(100vh - 50px)',
        width:'350px', 
        border: '3px solid #489A81',
        backgroundColor: 'white'
    }

   

    return(
        <div style={{
            width: 'calc(100% - 950px + 50vw)',
            minWidth: '350px'
        }}>
            <Confirm
                onConfirm={()=> props.setPageName(InfoPage['資訊頁'])}
                text="確認要返回嗎?將會捨棄目前的資料"
                title="確認要返回嗎?"
            >
                <BackButton noRouter/>
            </Confirm>
            <PageTitle title={`${groupName} - 訂單編輯`}/>
            <GroupInfoDiv 
                store={store}
                builder={builder}
                statusText={statusText}
                endTimeString={endTimeString}
                joinListCount={joinListCount}
                hideMenu={true}
            />
            {
                (store.menuImage && store.menuImage.length>0) &&
                <MenuCanvas menuImage={store.menuImage} style={{marginBottom: '60px'}}/>
            }
            <div style={sideBarStyle}>
                <div style={{backgroundColor: '#489A81',display: 'flex', justifyContent: 'center', color: 'white',height: '40px',fontSize: '20px',alignItems: 'center'}}>
                    <span style={{letterSpacing: '30px',marginLeft: '30px'}}>訂單內容</span>
                </div>
                <div style={{padding: '30px 20px'}}>
                    <div style={{height: 'calc(100vh - 500px)', boxShadow: 'inset 0px 0px 3px 1px #80808042',overflow: 'auto'}}>
                        {myOrder.orderList.map((goods,index)=>{
                            return(
                                <EditGoodsCard
                                    setting={setting}
                                    menu={store.menuData || []}
                                    goods={goods}
                                    key={`${goods.uid}-${index}}`}
                                    editGoods={(newGoods: GoodsData)=>{editGoods(newGoods,index)}}
                                    delete={()=>{deleteGoods(index)}}
                                />
                            )
                        })}
                    </div>

                    <MyHoverButton
                        theme="lightgray"
                        style={{marginTop: '30px', height: '50px',fontSize: '18px', letterSpacing: '10px'}}
                        onClick={ addBlankGoods}
                    >
                        + 新增項目
                    </MyHoverButton>

                    <div style={{marginTop: '30px'}}>
                        {
                            setting.addNote && 
                            <>
                                <div style={{marginBottom: '5px', fontSize: '16px'}}>訂單備註</div>
                                <textarea
                                    placeholder={"（可選填)"}
                                    style={{width: '100%', height: '70px',resize: 'none'}} 
                                    value={orderNote}
                                    onChange={(event)=>{setOrderNode(event.target.value)}}
                                />
                            </>
                        }
                        
                        {
                            (myOrder.appendMoney>0) &&
                            <div>額外費用：{myOrder.appendMoney} 元</div>
                        }
                        <div style={{fontSize: '26px', display: 'flex', justifyContent: 'end'}}>
                            總金額：{myOrder.totalMoney} 元</div>
                        <MyHoverButton
                            theme="green"
                            disabled={props.loadingLock}
                            style={{marginTop: '10px'}}
                            onClick={()=>{ saveOrder(myOrder, orderNote)}}
                        >
                            確定儲存
                        </MyHoverButton>
                    </div>
                </div>
            </div>
        </div>
    )
}