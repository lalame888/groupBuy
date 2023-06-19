

import { UserInfo } from '@/interface';
import axios, { AxiosInstance, AxiosResponse, CancelTokenSource } from 'axios';
import { myUser } from './FakeData';

export class ServerUtils {
  constructor(
      public apiUrl = './api/'
  ) {
    
  }
  private get axios(): AxiosInstance {
    return (axios.create({
        baseURL: this.apiUrl
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
};


export default ServerUtils;


export const serverUtils = new ServerUtils();
