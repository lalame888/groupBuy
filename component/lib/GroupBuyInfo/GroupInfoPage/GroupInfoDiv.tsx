import { StoreData, UserData } from "@/interface";
import { CSSProperties } from "react";
import { StoreCoverImage, StoreMenuImage } from "../../Image";

interface GroupInfoDivProps {
    store: StoreData | undefined
    builder: UserData
    statusText: string
    endTimeString: string
    joinListLength: number
    hideMenu?: boolean
}

export function GroupInfoDiv(props: GroupInfoDivProps){
    const style: CSSProperties = {
        padding: '10px',
        display:'flex',
        justifyContent: 'space-between'
    }
    const infoStyle: CSSProperties = {
        marginLeft: '20px',
        lineHeight: '16px',
        padding: '5px',
        fontSize: '18px'
    }

    return(   
        <div style={style}>
            <div style={{display: 'flex'}}>
                <StoreCoverImage store={props.store}/>
                <div style={infoStyle}>
                    <p>店家名稱：{props.store?.name  || '無店家資訊'}</p>
                    <p>店家電話：{props.store?.phone  || '無電話資訊'}</p>
                    <p>開團人：{props.builder.userName}</p>
                    <p>目前參團人數：{props.joinListLength} 人</p>
                    <p>團單狀態：{props.statusText}</p>
                    <p>{props.endTimeString}</p>

                </div>
            </div>
            { (!props.hideMenu && props.store && props.store.menuImage && props.store.menuImage.length>0) &&
                <StoreMenuImage store={props.store}/>
            }
        </div>
    )
}