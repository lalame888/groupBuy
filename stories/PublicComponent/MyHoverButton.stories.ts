import type { Meta, StoryObj } from '@storybook/react';
import { MyHoverButton } from '../../component';

const meta: Meta<typeof MyHoverButton> = {
  title: 'PublicComponent/MyHoverButton',
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
    }
  },
};

export default meta;
type Story = StoryObj<typeof MyHoverButton>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
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

