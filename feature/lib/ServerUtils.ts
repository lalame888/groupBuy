

import { ErrorCode, GroupBuyObject, GroupBuyStatus, LoggingLevel, UserInfo } from '@/interface';
import axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from 'axios';
import { groupBuyData1, groupBuyObject2, myUser } from './FakeData';
import { getTimeString } from '@/utils';

export class ServerUtils {
  constructor(
      public apiUrl = './api/'
  ) {
    
  }
  private get axios(): AxiosInstance {
    return (axios.create({
        baseURL: this.apiUrl,
        headers: {
          "Authorization": localStorage.getItem('token') // TODO: 不要把jwt放在 localStorage
        }
      }));
  }
  public async checkLogin(): Promise<UserInfo| null> {
    const result = myUser.clone();
    const storeUidList = await this.loadFavoriteStoreUidList(result);
    result.favoriteStoreUidList = storeUidList;
    return Promise.resolve(myUser.clone())

  }
  public loadFavoriteStoreUidList(userInfo: UserInfo): Promise<Array<string>> {
    return Promise.resolve([])
  }
  public loadUserGroupBuyList(type: 'now'| 'history'):Promise<Array<GroupBuyObject>> {
    // 取得uid的list，再用promise.all()取得每一個? 
    // 或是直接來列表 + 用map去載入每一個商店 (可能可以先用一起 去把商店id給找到之後，再一起拿？)

    let result: Array<GroupBuyObject> = [];
    if (type === 'now') {
      const groupBuyObject1 = GroupBuyObject.loadObject(groupBuyData1)
      result = [groupBuyObject1, groupBuyObject2.clone()];
    } else {

    }
    return Promise.resolve(result);
  }

  public async loadGroupBuy(groupId: string):Promise<GroupBuyObject | null> {
    return new Promise(async (resolve)=>{
      const nowList = await this.loadUserGroupBuyList('now');
      const hisList = await this.loadUserGroupBuyList('history');
      const result = [...nowList,...hisList].find((g)=>g.uid === groupId);
      setTimeout(()=>{
        if (result) resolve(result);
        else resolve(null);
      },1000)
    });
    
    
  }

  public updateGroupState(groupId: string, type: GroupBuyStatus): Promise<string>{
    const now = new Date();
    return Promise.resolve(getTimeString(now));
  }

  public addLog(message: string, logLevel: LoggingLevel, errorCode?: ErrorCode): Promise<void> {
    return Promise.resolve()
  }
};


export default ServerUtils;


export const serverUtils = new ServerUtils();
