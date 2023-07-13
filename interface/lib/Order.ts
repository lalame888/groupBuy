import { generateUUID } from "@/utils";
import { DataSetter } from "./DataSetter";
import { UserData } from "./UserInfo";
import { GoodsData } from "./Menu";

type UserOrderData = {
    user: UserData,
    orderList: Array<GoodsData>
    payMoney: number // 已經付款的金額
    receipt: boolean // 是否簽收/取得貨品
    orderNote: string //訂單備註
    appendMoney: number
    uid: string
}

export class UserOrder extends DataSetter<UserOrder,UserOrderData>{
    constructor(user: UserData,data?: Partial<UserOrderData>){
        const initSetting: UserOrderData = {
            user,
            orderList: [],
            payMoney: 0,
            receipt: false,
            orderNote:'',
            appendMoney: 0,
            uid: generateUUID()
        }
        super({...initSetting,...data});

    }

  static loadUserOrder(data: UserOrderData, orderList: Array<Partial<GoodsData>>): UserOrder {
      const orders = orderList.map((order)=> {
          const { name, money, number, note, appendTermList } = order; // 把物件變成class
          return new GoodsData(name||'', money||0, number, note, appendTermList);
      })
      return new UserOrder(
          data.user,
          {...data,orderList: orders}
      )
  }
  get orderList(): Array<GoodsData>{
    return this.dataGetter('orderList') as  Array<GoodsData>;
  }
  get user(): UserData {return this.dataGetter('user') as UserData}
  get uid(): string {return this.dataGetter('uid') as string}
  get appendMoney(): number {return this.dataGetter('appendMoney') as number}
  get orderNote(): string {return this.dataGetter('orderNote') as string}
  get payMoney(): number {return this.dataGetter('payMoney') as number}
  get totalMoney(): number {  // 回傳總金額
    let result: number = this.data.appendMoney;
    if (this.data.orderList.length === 0) return 0;

    result += this.data.orderList.map((order)=> order.totalMoney).reduce((a,b)=> a+b);

    return result;
  }
  get orderContainText(): string {
    if (this.data.orderList.length ===0) return '尚無內容'
    return this.data.orderList.map((order)=> order.orderContainText).join('、')
  }
  get payStatus(): string {
    if (this.data.payMoney === this.totalMoney) return `已付款完成${this.data.receipt ? '，已簽收': '尚未簽收'}`;
    if (this.data.payMoney > this.totalMoney) return `已付款完成，尚需找 ${this.data.payMoney - this.totalMoney}元`;
    if (this.data.payMoney === 0) return '尚未付款';
    else return `已支付${this.data.payMoney}元，尚需補${this.totalMoney - this.data.payMoney}元`
          
  }
  


  set orderList(newList: Array<GoodsData>) {
    this.dataSetter('orderList',[...newList]);
  }
  set orderNote(newNote: string) {
    this.dataSetter('orderNote', newNote) 
  }

}
