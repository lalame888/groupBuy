import { THEME } from '@/styles/theme';
import { CSSProperties } from 'react';
import { Form } from 'react-bootstrap';

interface MyInputProps {
  forwardRef?: React.RefObject<HTMLInputElement>;
  style?: CSSProperties;
  inputValue: string;
  readonly?: boolean;
  onChange?(newInput: string): void;
  placeholder?: string;
  disabled?: boolean;
  isValidMessage?: string;
  id?: string;
  type?: string;
  onKeyDown?: React.KeyboardEventHandler;
}

export function MyInput(props: MyInputProps) {
  const style: CSSProperties = {
    border: THEME.border,
    borderRadius: THEME.buttonBorderRadius,
    display: 'inline-block',
    padding: '5px 15px',
    ...props.style,
  };

  return (
    <Form noValidate style={{ width: '100%' }}>
      <Form.Group controlId={props.id} style={{ position: 'relative' }}>
        <Form.Control
          ref={props.forwardRef}
          readOnly={props.readonly}
          disabled={props.disabled}
          type={props.type || 'text'}
          value={props.inputValue}
          onChange={(e) => {
            const value = e.target.value;
            if (props.onChange) props.onChange(value);
          }}
          onKeyDown={props.onKeyDown}
          style={style}
          placeholder={props.placeholder}
          isInvalid={!!props.isValidMessage}
        />
        <Form.Control.Feedback type="invalid" tooltip={true}>
          {props.isValidMessage}
        </Form.Control.Feedback>
      </Form.Group>
    </Form>
  );
}
