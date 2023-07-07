import { GroupBuyObject, GroupBuyStatus, LoadGroupData, StoreObject, UserInfo } from "@/interface";

export const myUser: UserInfo = new UserInfo('韻儒','lalame888');
myUser.favoriteStoreUidList = [];
export const anotherUser: UserInfo = new UserInfo('使用者A','groupbuy123');

export const store1: StoreObject = new StoreObject('嘉義涼麵','../assets/S__113475591.jpg','0987654321',['../assets/S__113475591.jpg','../assets/S__113475595.jpg']);

export const groupBuyData1: LoadGroupData = {
    data:{
        uid: '1234',
        title: '團購1',
        statues: GroupBuyStatus['開放跟團中'],
        deleteTime: undefined,
        setting:{
            canNewTerm: true,
            endTime:undefined,
            openOrderView: true,
            addNote: true,
            limitPeople: undefined,
            appendMoney: {
                type: 'every',
                value: 0
            }
        },
        store: store1
    },
    builder:myUser.userData,
    userOrder:[]
}

export const groupBuyObject2 = new GroupBuyObject(anotherUser.userData,{title: '團購2'});