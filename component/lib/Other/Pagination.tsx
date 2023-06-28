import React, { CSSProperties } from "react";
import { Form, Pagination } from "react-bootstrap";

interface PaginationProps {
    maxPageNumber: number,
    nowPageNumber: number,
    setPageNumber(index: number): void,
    style?: CSSProperties

}

export function MyPagination(props: PaginationProps) {
    const basicNumber = Math.floor((props.nowPageNumber -1 )/10) *10;

    function toPage(pageNumber: number): void {
        props.setPageNumber(pageNumber);
        window.scrollTo({
            top:0,
            behavior: undefined
        });  //回上方
    }

    return (
        <div style={{margin:'30px 0px',display: 'flex', justifyContent:'center' }}>
                    <Pagination>
                        {(props.nowPageNumber>1) && 
                            <Pagination.First 
                                onClick={()=>{toPage(Math.max(props.nowPageNumber-10,1))}} 
                            />
                        }
                        {(props.nowPageNumber>1) && 
                            <Pagination.Prev 
                                onClick={()=>{toPage(props.nowPageNumber-1)}} 
                            />
                        }
                        {Array.from(Array(Math.min(12,props.maxPageNumber)).keys(),(i)=>i).map((number)=>{
                            const showPage =(basicNumber ===0)?(basicNumber+ number +1) : (basicNumber+ number);
                            if (showPage>props.maxPageNumber) {return null}
                            if (basicNumber === 0 && showPage ===12) {return null}

                            return (
                                    <Pagination.Item 
                                        key={showPage}
                                        onClick={()=>{toPage(showPage)}}
                                        active={(showPage)=== props.nowPageNumber}
                                    >
                                        {showPage}
                                    </Pagination.Item>)
                        })}
                        {(props.nowPageNumber<props.maxPageNumber) && 
                            <Pagination.Next 
                                onClick={()=>{toPage(props.nowPageNumber+1)}} 
                            />
                        }
                        {(props.nowPageNumber<props.maxPageNumber) && 
                            <Pagination.Last 
                                onClick={()=>{toPage(Math.min(props.nowPageNumber+10,props.maxPageNumber))}} 
                            />
                        }
                    </Pagination>
                </div>  
    )
}

export function PaginationSelector(props: PaginationProps) {
    const style: CSSProperties = {
        marginLeft: '20px',
        textAlign: 'center',
        width: '170px',
        fontSize: '18px',
        ...props.style
    }
    
    return (
        <Form.Select
                value={props.nowPageNumber}
                onChange={(e)=>{
                    const value = parseInt(e.target.value)
                    if (!isNaN(value)) props.setPageNumber(value)
                }}
                style={style}
            >
                {Array.from(Array(props.maxPageNumber)).map((value,index)=>
                    <option key={index} value={index+1}>第 {index+1} 頁</option>
                )}    
        </Form.Select>  
    )
    
}