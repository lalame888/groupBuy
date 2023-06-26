
import { MyHoverButton, StoreImage } from "@/component"
import { GroupBuyObject } from "@/interface"
import { THEME } from "@/styles/theme"
import { CSSProperties } from "react"
import { Container } from "react-bootstrap"

interface GroupBuyListCardProps {
    groupBuyObject: GroupBuyObject
    style?: CSSProperties
}

export function GroupBuyListCard(props: GroupBuyListCardProps ){
    const style: CSSProperties = {
        display: 'flex',
        width: '100%',
        border: THEME.border,
        borderRadius: '15px',
        padding: '30px',
        position: 'relative',
        justifyContent: 'space-between',
        margin: '20px 0px',
        ...props.style
    }

    const infoDivStyle: CSSProperties = {
        margin:'0px 30px'
    }
    const titleStyle: CSSProperties = {
        fontSize: '25px',
        marginBottom: '5px'
    }
    const infoStyle: CSSProperties = {
        fontSize: '15px',
        marginBottom: '5px'
    }
    
    const buttonDivStyle: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'

    }
    const buttonStyle: CSSProperties = {
        margin: '8px 0px'
    }
        // TODO 截止之後還要有讓人家更動每個人狀態的(繳錢)
        // TODO 還有匯出團單
   
    // TODO 看要不要跟歷史直接整個分開 這邊好亂
    return(
       
        <div style={style}>
            <div style={{display: 'flex'}}>
                <StoreImage
                    store={props.groupBuyObject.store}
                />
                <div style={infoDivStyle}>
                    <p style={titleStyle}>{props.groupBuyObject.groupName}</p>
                    <p style={infoStyle}>開團人：{props.groupBuyObject.builder.userName}</p>
                    <p style={infoStyle}>參團人數：{props.groupBuyObject.joinListLength}</p>
                    <p style={infoStyle}>團單狀態：{props.groupBuyObject.statusText}</p>
                    <p style={infoStyle}>{props.groupBuyObject.endTimeString}</p>

                </div>
            </div>
            <div style={buttonDivStyle}>
                <MyHoverButton 
                    style={buttonStyle}
                    to={`/openGroup/GroupBuyInfo/info/id=${props.groupBuyObject.uid}`}
                >
                    查看訂單
                </MyHoverButton>

            </div>
        </div>
      
    )
}