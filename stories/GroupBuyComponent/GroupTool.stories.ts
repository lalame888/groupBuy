import type { Meta, StoryObj } from '@storybook/react';
import { GroupTool } from '../../component/lib/GroupBuyInfo/GroupInfoPage/GroupTool';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof GroupTool> = {
  title: 'GroupBuyComponent/GroupTool',
  component: GroupTool,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '團單工具列',
      },
    },
  },
  argTypes: {
    isEditAble: {
      description: '該團單是否開放跟團中',
    },
    isOwner: {
      description: '操作者是否為團單的創建人',
    },
    endTime: {
      description: '結單的設定時間或是結單時間',
    },
  },
};

export default meta;
type Story = StoryObj<typeof GroupTool>;

export const isEdit_owner: Story = {
  args: {
    isEditAble: true,
    isOwner: true,
  },
};
export const notEdit_owner: Story = {
  args: {
    isEditAble: false,
    isOwner: true,
  },
};
export const other: Story = {
  args: {
    isEditAble: true,
    isOwner: false,
  },
};
