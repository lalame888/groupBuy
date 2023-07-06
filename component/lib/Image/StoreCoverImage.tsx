
import { NO_IMAGE } from "@/data"
import { StoreData } from "@/interface"
import { CSSProperties} from "react"

interface StoreCoverImageProps {
    store: StoreData | undefined
    width?: string
}
export function StoreCoverImage(props: StoreCoverImageProps){
    const imageDivStyle: CSSProperties = {
        maxWidth: props.width || '130px',
        margin: 'auto',
        display: 'inline-flex',
        paddingBottom: '16px'
    }
    const imageStyle: CSSProperties = {
        minWidth: props.width || '130px'
    }
    return(   
        <div style={imageDivStyle}>
            <img
                style={imageStyle}
                src={ props.store?.storeImage || NO_IMAGE.src }
                alt={props.store?.name || '未選擇店家'}
            />
        </div>  
    )
}