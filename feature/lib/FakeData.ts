import { GroupBuyObject, GroupBuyStatus, LoadGroupData, StoreData, StoreObject, UserInfo } from "@/interface";

export const myUser: UserInfo = new UserInfo('韻儒','lalame888');
myUser.favoriteStoreUidList = [];
export const anotherUser: UserInfo = new UserInfo('使用者A','groupBuy123');

const coverImage = '../assets/S__113475591.jpg';
const menuImage = '../assets/S__113475595.jpg';
const storeData1: Partial<StoreData> =  {
    name: '嘉義涼麵',
    phone:'0987654321', 
    address: '台中',
    coverImage: coverImage,
    menuImage: [coverImage,menuImage]
}
export const store1: StoreObject = new StoreObject(storeData1);

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
        store: store1,
        joinCount: 0
    },
    builder:myUser.userData,
    userOrder:[]
}
export const groupBuyObject1 = GroupBuyObject.loadObject(groupBuyData1) 


export const groupBuyObject2 = new GroupBuyObject(anotherUser.userData,{title: '團購2'});