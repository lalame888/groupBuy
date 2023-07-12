import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, forwardRef } from "react";

interface IconButtonProps {
    icon: IconProp
    style?: CSSProperties
    onClick?(): void
    disabled?: boolean
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (props, ref) => {
    const style: CSSProperties = {
        backgroundColor: 'transparent',border: 'none', padding: '5px',fontSize:'15px',
        ...props.style
    }
    return (
        <button ref={ref} style={style} onClick={props.onClick} disabled={props.disabled}>
            <FontAwesomeIcon icon={props.icon}/>
        </button>
    )

})