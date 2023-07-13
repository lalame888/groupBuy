
import { MenuData,GroupSetting, GoodsData, AppendTerm } from "@/interface";
import { toSBC } from "@/utils";
import { CSSProperties, useMemo, useState } from "react";
import { CloseButton, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';

interface EditGoodsCardProps {
    setting: GroupSetting
    menu: Array<MenuData>
    goods: GoodsData
    delete(): void;
    editGoods(newGoods: GoodsData): void;
}
type SelectOption<T> = {
    value: T;
    label: string;
}
function splitNameAndMoney(text: string): AppendTerm {
    text = toSBC(text)
    if (text.includes(' -')){
        const s = text.split(' -');
        const name = s[0];
        const money = parseInt(s[1])*(-1) || 0;
        return {name,money};
    } 
    const s = text.split(' +');
    const name = s[0];
    const money = parseInt(s[1]) || 0;
    return {name,money};
}
function turnToSelectOption(value: AppendTerm): SelectOption<AppendTerm> {
    return {value, label: appendTermLabel(value,true)}
}
function appendTermLabel(value: AppendTerm, zeroShow?: boolean): string{
    if (zeroShow && value.money === 0) {
        return `${value.name} (${(value.money>=0)? '+' : ''}${value.money} 元)`
    } else if (value.money !== 0) {
        return `${value.name}${` (${(value.money>0)? '+' : ''}${value.money} 元)`}`
    } else {
        return value.name
    }
}
export function EditGoodsCard(props: EditGoodsCardProps){
    
    const menuList:Array<SelectOption<GoodsData>> = useMemo(()=>{
        return props.menu.map((m)=> ({value: new GoodsData(m.name,m.money),label:m.name}));
    },[props.menu])
    const selectGoods:SelectOption<GoodsData> = useMemo(()=>{
        return {value: props.goods, label: props.goods.name}
    },[props.goods])

    const appendList: Array<SelectOption<AppendTerm>> = useMemo(()=>{
        const menu = props.menu.find((value)=> value.name === props.goods.name);
        if (!menu) return []
        return menu.appendMenu.map((value)=>turnToSelectOption(value))
    },[props.goods,props.menu]);
    
    const [note, setNote] = useState<string>(props.goods.note);
    const [orderNumber, setOrderNumber] = useState<string>(props.goods.number.toString());
    const [money, setMoney] = useState<string>(props.goods.money.toString());
    const [appendTerms, setAppendTerms] = useState<Array<SelectOption<AppendTerm>>>(
        props.goods.appendTermList.map((value)=>turnToSelectOption(value))
    )
    
    function onBlur(){
        // 將新的goods更新出去
        const newGoods: GoodsData = props.goods.clone();
        newGoods.money = parseInt(money) || 0;
        newGoods.number = parseInt(orderNumber) || 0;
        newGoods.note = note;
        props.editGoods(newGoods);
    }
    

    const cardRowStyle: CSSProperties = {
        display: 'flex',alignItems: 'center'
    }
    
    return(
        <div style={{border: '1px solid #80808044',margin: '20px 10px'}}>
            <div style={{display: 'flex', justifyContent: 'end'}}>
                <CloseButton onClick={props.delete}/>
            </div>
            <div style={{padding: '10px 40px 10px 10px', wordBreak: 'keep-all'}} >
                {
                    // 名稱改下拉選單 + 根據設定看可不可以自己新增/自己打
                    // 數量：限定數字，有左右鍵
                    // 金額，限定數字，除非是可以自己新增的，不然設為readonly
                    // 特製：[項目] [+/-][金額]
                    // 名稱：可新增
                    // isClearable={}
                }
                <p style={cardRowStyle}>名稱：
                    <CreatableSelect 
                        isClearable={false}
                        placeholder="請選擇項目"
                        options={menuList}
                        value={selectGoods}
                        onChange={(newValue)=>{
                            if(newValue !== null) props.editGoods(newValue.value); 
                        }}
                        filterOption={(option, inputValue)=>{
                            return option.label.includes(inputValue);
                        }}
                        styles={{
                            control:(provided,state)=>(
                                {...provided,
                                outline: 'none',
                                width:190,
                            })}} 
                        onCreateOption={(newValue)=>{
                            props.editGoods(new GoodsData(newValue,0))
                        }}
                        noOptionsMessage={(e)=>
                        (props.setting.canNewTerm)?'輸入項目新增': '無此項目'
                        }
                        isValidNewOption={(inputValue)=> props.setting.canNewTerm && inputValue!==''}
                        formatCreateLabel={(inputValue)=> `新增項目：${inputValue}`}

                    />   
                </p>
                <p style={cardRowStyle}>
                    <span style={cardRowStyle}>數量：
                    <FormControl 
                        size="sm"
                        disabled={!(props.goods?.name)}
                        value={orderNumber} 
                        type={"number"}
                        onChange={(event)=> setOrderNumber(parseInt(event.target.value)>0 ? parseInt(event.target.value).toString() : '')}
                        onBlur={onBlur}
                    />
                    </span>
                    <span style={{...cardRowStyle,marginLeft: '10px'}}>
                        單價：
                        <FormControl 
                            size="sm"
                            disabled={!(props.goods?.name)}
                            value={money} 
                            type={"number"}
                            onChange={(event)=> setMoney(parseInt(event.target.value)>0 ? parseInt(event.target.value).toString() : '')}
                            onBlur={onBlur}
                        />
                    </span>
                </p>
                <p style={cardRowStyle}>金額：
                    <FormControl
                        disabled
                        size="sm"    
                        type="number"
                        value={(parseInt(money) * parseInt(orderNumber)).toString()}
                        readOnly={true }
                    /> 
                </p>
                <p style={cardRowStyle}>特製：
                    <OverlayTrigger
                        trigger={['focus','hover']}
                        placement={'top'}
                        overlay={
                            <Tooltip>
                                格式：[項目] +[金額]<br/>
                                範例：加蛋 +5

                            </Tooltip>
                        }
                        onToggle={(nextShow)=>nextShow && props.setting.canNewTerm && props.goods?.name}
                    >
                        <CreatableSelect
                            isDisabled={props.goods.name === ''}
                            isMulti={true}
                            isClearable={false}
                            placeholder={(props.goods?.name)?"可選擇特製項目": '請先選擇項目名稱'}
                            options={appendList}
                            value={appendTerms}
                            onChange={(newValue)=>{
                                if(newValue !== null) setAppendTerms([...newValue])
                                else setAppendTerms([]);
                            }}
                            filterOption={(option, inputValue)=>{
                                const term =splitNameAndMoney(inputValue);
                                return option.label.includes(term.name);
                            }}
                            styles={{
                                control:(provided,state)=>(
                                    {...provided,
                                    outline: 'none',
                                    width:190,
                                })}} 
                            onCreateOption={(newValue)=>{
                                if(newValue !== null){
                                const newAppendTerm: AppendTerm = (typeof newValue === 'string')?  splitNameAndMoney(newValue):newValue ;
                                setAppendTerms((list)=> [...list, turnToSelectOption(newAppendTerm)])
                                }
                            }}
                            noOptionsMessage={()=> (props.setting.canNewTerm)?'輸入文字以新增項目': '無此項目'}
                            getNewOptionData={(inputValue)=>{
                                const term = splitNameAndMoney(inputValue);
                                const label =  `新增項目：${appendTermLabel(term,true)}`
                                return {label, 
                                        value:term}
                            }}
                            isValidNewOption={(inputValue)=> props.setting.canNewTerm && inputValue!==''}
                        /> 
                    </OverlayTrigger>  
                </p>
                {
                    props.setting.addNote && 
                    <p style={cardRowStyle}>備註：
                        <FormControl 
                            size="sm"
                            disabled={!(props.goods.name)}
                            value={note}
                            onChange={(event)=>setNote(event.target.value)}
                            onBlur={onBlur}
                        />
                    </p>
                }
            </div>
        </div>     
    )
}