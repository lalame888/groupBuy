import { generateUUID, getKeyByValue, getTimeString } from "@/utils";
import { UserOrder } from "./Order";
import { UserData } from "./UserInfo";
import { StoreObject } from "./Store";
import { DataSetter } from "./DataSetter";

export enum GroupBuyStatus {
    '開放跟團中', // 大家都可以編輯
    '結單中', // 要給大家確認自己有繳錢、有拿到東西  已經不能跟單還有編輯訂單
    '已完成' ,  // 順利完成的
    '已取消團單' // 中途刪掉的
}
type GroupSetting = {
    canNewTerm: boolean, // 是不是可以自行新增菜單品項,
    endTime: string | undefined, // 截止跟團的時間，包含設定的時間或是手動截止的時間
    openOrderView: boolean, // 開放別人觀看團單
    addNote: boolean, // 是不是可以有備註
    limitPeople: number | undefined, // 是不是有限制人數
    appendMoney: {
        type: 'every' | 'avg'
        value: number
    } // 每人的額外費用 每人都要加收費用 or 平攤  // 如果是每個運費都不一樣的話放在userOrder裡面 
}

type GroupBuyData = {
    uid: string, // 該團的uid
    title: string // 開團的title
    statues: GroupBuyStatus
    deleteTime: string | undefined; // 被刪除or完成的時間 還沒完結undefined
    setting: GroupSetting,
    store: StoreObject| undefined; // 所選的店家
}
export type LoadGroupData = {
    data: GroupBuyData,
    builder: UserData,
    userOrder: Array<UserOrder>
}

export class GroupBuyObject extends DataSetter<GroupBuyObject,GroupBuyData >  {
    private userOrder: Array<UserOrder> = []; //目前這個團單所有跟團者的訂單
    constructor(
        public readonly builder: UserData, // 開團者 
        data?: Partial<GroupBuyData>
    ){ 
        const initSetting: GroupBuyData = {
            uid: generateUUID(),
            title: '',
            statues: GroupBuyStatus['開放跟團中'],
            deleteTime: undefined,
            setting: {
                canNewTerm: true,
                endTime: undefined,
                openOrderView: true,
                addNote: true,
                limitPeople: undefined,
                appendMoney: {
                    type: 'every',
                    value: 0
                }
            },
            store: undefined

        }
        super({...initSetting,...data });

    }

    static loadObject(prams: LoadGroupData): GroupBuyObject{
        const result = new GroupBuyObject(
            prams.builder,
            prams.data
        );
        result.userOrder = prams.userOrder;
        // TODO: 如果是非團主&沒有觀看userOrder權限的，要另外處理
        // TODO: 而且可以不用一開始就給，有點進去資料再看
        // 跟團人數的資料要再另外給？
        return result;
    }

    // 定義setter 需要更新時使用dataSetter
    set title(title: string) {
        this.dataSetter('title', title);
    }
    public setStatues(statues: GroupBuyStatus, endTime?: string) {
        this.dataSetter('statues', statues);
        switch (statues){
            case GroupBuyStatus['已完成']:
            case GroupBuyStatus['已取消團單']:
                this.dataSetter('deleteTime', endTime);
                break;
            case GroupBuyStatus['開放跟團中']: 
                this.setting = {...this.data.setting, endTime: undefined}
                break;
            case GroupBuyStatus['結單中']:
                this.setting = {...this.data.setting, endTime}
                break;
        }
    }
    set store(store: StoreObject | undefined) {
        this.dataSetter('store',store);
    }
    set setting(setting: GroupSetting) {
        this.dataSetter('setting',{...setting})
    }

    // 定義getter 
    get title(): string {return this.dataGetter('title') as string}
    get uid(): string {return this.dataGetter('uid') as string}
    get groupName(): string {
        const storeName = this.store? ` - ${this.store.name}` : '';
        return `${this.title}${storeName}`;
    }
    get store(): StoreObject | undefined { return this.dataGetter('store') as StoreObject}

    // 和目前跟團團單有關的功能


    // 和狀態有關
    get isEditAble(): boolean {
        return this.data.statues === GroupBuyStatus['開放跟團中']
    }
    
    get isEnd(): boolean {
        return this.data.statues === GroupBuyStatus['已完成'] || this.data.statues === GroupBuyStatus['已取消團單']
    }

    get statusText(): string {
        return getKeyByValue(GroupBuyStatus, this.data.statues)
    }
    get joinListLength(): number { // TODO: 另外處理？
        return this.userOrder.length
    }
    get endTime(): Date|undefined {
        const time =  (this.data.deleteTime ) ? this.data.deleteTime : this.data.setting.endTime
        if (time) return new Date(time);
        return undefined
    }
    get endTimeString(): string {
        if (this.endTime) {
            if ( this.isEditAble) {
                return `跟團開放截止時間：${ getTimeString(this.endTime)}`
            }  {
                return `結束時間：${getTimeString(this.endTime)}`
            }
        }
        return ''
    }

    

}