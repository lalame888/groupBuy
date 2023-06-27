import { THEME } from "@/styles/theme";
import Link from "next/link";
import React, { CSSProperties, useRef, useState } from "react"
import { Button } from "react-bootstrap";
import styled from 'styled-components';

interface HoverButtonProps {
    to?: string;
    theme?:  'green' 
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
            padding:'6px 20px',
            borderColor:'#489A81',
            hover:{
                backgroundColor: '#7acac5ad'
            }
        }
    }
    const defaultTheme: HoverThemeType = {
        
        borderColor: '',
        padding: '6px 40px',
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
        padding:${theme.padding};
        border: 1px solid ${theme.borderColor};
        background-color: ${theme.backgroundColor};
        
        &:hover{
            background-color:${props.disabled ? '': theme.hover.backgroundColor};
            cursor: ${props.disabled ?'': 'pointer'};
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
