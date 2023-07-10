
import { NO_IMAGE } from "@/data"
import { StoreObject } from "@/interface"
import { CSSProperties} from "react"

interface StoreCoverImageProps {
    store: StoreObject | undefined
    width?: string
}
export function StoreCoverImage(props: StoreCoverImageProps){
    const imageDivStyle: CSSProperties = {
        maxWidth: props.width || '130px',
        height: 'fit-content',
        margin: 'auto',
        display: 'inline-flex',
    }
    const imageStyle: CSSProperties = {
        minWidth: props.width || '130px'
    }
    return(   
        <div style={imageDivStyle}>
            <img
                style={imageStyle}
                src={ props.store?.coverImage || NO_IMAGE.src }
                alt={props.store?.name || '未選擇店家'}
            />
        </div>  
    )
}