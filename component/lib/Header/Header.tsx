import { PageState, UserInfo } from "@/interface"
import { useReduxSelector } from "@/redux";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "./NavLink";


export function Header() {
    const userInfo: UserInfo | null | undefined = useReduxSelector((state)=> state.userInfo);
    const appName = `輕鬆開好團`;
    const loginUrl = '../login'; // TODO: 登入
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

    const toggleBottonStyle: CSSProperties = {
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
                    <Navbar.Toggle aria-controls="navbarScroll" style={toggleBottonStyle}/>
                    <Navbar.Collapse  id="navbarScroll" style={{justifyContent: 'space-between',backgroundColor: '#7acac5'}}>
                        <Nav>
                            {
                                (userInfo)&&
                                <>
                                    {Object.entries(PageState).map(([key,value])=>{
                                        return (
                                            <NavLink 
                                                to={`/${value}`} 
                                                key={value}
                                            >
                                                {key}
                                            </NavLink>
                                        )
                                    })}
                                </>
                            }
                        </Nav>
                        <Nav>
                            { (userInfo) ?  // TODO: 之後變成下拉選單
                                    <Nav.Item style={loginIdStyle}>
                                        <img  alt='登入頭像' style={userImageStyle} src={(userInfo.pictureUrl)? userInfo.pictureUrl : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEXFxcX////CwsLe3t7b29vT09Pn5+f19fXOzs77+/vJycnw8PDq6urt7e0K8aSoAAAE+klEQVR4nO2di5qqMAyEsQpy0fd/3WOXZYuKCiTpTD35n8D50maS0NaqchzHcRzHcRzHcRzHcRzHcRzHcRzHcRzHcRwHQJiD/jHa3CT17enYNEPk0hxPdV99j8wQ2uO16w4PdOem/gaVoaqvT+ISw7EtWmSU91rdFMtTW6rG0J/eRG/Opa0KFBn6yzp5P5xPpUkM1XGDvsjQF6UxrF2fcy7laAzt5/yyRFfKUg2nXfoi1zIkNrsF3sLI7xyhPQsE3jiiFXwgtDtSzINE6iiGWqrvwL0ZBTlmzoDW8RIlgbcKhzSKKkt0hHShtmoCD4cGLWaJXpxF5zBmVKEPPlKzSQySSmaJDq3oAbU0mjijNd0jL2WeodqKYUs/v5oeLSthsEYjRMYfDNZohCafGoWQKNn0RgJpko26Fc7gSDa65do9FEE024WRgUGhdkF6T41WV+k2Tc8QBNGmnEngc42V20/g5+B6o4tl4MvU0gxHwALNFyk+m9pm0kiDXaamdj8C7qGsvSKC9YtgWtCMtFCFlXmiQTuiXWuYwKYaa7+PQD0/QyoFJ9Ow9dTMHjpXaKowgx0eDq7QFbrC/1yhef8LV/j9bpGjpoEq/P669D/oLb6/P8zR42OHbWHfie5NgOc09naBPjpkPy+9oMf65qkG/WnGvjJFf14zr2rwx4asPR9/ViEMtgrBE++IbWkK/0AaMc2m+EVqbPpoux+xzDUMIbStTQnyTMSucoNXbL+YzaM6dD3zRzBSiC5JE0bpFDuCesCk1ac55l2pXltLcF1gM0g2HGaf0C/A6W51a1c2HNXMHOWtyLUJR1S7fc7LzoquyFPM3KOXUNFKXqI0eOtIOoolVKLYUb9To7AXB9I9OCHOqFe0go8In2/hM/ol9uebAh7g+WHXO1gR/hU6EXbZRsfUD35k23t0P/p4RhZrCOG01RmvdUFPRIaq2bMRu6aM1xNDqPfbxZk/kDd9smZ/INcoid8sjmgZL9HQx6wx9HrDKManPoPyPLFh245aCzTBtlQtTtVc0KISCs9BLkLTaRh+yCfpFi0P1BDMTa1W6AR8pWY4rA8+BJ3jvgV0M2a5MoN8CDPLracD0BkznGL/BTOiynER4Q/IOdqcAiGP0+VboiPZF2quJJPIm27y3Kx8IOcNL4jAnBKz3KtcIlcBF+xvAr0iVxkOE5jpCENWp38kh/ODssyEfbYxOWe5BfMRXI6rze8xPqphfctpBbb3hGBOOMfUFfFrNGK4TqFGkbCzjCxzpzXYzabQyv4w0gf2+jlGvo/2+jkmL0kQWGHCwhTh5do9FsVbhndaNqB/o4bGKSbUHcP+zeeNaF/dowuhfhDZQqi9EwlDqB1EvhAqB5HLCycUCxuqciahWNjgRsDvUbsfRZlnInq5Bq3kJUr6yGruOUr1N8l0ZgmliQ3HgG0ZlbEb0fDiGZ1xBu8iVTqiwWqGIwqWSGuGIwqWSNf63qPQCDNn0og4m1J8bXqH+EsUaVuRkDcY3NtQoQ/m9oqI0C+oC5oRYVmT4zVrIdK3eti3oXgj8m9D4Uakd8OIyBELSDTCVEPc3idkjT5/ohGmmhISjSjVFJFoRKmGvPudEHTB9I3FiKC9KCKVipIp+QRjQjLJQP/2lewXyD6jmdg/q+H9JHPP7o/BhdihwBALsUOBIRbRWUR2dxd5/qFSgd1/MFBISfOhqPkHhUBa66YjQ/cAAAAASUVORK5CYII='}/>
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
