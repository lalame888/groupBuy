import type { Meta, StoryObj } from '@storybook/react';
import { MyHoverButton } from '../../component';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof MyHoverButton> = {
  title: 'PublicComponent/Button/MyHoverButton',
  component: MyHoverButton,
  tags: ['autodocs'],
  parameters:{
    docs:{
      description: {
        component: '提供hover之後會變色的按鈕，且結合Link組件，只要在to中輸入路徑，click的時候就會觸發路徑導向',
      }
    }
  },
  argTypes: {
    theme:{
      control: {
        type: 'select',
        options: ['green', null],
      },
      description: '主題色'
    },
    to:{
      description: '導向路徑，可不填'
    },
    children:{
      description: '按鈕內文'
    },
    size:{
      description: '按鈕大小與長度'
    }
  },
};

export default meta;
type Story = StoryObj<typeof MyHoverButton>;

export const Primary: Story = {
  args: {
    children:'預設的按鈕'
  },
};

export const Green: Story = {
  args: {
    theme:'green',
    children:'綠色的按鈕'
  },
};

export const LongButton: Story = {
  args: {
    ...Primary.args,
    size: 'long'
  },
};
