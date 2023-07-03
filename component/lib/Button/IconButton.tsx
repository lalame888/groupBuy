import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties } from "react";

interface IconButtonProps {
    icon: IconProp
    style?: CSSProperties
    onClick?(): void

}
export function IconButton(props: IconButtonProps){
    const style: CSSProperties = {
        backgroundColor: 'transparent',border: 'none', padding: '5px',fontSize:'15px',marginLeft: '20px',
        ...props.style
    }
    return (
        <button style={style} onClick={props.onClick}>
            <FontAwesomeIcon icon={props.icon}/>
        </button>
    )
}