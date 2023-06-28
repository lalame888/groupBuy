import { THEME } from "@/styles/theme";
import Link from "next/link";
import React, { CSSProperties, useRef } from "react"
import { Button } from "react-bootstrap";
import styled from 'styled-components';

interface HoverButtonProps {
    to?: string;
    theme?:  'green' 
    size?: 'long'
    style?: CSSProperties;
    onClick?(event: React.MouseEvent): void;
    children?: JSX.Element | string
    disabled?: boolean
}
type HoverThemeType = CSSProperties & {hover: CSSProperties}
type ThemeType = {
    green: HoverThemeType
}
export function MyHoverButton(props: HoverButtonProps): JSX.Element {
    const ref= useRef<HTMLAnchorElement>(null);
    const themes:ThemeType = {
        green: {
            
            backgroundColor: THEME.lightGreenColor,
            borderColor:'#489A81',
            hover:{
                backgroundColor: '#7acac5ad'
            }
        }
    }
    const defaultTheme: HoverThemeType = {
        borderColor: '',
        backgroundColor: 'white',
        hover: {
            backgroundColor: THEME.lightGreenColor
        }
    }
    const theme =(props.theme) ? themes[props.theme] :defaultTheme
    const HoverButton = styled(Button)`
        word-break: keep-all;
        user-select: none;        
        display: flex;
        font-size: 16px;
        border-radius: 25px;
        color: black;
        padding: 6px ${(props.size === 'long'? '40px': '20px')};
        border: 1px solid ${theme.borderColor};
        background-color: ${theme.backgroundColor};
        align-items: center;

        &:hover{
            border: 1px solid ${theme.borderColor};
            background-color:${props.disabled ? '': theme.hover.backgroundColor};
            cursor: ${props.disabled ?'': 'pointer'};
            color: black;
        }
    `
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
                 variant="light"
                {...props}
                
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
