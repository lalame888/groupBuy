import { THEME } from '@/styles/theme';
import Link from 'next/link';
import React, { CSSProperties, forwardRef, useRef } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

interface HoverButtonProps {
  to?: string;
  theme?: 'green' | 'lightgray';
  size?: 'long';
  style?: CSSProperties;
  onClick?(event: React.MouseEvent): void;
  children?: JSX.Element | string;
  disabled?: boolean;
}
const HoverButton = styled(Button)`
  word-break: keep-all;
  user-select: none;
  display: flex;
  font-size: 16px;
  border-radius: 25px;
  color: black;
  justify-content: center;
  padding: 6px ${(props) => (props.size === 'long' ? '40px' : '20px')};
  border: ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;

  &:hover {
    border: ${(props) => props.theme.border};
    background-color: ${(props) =>
      props.disabled ? '' : props.theme.hover.backgroundColor};
    cursor: ${(props) => (props.disabled ? '' : 'pointer')};
    color: black;
  }
`;
type HoverThemeType = CSSProperties & { hover: CSSProperties };
type ThemeType = {
  green: HoverThemeType;
  lightgray: HoverThemeType;
};
export const MyHoverButton = forwardRef<HTMLSpanElement, HoverButtonProps>(
  (props) => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const themes: ThemeType = {
      green: {
        backgroundColor: THEME.lightGreenColor,
        border: '1px solid #489A81',
        hover: {
          backgroundColor: '#7acac5ad',
        },
      },
      lightgray: {
        backgroundColor: '#F6F6F6',
        border: '2px dashed gray',
        hover: {
          backgroundColor: 'lightgray',
        },
      },
    };
    const defaultTheme: HoverThemeType = {
      border: '1px solid black',
      backgroundColor: 'white',
      hover: {
        backgroundColor: THEME.lightGreenColor,
      },
    };
    const theme = props.theme ? themes[props.theme] : defaultTheme;

    function onClick(event: React.MouseEvent<Element, MouseEvent>) {
      if (props.to && linkRef?.current) {
        linkRef.current.click();
      }
      if (props.onClick) {
        props.onClick(event);
      }
    }

    return (
      <>
        <HoverButton variant="light" {...props} theme={theme} onClick={onClick}>
          {props.children}
        </HoverButton>
        <Link style={{ display: 'none' }} href={props.to || ''} ref={linkRef} />
      </>
    );
  },
);
