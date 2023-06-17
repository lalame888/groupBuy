import Link from "next/link";
import { useRouter } from "next/router";
import { CSSProperties, useState } from "react";


interface NavLinkProps {
    to: string,
    children: React.ReactNode
}
export function NavLink(props: NavLinkProps){
    const [isHover, setIsHover] = useState<boolean>(false);
    const router = useRouter();
    const navLinkStyle: CSSProperties = {
        flexFlow: 'column',
        fontSize: '17px',
        textAlign: 'center',
        justifyContent: 'center',
        display: 'flex',
        height: '50px',
        whiteSpace: 'nowrap',
        minWidth:'140px',
        userSelect:'none',
        color: '#212529',
        textDecoration:'none'
    }
    const usingLinkStyle : CSSProperties = {
        ...navLinkStyle,
        backgroundColor: 'white',

    }
    return (
        <Link href={`${props.to}`}>
            <div 
                style={(router.pathname ===props.to || isHover)?usingLinkStyle:navLinkStyle}
                onMouseEnter={()=> setIsHover(true)}
                onMouseLeave={()=> setIsHover(false)}
            >
                {props.children}
            </div>
        </Link>
    )

}