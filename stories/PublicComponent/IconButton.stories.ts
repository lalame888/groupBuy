import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '../../component';
import { faEllipsisH, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof IconButton> = {
  title: 'PublicComponent/Button/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '以icon作為button',
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const icon1: Story = {
  args: {
    icon: faEllipsisV,
  },
};

export const icon2: Story = {
  args: {
    icon: faEllipsisH,
  },
};
