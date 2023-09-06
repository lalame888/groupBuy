import { IconButton, IconButtonProps } from './IconButton';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export function DeleteButton(props: Partial<IconButtonProps>) {
  return <IconButton icon={faTimes} {...props} />;
}
