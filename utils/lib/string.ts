/**
* 轉半形字元
*/
export function toSBC(str: string) {
    let result = "";
    const len: number = str.length;
    for (let i=0;i<len ;i++ )
    {
        let cCode: number = str.charCodeAt(i);
        //全形與半形相差（除空格外）：65248（十進位制）
        cCode = (cCode>=0xFF01 && cCode<=0xFF5E)?(cCode - 65248) : cCode;
        //處理空格
        cCode = (cCode===0x03000)? 0x0020 : cCode;
        result += String.fromCharCode(cCode);
    }
    return result;
 }

export function getTimeString(time: Date| undefined | string) : string {
    if (time === undefined) return ''
    if (typeof(time) === 'string') {
        time = new Date(time)
    }
    return `${time.toLocaleDateString()} ${time.toLocaleTimeString('en-GB')}`
}