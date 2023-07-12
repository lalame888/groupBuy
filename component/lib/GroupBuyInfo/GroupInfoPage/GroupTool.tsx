
import { Confirm, IconButton, MyHoverButton, ShareGroupButton } from "@/component";
import { GroupBuyStatus } from "@/interface";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { CSSProperties, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import moduleStyles from './styles.module.css';

/**
   * isOwner 是不是擁有者
   * status 團單狀態
   * endTime 設定的完成時間
   * 
   * 1. 截止團單、提前截止（是擁有者  && 狀態為 開放跟團中）
   * 狀態改為結單
   * 沒有設定完成時間? (截止團單) : (提前截止團單)
   * 
   * 2. 完成團單 （是擁有者 && 狀態為 結單收貨中）
   * 狀態改為完成
   * 
   * 3. 分享按鈕
   * 
   * 4. 工具列 （是擁有者）
   *    a. 修改團單資訊(當開團中)
   *    b. 刪除團單
   *    c. 恢復開放跟團(當已結單，可以重設截止時間，或是不設置時間)
   * 
   * ＝＝＝＝＝＝
   * TODO: 修改團單資訊，如果有更換店家的話，會警告他會清除所有訂單 (或有效=false)
   * 更換店家限定開放跟團的時候，結單就不能更換店家了，只能取消重新開團或改成開放再更換
   * 但要考慮付款問題，設為已付款的，被改成清除或無效的話，要再讓開團人去做金額的處理
   * TODO: 設置「是否先付款後正式成立訂單」機制？ 
   * TODO: 設置收貨方式設定？ 純面交 or 讓下單人選擇寄送方式 (如果需要選擇的話，可以選擇面交or地址or便利商店店家 (串api？ or 文字))
   * TODO: 開團人可以設為無效訂單 => 可能訂單資訊有問題、沒有付錢等等等，開團人手動處理
   * TODO: 缺貨設定？訂購後才發現某種東西缺貨或漲價，也設定為無效？同意之後可以改回有效
   * 
   * TODO: 開團人修改團單資訊之後，所有跟團的人都會收到訊息通知
   *    ex: 由於開團者更換店家，原先訂單已取消，請重新新增訂單 等
   * TODO: 新增訊息與通知頁面，開團的人可以TO ALL 下單人對話or 私訊對話？
   * 
   * TODO: 系統彈跳公告，可以選擇不再顯示，資訊存到資料庫內
   * 告訴大家這個不是一個線上購物網站，只是方便要揪團購、公司幫忙訂午餐的、要幫忙訂飲料等
   * 不處理金流、付款問題，沒有付款記錄和保證非詐騙等等
*/

interface GroupToolProps  {
    isOwner: boolean,
    isEditAble: boolean, // 開放跟團中
    endTime: Date | undefined
    changeStatus(newStatus: GroupBuyStatus): void
    toEditGroup(): void
    loadingLock: boolean
}
export function GroupTool(props: GroupToolProps){
    const deleteGroupRef = useRef<HTMLButtonElement>(null);
    const openGroupEditRef = useRef<HTMLButtonElement>(null);

    const buttonStyle: CSSProperties = {
        marginRight: '20px',marginLeft: '5px'
    }
    const toggleStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center'
    }
    function changeStatus(newStatus:GroupBuyStatus ){
        if (!props.loadingLock) props.changeStatus(newStatus)
    }
    return (
        <div style={{display:'flex',alignItems: 'center'}}>
            <ShareGroupButton/>
            {(props.isOwner) &&
                <>
                { (props.isEditAble) &&
                    <Confirm 
                        disabled={props.loadingLock}
                        onConfirm={()=>{changeStatus(GroupBuyStatus['結單中'])}}
                        title={'結算團單'}
                        text={`確定要${props.endTime ? '提前':''}結算此份團單嗎？\n
                        團單將會轉為「結單中」狀態，其他人將無法新增訂單與編輯訂單。`}
                    >
                        <MyHoverButton
                            style={buttonStyle}
                            disabled={props.loadingLock}
                        >結算團單</MyHoverButton>
                    </Confirm>
                }
                { (!props.isEditAble) &&
                    <Confirm
                        disabled={props.loadingLock}
                        title="完成團單"
                        text={"確定完成此份團單嗎？\n團單將會轉為完成狀態。"}
                        onConfirm={()=>{changeStatus(GroupBuyStatus['已完成'])}}
                    >
                        <MyHoverButton style={buttonStyle} disabled={props.loadingLock}>完成團單</MyHoverButton>
                    </Confirm>
                }
                 <Dropdown style={toggleStyle} >
                    <Dropdown.Toggle as="span"  className={moduleStyles['custom-toggle']}>
                        <IconButton icon={faEllipsisV} style={{fontSize: '20px'}}  disabled={props.loadingLock} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{fontSize: '16px'}}>
                        { (props.isEditAble)&&
                            <Dropdown.Item onClick={props.toEditGroup}  disabled={props.loadingLock}>
                                修改團單設定
                            </Dropdown.Item>
                        }
                        { (!props.isEditAble)&&
                            <Dropdown.Item onClick={()=>{changeStatus(GroupBuyStatus['開放跟團中'])}}>
                                恢復開放跟團
                            </Dropdown.Item>
                        }
                        <Dropdown.Item 
                            disabled={props.loadingLock}
                            onClick={()=> {
                                if (deleteGroupRef?.current) {
                                    deleteGroupRef.current.click();
                                }    
                            }}
                        >
                            刪除團單
                        </Dropdown.Item>
                    </Dropdown.Menu>
                 </Dropdown>
                    
                    <div style={{display: 'none'}}>
                        {
                            // 必須另外用ref是因為如果Confirm綁在popover上，點下去之後整個原按鈕會消失=> 沒有render 
                        }
                        <Confirm 
                            disabled={props.loadingLock}
                            onConfirm={()=>{changeStatus(GroupBuyStatus['已取消團單'])}}
                            title={'刪除團單'}
                            text={'確定要作廢此份團單嗎？\n團單將會轉為取消狀態。'}
                            confirmType="delete"
                            ref={deleteGroupRef}
                        >
                            <span></span>
                        </Confirm>
                        <Confirm
                            disabled={props.loadingLock} 
                            onConfirm={()=>{changeStatus(GroupBuyStatus['開放跟團中'])}}
                            title={'重新開放跟團'}
                            text={`確定要重新開放跟團嗎？\n
                             團單將會轉為「開放跟團中」狀態，其他人將可以新增訂單與編輯訂單。`}
                            ref={openGroupEditRef}
                        >
                            <span></span>
                        </Confirm>
                        
                    </div>
                </>
            }
        </div>
    )
}
