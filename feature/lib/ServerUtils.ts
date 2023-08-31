import {
  ErrorCode,
  GoodsData,
  GroupBuyObject,
  GroupBuyStatus,
  LoggingLevel,
  MenuData,
  ReceiptType,
  StoreObject,
  UserInfo,
  UserOrder,
} from '@/interface';
import axios, { AxiosInstance } from 'axios';
import {
  groupBuyObject1,
  groupBuyObject2,
  myUser,
  myUserFavoriteStoreUidList,
  userOrder,
  userOrder2,
} from '@/data';
import { getTimeString } from '@/utils';

// TODO: 每次出發之前要先確認一下user資訊是否還相同？
export class ServerUtils {
  private JWT: string | null = '';
  constructor(public apiUrl = './api/') {
    // this.JWT = localStorage.getItem('token')  // TODO: 不要把jwt放在 localStorage;
  }
  private get axios(): AxiosInstance {
    return axios.create({
      baseURL: this.apiUrl,
      headers: {
        Authorization: this.JWT,
      },
    });
  }
  public async checkLogin(): Promise<UserInfo | null> {
    const result = myUser.clone();
    const storeUidList = await this.loadFavoriteStoreUidList();
    result.favoriteStoreUidList = storeUidList;
    localStorage.setItem('token', '0000'); //test用
    return Promise.resolve(myUser.clone());
  }
  public loadFavoriteStoreUidList(): Promise<Array<string>> {
    return Promise.resolve(myUserFavoriteStoreUidList);
  }
  public loadUserGroupBuyList(
    type: 'now' | 'history',
  ): Promise<Array<GroupBuyObject>> {
    // 取得uid的list，再用promise.all()取得每一個?
    // 或是直接來列表 + 用map去載入每一個商店 (可能可以先用一起 去把商店id給找到之後，再一起拿？)

    let result: Array<GroupBuyObject> = [];
    if (type === 'now') {
      // TODO: 後端根據是不是有權限觀看來決定userOrder的資料內容 (陣列or undefined)

      result = [groupBuyObject1, groupBuyObject2];
    } else {
    }
    return Promise.resolve(result);
  }

  public async loadGroupBuy(groupId: string): Promise<GroupBuyObject | null> {
    // TODO: 這裡載入的時候，userOrder就要包含在裡面
    return new Promise(async (resolve) => {
      const nowList = await this.loadUserGroupBuyList('now');
      const hisList = await this.loadUserGroupBuyList('history');
      const result = [...nowList, ...hisList].find((g) => g.uid === groupId);
      if (result) {
        const userOrder = await this.loadUserOrderList(groupId);
        result.userOrderList = userOrder;
      }
      setTimeout(() => {
        if (result) resolve(result);
        else resolve(null);
      }, 1000);
    });
  }
  public async loadUserOrderList(groupId: string): Promise<Array<UserOrder>> {
    return [userOrder, userOrder2];
  }
  public async receiptOrder(
    order: UserOrder,
    newState: ReceiptType,
  ): Promise<void> {}
  public async deleteOrder(groupId: string, order: UserOrder): Promise<void> {
    const groupObject = await this.loadGroupBuy(groupId);
    if (groupObject?.userOrderList) {
      const index = groupObject.userOrderList.findIndex(
        (o) => o.uid === order.uid,
      );
      if (index !== -1) {
        const newList = [...groupObject.userOrderList];
        newList.splice(index, 1);
        groupObject.userOrderList = newList;
      }
    }
  }
  public async saveOrder(groupId: string, newOrder: UserOrder): Promise<void> {
    const groupObject = await this.loadGroupBuy(groupId);
    if (groupObject) {
      const newList = groupObject.userOrderList
        ? [...groupObject.userOrderList]
        : [];
      const index = newList.findIndex((o) => o.uid === newOrder.uid);
      if (index !== -1) {
        newList[index] = newOrder;
      } else {
        newList.push(newOrder);
      }
      groupObject.userOrderList = newList;
    }
  }

  public updateGroupState(
    groupId: string,
    type: GroupBuyStatus,
  ): Promise<string> {
    const now = new Date();
    return Promise.resolve(getTimeString(now));
  }
  public async updateStoreMenuData(
    store: StoreObject,
    newMenuData: Array<GoodsData>,
  ) {
    const newList = store.menuData ? [...store.menuData] : [];
    newMenuData.forEach((newD) => {
      const menuD = {
        name: newD.name,
        money: newD.money,
        appendMenu: newD.appendTermList,
      };
      const index = newList.findIndex((d: MenuData) => d.name === newD.name);
      if (index !== -1) {
        newList[index] = menuD;
      } else {
        newList.push(menuD);
      }
    });
    const newStore = new StoreObject({ ...store, menuData: newList });

    const groupBuyList = [
      ...(await this.loadUserGroupBuyList('now')),
      ...(await this.loadUserGroupBuyList('history')),
    ];

    groupBuyList.forEach((g) => {
      if (g.store?.uid === newStore.uid) {
        g.store = newStore;
      }
    });
  }

  public async updateUserOrder(userOrders: Array<UserOrder>, uid: string) {
    // 針對userOrders 中editArray的部分去做更改
    // 新的orderList => 直接拿出來就是整併過的
    const orginal = await this.loadUserOrderList(uid);
    userOrders.forEach((order) => {
      const oldOrder = orginal.find((o) => o.uid === order.uid);
      if (oldOrder) {
        oldOrder.orderList = order.orderList;
        oldOrder.editArray = [];
      }
    });
  }
  public async updateFavoriteStore(isAdd: boolean, storeUid: string) {
    const index = myUserFavoriteStoreUidList.indexOf(storeUid);

    if (isAdd) {
      if (index === -1) myUserFavoriteStoreUidList.push(storeUid);
    } else {
      if (index !== -1) myUserFavoriteStoreUidList.splice(index, 1);
    }
  }

  public async loadStoreList(type: 'favorite' | 'search', searchText?: string) {
    // 如果沒有searchText 就給一些推薦
    if (type === 'favorite') return []; // TODO: 邏輯
    else return [];
  }

  public addLog(
    message: string,
    logLevel: LoggingLevel,
    errorCode?: ErrorCode,
  ): Promise<void> {
    return Promise.resolve();
  }
}

export default ServerUtils;

export const serverUtils = new ServerUtils();
