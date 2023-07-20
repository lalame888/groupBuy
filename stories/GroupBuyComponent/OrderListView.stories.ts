import { OrderListView } from '@/component/lib/GroupBuyInfo/GroupInfoPage/OrderListView/OrderListView';
import { userOrder,userOrder2 } from '@/data';
import type { Meta, StoryObj } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';


const meta: Meta<typeof OrderListView> = {
  title: 'GroupBuyComponent/OrderListView',
  component: OrderListView,
  tags: ['autodocs'],
  parameters:{
    docs:{
      description: {
        component: '訂購總表',
      }
    }
  },
  argTypes: {
    groupName: {
      description: '團購名稱'
    },
    orderList: {
      description: '每個人員的訂購資量'
    },
    updatePayState:{
      description: '更動付款狀態的function'
    },
    tableId:{
      description: '下載PDF套件用的表格id名稱'
    }
  },
};

export default meta;
type Story = StoryObj<typeof OrderListView>;

const orderList = [userOrder.clone(),userOrder2.clone()];

export const table: Story = {
  args:{
    groupName: '團單名稱',
    orderList: orderList
  }
};