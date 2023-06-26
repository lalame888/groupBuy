import { generateUUID, getKeyByValue, getTimeString } from "@/utils";
import { Cloneable } from "./Cloneable";
import { UserOrder } from "./Order";
import { UserData } from "./UserInfo";
import { StoreData } from "./Store";

export enum GroupBuyStatus {
    '開放跟團中', // 大家都可以編輯
    '結單收貨中', // 要給大家確認自己有繳錢、有拿到東西  已經不能跟單還有編輯訂單
    '已結束' ,  // 順利完成的
    '已取消團單' // 中途刪掉的
}
type GroupSetting = {
    canNewTerm: boolean, // 是不是可以自行新增菜單品項,
    endTime: Date | undefined,
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
    deleteTime: Date | undefined; // 被刪除的時間 沒被刪除就是undefined
    setting: GroupSetting,
    store: StoreData| undefined; // 所選的店家
}
export type LoadGroupData = {
    data: GroupBuyData,
    builder: UserData,
    userOrder: Array<UserOrder>
}
type GroupBuyDataProperty = keyof GroupBuyData;

export class GroupBuyObject extends Cloneable {
    private data : GroupBuyData;
    private userOrder: Array<UserOrder> = []; //目前這個團單所有跟團者的訂單
    constructor(
        public readonly builder: UserData, // 開團者 
        data?: Partial<GroupBuyData>
    ){ 
        super();
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
        this.data = {...initSetting,...data };
    }

    static loadObject(prams: LoadGroupData): GroupBuyObject{
        const result = new GroupBuyObject(
            prams.builder,
            prams.data
        );
        result.userOrder = prams.userOrder;
        return result;
    }

    private dataSetter(key: GroupBuyDataProperty, value: any) {
        const newData = {...this.data, [key]: value};
        this.data = newData;
    }
    // 定義setter 需要更新時使用dataSetter

    set title(title: string) {
        this.dataSetter('title', title);
    }
    public setStatues(statues: GroupBuyStatus, endTime?: Date) {
        this.dataSetter('statues', statues);
        switch (statues){
            case GroupBuyStatus['已結束']:
            case GroupBuyStatus['已取消團單']:
                this.dataSetter('deleteTime', endTime);
                break;
        }
    }
    set store(store: StoreData | undefined) {
        this.dataSetter('store',store);
    }
    set setting(setting: GroupSetting) {
        this.dataSetter('setting',{...setting})
    }

    // 定義getter 
    private dataGetter(key: GroupBuyDataProperty){
        return this.data[key]
    }
    get title(): string {return this.dataGetter('title') as string}
    get uid(): string {return this.dataGetter('uid') as string}
    get groupName(): string {
        const storeName = this.store? ` - ${this.store.name}` : '';
        return `${this.title}${storeName}`;
    }

    // 和目前跟團團單有關的功能


    // 和狀態有關
    get isEditAble(): boolean {
        return this.data.statues === GroupBuyStatus['開放跟團中']
    }
    
    get isEnd(): boolean {
        return this.data.statues === GroupBuyStatus['已結束'] || this.data.statues === GroupBuyStatus['已取消團單']
    }

    get statusText(): string {
        return getKeyByValue(GroupBuyStatus, this.data.statues)
    }
    get joinListLength(): number {
        return this.userOrder.length
    }

    get endTimeString(): string {
        if (this.data.setting.endTime && this.isEditAble) {
            return `跟團期限：${ getTimeString(this.setting.endTime)}`
        } else if (this.data.deleteTime) {
            return `結束時間：${getTimeString(this.data.deleteTime)}`
        }
        return ''
    }

}