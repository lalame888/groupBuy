import { CSSProperties } from 'react';
import { HoverButtonProps, MyHoverButton } from './HoverButton';
import { THEME } from '@/styles/theme';

interface NoDataButtonProps {
  text: Array<string>;
}
export function NoDataButton(props: HoverButtonProps & NoDataButtonProps) {
  const centerRowStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
  };
  return (
    <div style={centerRowStyle}>
      <MyHoverButton
        style={{
          border: THEME.border,
          backgroundColor: '#E5E5E533',
          width: '80%',
        }}
        {...props}
      >
        <div style={{ marginTop: '1rem' }}>
          {props.text.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </MyHoverButton>
    </div>
  );
}
