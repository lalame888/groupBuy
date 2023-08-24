import type { Meta, StoryObj } from '@storybook/react';
import { Confirm } from '../../component';
import { simpleButton } from './simpleButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof Confirm> = {
  title: 'PublicComponent/Button/Confirm',
  component: Confirm,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'button的higher order component ，按下後觸發彈跳視窗確認，確認完畢才會執行指定動作',
      },
    },
  },
  argTypes: {
    confirmType: {
      control: {
        type: 'select',
        options: ['delete', undefined],
      },
      description: '確認的動作類型',
    },
    title: {
      description: '確認視窗的標題',
    },
    text: {
      description: '確認視窗的確認說明內文',
    },
    children: {
      description: '顯示的按鈕本身 (JSX.Element)',
    },
    onConfirm: {
      description: '彈跳視窗按下確認執行後要執行的內容',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Confirm>;

export const Primary: Story = {
  args: {
    children: simpleButton('普通的按鈕'),
    text: '確認視窗的內文',
    title: '確認視窗的標頭',
  },
};

export const DeleteConfirm: Story = {
  args: {
    children: simpleButton('刪除的按鈕'),
    text: '刪除視窗的內文',
    title: '刪除視窗的標頭',
    confirmType: 'delete',
  },
};
