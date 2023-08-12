import { generateUUID } from "@/utils";
import { Cloneable } from "./Cloneable";

export type MenuData = {
  name: string,
  money: number,
  appendMenu: Array<AppendTerm> 
}

export type AppendTerm = {
    name: string, money: number
}
export class GoodsData extends Cloneable<GoodsData> {
    constructor(
        public name: string,
        public money: number,
        public number: number = 1, //數量
        public note: string = "",
        public appendTermList: Array<AppendTerm> = [], // 目前有選擇的加工項目
        public uid: string = generateUUID(),
        public isNoGoods: boolean = false //團主標示沒貨
    ){
        super();
    }

    get totalMoney (): number {
        if (this.isNoGoods === true) return 0 ;  //如果這個商品被標示為缺貨就不用再計算金額了 
        if (this.appendTermList.length === 0) return this.money * this.number;
          else {
            return  (this.money + this.appendTermList.map((append)=> append.money).reduce((a,b)=> a+b))* this.number;
          }
      }
    
      get orderContainText(): string {
        return `${this.name}${(this.appendTermList.length)? `(${this.appendTermList.map((append)=> append.name).join('＆')})`:''} * ${this.number}`
      }
    
      get appendTermText(): string {
        if (this.appendTermList.length ===0) return '';
        return this.appendTermList.map((append)=> `${append.name}${append.money>0 ?` (+${append.money}$)`: ''}`).join('、')
      }
}