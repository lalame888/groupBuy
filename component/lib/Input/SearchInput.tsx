import { THEME } from "@/styles/theme";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";

interface SearchInputProps {
    style?: CSSProperties
    onChange(newInput: string): void
    value: string
}

export function SearchInput(props: SearchInputProps){ 
    const [searchInput , setSearchInput] = useState<string>('');
    const [iconHover, setIconHover] = useState<boolean>(false);
    useEffect(()=>{setSearchInput(props.value)},[props.value])
    
    const style: CSSProperties = {
        border: THEME.border,
        borderRadius: THEME.buttonBorderRadius,
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 15px',
        ...props.style
    }
    const searchInputStyle: CSSProperties = {
        backgroundClip: 'unset',
        outline: 'none',
        borderColor: 'transparent',
        border: '0px solid transparent',
        boxShadow:'unset',
        backgroundColor: 'transparent',
        width: '90%'
    }
    const iconStyle: CSSProperties = {
        cursor: 'pointer',
        color: (iconHover)? '#489A81': 'inherit'
    }

    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
        if (event.key === 'Enter' || event.key === 'NumberEnter'){
            event.preventDefault();
            props.onChange(searchInput)
        }
    }
    return (
        <div style={style}>
            <input 
                type="search"
                value={searchInput}
                onKeyDown={onKeyDown}
                onChange={(e)=> {
                    const value = e.target.value;
                    setSearchInput(value)
                    if (value === '') props.onChange(value);
                }}
                style={searchInputStyle} 
                placeholder={'Search...'}
            />
            <FontAwesomeIcon 
                icon={faSearch}
                onMouseEnter={()=> setIconHover(true)}
                onMouseLeave={()=> setIconHover(false)}
                onClick={()=> props.onChange(searchInput)}
                style={iconStyle}
            />
        </div>
    )
}