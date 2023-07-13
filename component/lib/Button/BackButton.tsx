import { CSSProperties } from "react"
import { MyHoverButton } from "./HoverButton"
import { useRouter } from "next/router"

interface BackButtonProps {
    style?: CSSProperties
    buttonStyle?: CSSProperties
    noRouter?: boolean
    onClick?(): void
}

export function BackButton(props: BackButtonProps){
    const router = useRouter();
    function onClick(){
        if (props.onClick) props.onClick();
        if (!props.noRouter) router.back()
    }
    return (
        <div style={{display: 'flex',marginBottom: '20px',...props.style}}>
            <MyHoverButton  
                style={props.buttonStyle}        
                onClick={onClick}
                theme="green"
            >
                回上頁
            </MyHoverButton>
        </div>
    )
}