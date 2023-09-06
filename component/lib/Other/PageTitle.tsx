import { THEME } from '@/styles/theme';
import { CSSProperties } from 'react';

interface PageTitleProps {
  title: string;
  children?: JSX.Element;
  style?: CSSProperties;
}
export function PageTitle(props: PageTitleProps) {
  const style: CSSProperties = {
    borderBottom: THEME.border,
    borderBottomWidth: '3px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '10px',
    marginBottom: '20px',
    ...props.style,
  };
  return (
    <div style={style}>
      <h4 style={{ margin: '0px' }}>{props.title}</h4>
      {props.children}
    </div>
  );
}
