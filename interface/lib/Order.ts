import { generateUUID, getKeyByValue } from '@/utils';
import { DataSetter } from './DataSetter';
import { UserData } from './UserInfo';
import { GoodsData } from './Menu';

export enum ReceiptType {
  '已簽收完畢' = 'receipted',
  '團主已出貨，尚未簽收' = 'shipped',
  '未到貨' = 'no',
}

type UserOrderData = {
  user: UserData;
  orderList: Array<GoodsData>;
  payMoney: number; // 已經付款的金額
  receipt: ReceiptType; // 是否簽收/取得貨品
  orderNote: string; //訂單備註
  appendMoney: number;
  uid: string;
};

export enum EditOrderAction {
  '已付金額' = 'payMoney',
  '收貨狀態' = 'receipt',
  '修改商品資訊' = 'editGoods', // 修改單價、修改特製項目、修改是否缺貨
  '修改額外費用' = 'editAppendMoney',
}

export type EditOrderType = {
  type: EditOrderAction;
  value: number | ReceiptType | GoodsData;
};

export class UserOrder extends DataSetter<UserOrder, UserOrderData> {
  public editArray: Array<EditOrderType> = [];
  constructor(user: UserData, data?: Partial<UserOrderData>) {
    const initSetting: UserOrderData = {
      user,
      orderList: [],
      payMoney: 0,
      receipt: ReceiptType['未到貨'],
      orderNote: '',
      appendMoney: 0,
      uid: generateUUID(),
    };
    super({ ...initSetting, ...data });
  }

  static loadUserOrder(
    data: UserOrderData,
    orderList: Array<Partial<GoodsData>>,
  ): UserOrder {
    const orders = orderList.map((order) => {
      const { name, money, number, note, appendTermList, uid, isNoGoods } =
        order; // 把物件變成class
      return new GoodsData(
        name || '',
        money || 0,
        number,
        note,
        appendTermList,
        uid,
        isNoGoods,
      );
    });
    return new UserOrder(data.user, { ...data, orderList: orders });
  }
  get orderList(): Array<GoodsData> {
    const list = [...(this.dataGetter('orderList') as Array<GoodsData>)];
    const editList = this.editArray.filter((edit) => {
      return edit.type === EditOrderAction['修改商品資訊'];
    });
    editList.forEach((edit) => {
      const newGoods = edit.value as GoodsData;
      const goodsIndex = list.findIndex((g) => g.uid === newGoods.uid);
      if (goodsIndex !== -1) {
        list[goodsIndex] = newGoods;
      }
    });
    return list;
  }
  get user(): UserData {
    return this.dataGetter('user') as UserData;
  }
  get uid(): string {
    return this.dataGetter('uid') as string;
  }
  get orderNote(): string {
    return this.dataGetter('orderNote') as string;
  }

  // 以下是可能被團主修改的
  get appendMoney(): number {
    const edited = this.editArray.find(
      (edit) => edit.type === EditOrderAction['修改額外費用'],
    );
    if (edited) return edited.value as number;
    return this.dataGetter('appendMoney') as number;
  }
  get payMoney(): number {
    const edited = this.editArray.find(
      (edit) => edit.type === EditOrderAction['已付金額'],
    );
    if (edited) return edited.value as number;
    return this.dataGetter('payMoney') as number;
  }
  get receipt(): ReceiptType {
    const edited = this.editArray.find(
      (edit) => edit.type === EditOrderAction['收貨狀態'],
    );
    if (edited) return edited.value as ReceiptType;
    return this.dataGetter('receipt') as ReceiptType;
  }

  get isReceipted(): boolean {
    return this.receipt === ReceiptType['已簽收完畢'];
  }
  get totalMoney(): number {
    // 回傳總金額
    let result: number = this.appendMoney;
    if (this.orderList.length === 0) return 0;

    result += this.orderList
      .map((order) => order.totalMoney)
      .reduce((a, b) => a + b);

    return result;
  }
  get orderContainText(): string {
    // 只顯示沒有標示成缺貨的
    if (this.orderList.length === 0) return '尚無內容';
    return this.orderList
      .filter((o) => !o.isNoGoods)
      .map((order) => order.orderContainText)
      .join('、');
  }

  get noGoodsContainText(): string {
    // 缺貨的內容
    if (this.data.orderList.length === 0) return '';
    const list = this.data.orderList.filter((o) => o.isNoGoods);
    if (list.length === 0) return '';
    return `缺貨中：${list.map((order) => order.orderContainText).join('、')}`;
  }
  get payStatus(): string {
    if (this.data.payMoney === this.totalMoney)
      return `已付款完成，${getKeyByValue(ReceiptType, this.data.receipt)}`;
    if (this.data.payMoney > this.totalMoney)
      return `已付款完成，尚需找 ${this.data.payMoney - this.totalMoney}元`;
    if (this.data.payMoney === 0) return '尚未付款';
    else
      return `已支付${this.data.payMoney}元，尚需補${
        this.totalMoney - this.data.payMoney
      }元`;
  }

  set orderList(newList: Array<GoodsData>) {
    this.dataSetter('orderList', [...newList]);
  }
  set orderNote(newNote: string) {
    this.dataSetter('orderNote', newNote);
  }

  get isEdit(): boolean {
    return this.editArray.length > 0;
  }
}
