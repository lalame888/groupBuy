import { THEME } from "@/styles/theme";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";

interface SearchInputProps {
    style?: CSSProperties
    onChange(newInput: string): void
    value: string
}

export function SearchInput(props: SearchInputProps){ 
    const [searchInput , setSearchInput] = useState<string>('');
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


    function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
        if (event.key === 'Enter' || event.key === 'NumberEnter'){
            event.preventDefault();
            props.onChange(searchInput)
            console.log('d')
        }
    }

    const SearchIcon = styled(FontAwesomeIcon as any)`
        cursor: pointer;
        &:hover{
            color: #489A81;
        }
    `
    return (
        <div style={style}>
            <input 
                type="search"
                value={searchInput}
                onKeyDown={onKeyDown}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                    const value = e.target.value;
                    setSearchInput(value)
                    if (value === '' ) props.onChange(value);
                }}
                style={searchInputStyle} 
                placeholder={'Search...'}
            />
            <SearchIcon 
                icon={faSearch}
                onClick={()=> props.onChange(searchInput)}
            />
           
        </div>
    )
}