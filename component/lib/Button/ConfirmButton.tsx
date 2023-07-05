import React, {  forwardRef, useState } from "react"
import { Button, Modal } from "react-bootstrap";

interface ConfirmProps {
    onConfirm(): void
    children: JSX.Element,
    title?: string,
    text: string,
    confirmType?: 'delete'
}
export const Confirm = forwardRef<HTMLSpanElement, ConfirmProps>((props, ref)=>{
    const [show, setShow] = useState<boolean>(false);
    function open(){setShow(true)};
    function close(){setShow(false)};
    return (
        <>
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.title || ''}
                </Modal.Title>
                
            </Modal.Header>
            <Modal.Body>
                {props.text.split('\n').map((text,index)=>
                    <p key={index}>{text} </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={close}>返回</Button>
                <Button 
                    variant={props.confirmType === 'delete'? 'danger':"success"} 
                    onClick={()=>{props.onConfirm(); close()}}
                >
                    {props.confirmType === 'delete' ? '刪除': '確定'}
                </Button>
            </Modal.Footer>
            
        </Modal>
        <span onClick={open} ref={ref} style={{display: 'contents'}}>
            {props.children}
        </span>
        
        </>
    )

})

