import React, {  useState } from "react"
import { Button, Modal } from "react-bootstrap";

interface ConfirmProps {
    ref?: React.RefObject<HTMLSpanElement>
    onConfirm(): void
    children: JSX.Element,
    title?: string,
    text: string,
    confirmType?: 'delete'
}

export function Confirm(props:ConfirmProps): JSX.Element {
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
        <span onClick={open} ref={props.ref} style={{display: 'contents'}}>
            {props.children}
        </span>
        
        </>
    )
}

