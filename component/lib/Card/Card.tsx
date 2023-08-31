import { THEME } from '@/styles/theme';
import { CSSProperties } from 'react';

interface ListCardProps {
  children: JSX.Element;
  style?: CSSProperties;
}
export function ListCard(props: ListCardProps) {
  const style: CSSProperties = {
    display: 'flex',
    width: '100%',
    border: THEME.border,
    borderRadius: '15px',
    padding: '30px',
    position: 'relative',
    justifyContent: 'space-between',
    margin: '20px 0px',
    ...props.style,
  };

  return <div style={style}>{props.children}</div>;
}
