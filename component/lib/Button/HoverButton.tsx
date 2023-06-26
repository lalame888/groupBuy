import { THEME } from "@/styles/theme";
import Link from "next/link";
import React, { CSSProperties, useRef, useState } from "react"

interface HoverButtonProps {
    to?: string;
    theme?:  'green' 
    style?: CSSProperties;
    onClick?(event: React.MouseEvent): void;
    hoverStyle?: CSSProperties;
    children?: JSX.Element | string
    disabled?: boolean
}

export function HoverButton(props:HoverButtonProps): JSX.Element {
    const [isHover, setIsHover] = useState<boolean>(false);
    const changeStyle = (isHover && props.hoverStyle)? {...props.style,...props.hoverStyle} : {...props.style};
    const disableStyle: CSSProperties | undefined =(props.disabled) ? {
        color: '#7a7a7a',
        cursor: 'auto',
        backgroundColor: '#f5f5f5'
    } : undefined
    const style: CSSProperties = {
        wordBreak: 'keep-all',
        userSelect: 'none',
        padding: '5px 15px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        ...changeStyle,
        ...disableStyle
    }
    
    return (
        <span
            style={style}
            onMouseOver={()=>{setIsHover(true && !props.disabled);}}
            onMouseOut={()=>{setIsHover(false )}}
            onClick={props.onClick}
        >
            {props.children}
        </span>
    )
}


export function MyHoverButton(props: HoverButtonProps): JSX.Element {
    const ref= useRef<HTMLAnchorElement>(null);
    type ThemeButtonStyle = {
        buttonStyle: CSSProperties,
        buttonHoverStyle: CSSProperties
    }
    const themeStyle: ThemeButtonStyle = (props.theme === 'green') ? {
        buttonStyle:{
            backgroundColor: THEME.lightGreenColor,
            padding:'6px 20px',
            borderColor:'#489A81'
        },
        buttonHoverStyle:{
            backgroundColor: '#7acac5ad'
        }
    } : {
        buttonStyle:{},
        buttonHoverStyle:{
            backgroundColor: THEME.lightGreenColor
        }
    }
    const buttonStyle: CSSProperties = {
        border: '1px solid',
        fontSize: '17px',
        padding: '5px 40px',
        borderRadius: '30px',

        ...themeStyle.buttonStyle,
        ...props.style
    }
    const buttonHoverStyle: CSSProperties = {
        ...themeStyle.buttonHoverStyle,
        ...props.hoverStyle
    }
    function onClick(event: React.MouseEvent<Element, MouseEvent>){
        if (props.to && ref?.current) {
            ref.current.click();
        }
        if (props.onClick) {
            props.onClick(event);
        }
    }
    return (
        <>
            <HoverButton 
                {...props}
                style={buttonStyle} 
                hoverStyle={buttonHoverStyle}
                onClick={onClick}
            >
                {props.children}
            </HoverButton>
            <Link
                style={{display: 'none'}}
                href={props.to || ''}
                ref={ref}
            />
        </>
    )

}
