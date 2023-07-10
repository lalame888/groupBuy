import { UserInfo } from "@/interface"
import { useReduxSelector } from "@/redux";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "./NavLink";
import { DEFAULT_USER_IMAGE } from "@/data";
import { useRouter } from "next/router";
import { PageRoute, PageState } from "@/feature";


export function Header() {
    const userInfo: UserInfo | null | undefined = useReduxSelector((state)=> state.userInfo);
    const appName = `輕鬆開好團`;
    const router = useRouter();
    const path = router.pathname.split('/')[1];
    const loginUrl = '../login'; // TODO: 登入頁面
    const style: CSSProperties = {
        color: '#ddd',
        backgroundColor: '#7acac5',
        fontSize: '15px',
        fontFamily: '微軟正黑體',
        marginBottom: '20px',
        position:'sticky',
        top:'0px',
        width:'100%',
        height: '50px',
        zIndex:2,
        display: 'inline-flex',
        alignItems: 'center'
    }
    const appNameStyle: CSSProperties = {
        fontSize: '18px',
        marginRight: '70px'
    }

    const toggleButtonStyle: CSSProperties = {
        fontSize: '15px'
    }

    const userImageStyle: CSSProperties = {
        borderRadius : '100px',
        width: '35px'
    }
    
    const loginIdStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '20px',
        marginRight: '10px',
        whiteSpace: 'nowrap',
        cursor: 'pointer'
    }
    
    const userNameStyle: CSSProperties = {
        color: 'black',
        marginLeft: '20px'
    }
    return (
        <div style={style} id="Header">
            <Container>
                <Navbar variant="light" expand="md" >
                    <Navbar.Brand style={appNameStyle}>{appName}</Navbar.Brand> 
                    <Navbar.Toggle aria-controls="navbarScroll" style={toggleButtonStyle}/>
                    <Navbar.Collapse  id="navbarScroll" style={{justifyContent: 'space-between',backgroundColor: '#7acac5'}}>
                        <Nav>
                            {
                                (userInfo)&&
                                <>
                                    {Object.entries(PageState).map(([key,value])=>{
                                        return (
                                            <NavLink 
                                                to={`/${value}/${PageRoute.defaultChild(value).page}`}  
                                                key={value}
                                                isActive={path === value}
                                            >
                                                {key}
                                            </NavLink>
                                        )
                                    })}
                                </>
                            }
                        </Nav>
                        <Nav>
                            { (userInfo) ?  // TODO: 之後變成下拉選單 // TODO: 個人資料設定頁面
                                    <Nav.Item style={loginIdStyle}>
                                        <img  alt='登入頭像' style={userImageStyle} src={(userInfo.pictureUrl)? userInfo.pictureUrl : DEFAULT_USER_IMAGE}/>
                                        <span style={userNameStyle}>{userInfo.userName}
                                            <FontAwesomeIcon style={userNameStyle} icon={faChevronDown}></FontAwesomeIcon>
                                        </span>
                                    </Nav.Item>
                                : 
                                <Nav.Link href={loginUrl} style={{marginLeft: '10px'}}>
                                    登入
                                </Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>  
        </div>
    );
}
export default Header;
