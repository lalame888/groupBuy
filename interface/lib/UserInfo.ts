import { generateUUID } from "@/utils";
import { Cloneable } from "./Cloneable";


export type UserInfoJSON = {
    userName: string,
    loginId: string,
  }
  
  export class UserInfo extends Cloneable implements UserInfoJSON {
  
    public pictureUrl: string| undefined;
    public favoriteStoreUidList:Array<string> = [] // 最愛的清單
    constructor(
      public readonly userName: string,
      public readonly loginId: string,
      public readonly uid: string = generateUUID()
    ) {
      super();
    }
  
    public isFavoriteStore(uid: string): boolean {
      return this.favoriteStoreUidList.findIndex((storeUid)=> storeUid === uid) !== -1
    }
  }
