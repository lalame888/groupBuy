import { CSSProperties, useCallback, useState } from "react";

export function useHoverTable(){
    const [hoverIndex, setHoverIndex] = useState<number>(-1);
    
    const onMouseEnter = useCallback((index: number)=>{
        setHoverIndex(index);
    },[])
    const onMouseLeave = useCallback((index: number)=>{
        setHoverIndex((oldIndex)=>{
            if (oldIndex === index) return -1
            else return oldIndex
        });
    },[])

    const hoverStyle: (index: number, textAlign?: 'default' | 'center')=> CSSProperties = useCallback((index: number, textAlign = 'default')=>{
        const centerStyle: CSSProperties = {
            verticalAlign: 'middle',
            textAlign: 'center'
        }
        const style: CSSProperties = {
            backgroundColor: '#00000013',
        }
        if (index === hoverIndex) {
            return {...style, ...((textAlign=== 'center')?centerStyle :{})}
        } 
        else return {...(textAlign=== 'center')?centerStyle :{}}
    },[hoverIndex])

    return ({
        onMouseEnter,onMouseLeave,hoverStyle
    })
}