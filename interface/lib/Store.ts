import { changeWeekToCh, generateUUID } from "@/utils"
import { DataSetter } from "./DataSetter"
import { MenuData } from "./Menu"

export type WeekDay = 1|2|3|4|5|6|7
export type BusinessHours = {
    day: WeekDay,
    isHoliday: boolean  // 是否公休：true=公休日，false=非公休日
    openTime: Array<string>,  // ['08:00~12:00','14:00~20:00'] 當天營業時間，如果是公休日就不看（為空）
}
// TODO: 要想一下讓使用者修改菜單的問題
// 店家資訊先不公開共享 => 公開共享時維護很麻煩 應該要有權限管理等等，但如果真的要給大眾使用，有共享才比較符合成本
type StoreSetting = {
    editable: boolean
}

export type StoreData = {
    uid: string
    name: string  // 店家名稱
    phone: string|'', //店家電話
    address: string|'', // 店家地址
    coverImage: string   // 店家封面
    menuImage: Array<string>  // 店家菜單，可以多張
    businessHours: Array<BusinessHours> // 營業時間
    menuData: Array<MenuData> | undefined // 菜單資訊 (一開始有可能不拿)
    setting: StoreSetting
}
// TODO: 還沒有存menu
// 流程上：去找店家資訊，拿店家uid找menu，然後再結合創造 StoreObject
// 或是不拿MenuData，直到要去編輯訂單或是要編輯Menu的時候再拿


export class StoreObject extends DataSetter<StoreObject,StoreData > {
    constructor(
        data?: Partial<StoreData>
    ){
        const initSetting: StoreData = {
            uid: generateUUID(),
            name: '',
            phone: '',
            address: '',
            coverImage: '',
            menuImage: [],
            businessHours: [],
            menuData: undefined,
            setting: {
                editable: true
            }
        }
        super({...initSetting,...data});
    }

    // getter
    get name() {return this.dataGetter('name') as string}
    get phone() {return this.dataGetter('phone') as string}
    get address() {return this.dataGetter('address') as string}
    get coverImage() {return this.dataGetter('coverImage') as string}  
    get menuImage() {return this.dataGetter('menuImage') as Array<string>}
    get menuData(): Array<MenuData> | undefined {return this.dataGetter('menuData') as Array<MenuData>}
    get editable(): boolean { const setting =  this.dataGetter('setting')  as StoreSetting
        return setting.editable    
    }
    get businessHours(): Array<string> {
        if (this.data.businessHours.length === 0) return ['無資訊'];
        return this.data.businessHours
        .filter((t)=> t.isHoliday === true || t.openTime.length !==0)
        .sort((a,b)=> a.day - b.day)
        .map((b)=>{
            const week = changeWeekToCh(b.day);
            const time = b.isHoliday ? '公休' : b.openTime.join('、')
            return (`${week} ${time}`)
        });
    }
    get nowIsBusinessHours(): boolean | undefined {  // 取得目前是否營業中: 是/否/無資料      
        const now = new Date();
        const nowDay = now.getDay();
        const hours = this.data.businessHours.find((b)=> b.day === nowDay);
        if (hours) {
            if (hours.isHoliday) return false; // 公休中
            if (hours.openTime.length === 0) return undefined
            // 有營業，但要看看目前的時間是不是在該區間內
            return hours.openTime.map((value)=>{ // ex: 08:00~21:00
                const [startString, endString] = value.split('~');
                if (!startString || !endString) return undefined  // TODO: 有問題
                const today = now.toDateString();
                const start = new Date(`${today} ${startString}`);
                const end = new Date(`${today} ${endString}`);
                return (start<= now && now<= end); // 在營業時間中
            }).reduce((a,b)=> {
                if (a === undefined || b=== undefined) return undefined;
                return a || b;
            })
        } else {
            return undefined
        }

    }
    get uid(): string {return this.dataGetter('uid') as string}

    
}

