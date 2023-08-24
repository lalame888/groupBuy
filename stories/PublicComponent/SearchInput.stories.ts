import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '../../component';

const meta: Meta<typeof SearchInput> = {
  title: 'PublicComponent/Input/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '搜尋input& 避免中文正在打字時觸發& 按下enter時觸發',
      },
    },
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Primary: Story = {
  args: {},
};
