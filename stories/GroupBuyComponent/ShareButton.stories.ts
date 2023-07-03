import type { Meta, StoryObj } from '@storybook/react';
import { ShareGroupButton } from '../../component';

const meta: Meta<typeof ShareGroupButton> = {
  title: 'GroupBuyComponent/Button/ShareButton',
  component: ShareGroupButton,
  tags: ['autodocs'],
  parameters:{
    docs:{
      description: {
        component: '分享團單的button',
      }
    }
  },
  argTypes: {
   
  },
};

export default meta;
type Story = StoryObj<typeof ShareGroupButton>;

export const shareGroupButton: Story = {
  args:{

  }
};



