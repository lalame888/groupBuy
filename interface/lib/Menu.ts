import { Cloneable } from "./Cloneable";

export type MenuData = {
    // TODO
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
    ){
        super();
    }

    get totalMoney (): number {
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
        return this.appendTermList.map((append)=> append.name).join('、')
      }
}