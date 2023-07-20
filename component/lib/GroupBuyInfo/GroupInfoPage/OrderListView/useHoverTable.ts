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

    const hoverStyle: (index: number)=> CSSProperties = useCallback((index: number)=>{
        const style: CSSProperties = {
            backgroundColor: '#00000013'
        }
        if (index === hoverIndex) {
            return style
        } 
        else return {}
    },[hoverIndex])

    return ({
        onMouseEnter,onMouseLeave,hoverStyle
    })
}