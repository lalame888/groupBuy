import { PageState } from "@/interface";
import { THEME } from "@/styles/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, useMemo, useState } from "react"
interface ChildMenuProps {
    style?: CSSProperties
}

export function ChildMenu(props: ChildMenuProps){
    const menuStyle: CSSProperties = {
        marginBottom: '50px',
        display: 'flex', 
        justifyContent: 'center',
        ...props.style
    }
    const router = useRouter();
    const parentPath = router.pathname.split('\\')[1];
    const childrenPath = router.pathname.split('\\')[2];
    const pageMenu = useMemo(()=>{
        switch(router.pathname) {
            case PageState['開團']:
                return [
                {pageName: '開新團',page: 'NewOpen'},
                {pageName: '跟新團',page: 'JoinNew'},
                {pageName: '目前團單',page: 'NowGroup'},
                {pageName: '歷史團單',page: 'HistoryGroup'},
                ];
            case PageState['瀏覽商家']:
                return [
                    {pageName: '搜尋商家',page: 'SearchStore'},
                    {pageName: '收藏商家',page: 'StoreStore'}
                ]
            default: 
                return [];
        }
        
    },[parentPath])

    return (
        <div style={menuStyle}>
            {pageMenu.map((child)=>{
                return (
                    <ChildMenuButton
                        key={child.pageName}
                        buttonText={child.pageName}
                        to={child.page}
                        isActive={child.page === childrenPath}
                    />
                )
            })}
        </div>

    )
}


interface ChildMenuButtonProps {
    style?: CSSProperties
    buttonText: string;
    to: string
    isActive: boolean
}
export function ChildMenuButton(props: ChildMenuButtonProps){
    const [hover, setHover] = useState<boolean>(false);
    const style: CSSProperties = {
        width: '150px',
        wordBreak:'keep-all',
        display:'inline-flex',
        justifyContent: 'center',
        padding:'15px 20px',
        border: THEME.border,
        cursor: 'pointer',
        fontSize: '14px',
        color: '#212529',
        textDecoration:'none',
        ...props.style
    }
    
    return(
        <Link 
            href={props.to} 
            style={
                (props.isActive) ? {...style,backgroundColor: '#FFEEB0'} :
                (hover) ? {...style,backgroundColor: '#FEFFD8'}:
                style
            }
            onMouseEnter={()=>setHover(true)}
            onMouseOut={()=> setHover(false)}
        >
            {props.buttonText}
        </Link>
    )
}