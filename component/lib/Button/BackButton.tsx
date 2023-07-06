import { CSSProperties } from "react"
import { MyHoverButton } from "./HoverButton"
import { useRouter } from "next/router"

interface BackButtonProps {
    style?: CSSProperties
    buttonStyle?: CSSProperties
}

export function BackButton(props: BackButtonProps){
    const router = useRouter();
    return (
        <div style={{display: 'flex',marginBottom: '20px',...props.style}}>
            <MyHoverButton  
                style={props.buttonStyle}        
                onClick={()=> router.back()}
                theme="green"
            >
                回上頁
            </MyHoverButton>
        </div>
    )
}