import { GoodsData, GroupBuyObject, GroupBuyStatus, LoadGroupData, StoreData, StoreObject, UserInfo, UserOrder } from "@/interface";

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
const 涼麵大JSON = {name: '涼麵（大）', money: 65,number:1,note: '',appendTermList: [{name: '蒜香',money:0}]};
const 味噌湯JSON = {name: '味噌湯', money: 20,number:1,note: '',appendTermList: []};
const 涼麵小JSON = {name: '涼麵（小）', money: 45,number:1,note: '',appendTermList: [{name: '原味',money:0}]};
const 皮蛋豆腐JSON = {name: '皮蛋豆腐', money: 30,number:1,note: '',appendTermList: []};

const userOrder = UserOrder.loadUserOrder({
    user: myUser.userData,
    orderList: [],
    payMoney: 0 ,// 已經付款的金額
    receipt: false, // 是否簽收/取得貨品
    orderNote: '', //訂單備註
    appendMoney: 0,
    uid: '12345'
},[涼麵大JSON,味噌湯JSON])
const userOrder2 = UserOrder.loadUserOrder({
    user: anotherUser.userData,
    orderList: [],
    payMoney: 0 ,// 已經付款的金額
    receipt: false, // 是否簽收/取得貨品
    orderNote: '', //訂單備註
    appendMoney: 0,
    uid: '56789'
},[涼麵小JSON,皮蛋豆腐JSON])
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
    userOrder:[userOrder,userOrder2]
}
export const groupBuyObject1 = GroupBuyObject.loadObject(groupBuyData1) 

export const groupBuyObject2 = new GroupBuyObject(anotherUser.userData,{title: '團購2'});
groupBuyObject2.userOrderList = [userOrder2]