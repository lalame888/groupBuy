import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { MyHoverButton } from "./HoverButton";
import { MyInput } from "../Input";
import { THEME } from "@/styles/theme";

export function ShareGroupButton(){
    const linkRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);
    function onCopy(text: string) {
        if (textRef.current) {
            textRef.current.style.display=''
            textRef.current.value = text;
            textRef.current.select();
            document.execCommand('copy');
            textRef.current.style.display='none'
        }
        if ( linkRef.current) {
            linkRef.current.select();
            document.execCommand('copy');
        }
       
    }
    return(
        <>
        <OverlayTrigger
            overlay={
                <Popover id="SharePopover" >
                    <Popover.Header as="h5" style={{fontSize:'15px'}}>分享連結</Popover.Header>
                    <Popover.Body >
                        <p style={{marginBottom: '3px'}}>點擊下方複製按鈕，</p>
                        <p style={{marginBottom: '5px'}}>分享給朋友即可邀請朋友加入團單！</p>
                        <div style={{fontSize:'14px',lineHeight: '15px', display: 'flex'}}>
                        <MyInput inputValue={`${location.href}`} readonly={true}  forwardRef={linkRef}/>
                        <MyHoverButton onClick={()=>onCopy(`${location.href}`)} style={{display: 'inline-flex', padding: '5px 10px', marginLeft: '5px',fontSize:'12px'}}>複製</MyHoverButton>
                        </div>
                    </Popover.Body>
                </Popover>
            }
            trigger="click"
            rootClose={true}
            placement="bottom-end"
        >
            <Button style={{borderRadius: THEME.buttonBorderRadius,fontSize: '16px'}}>
                <FontAwesomeIcon icon={faShareNodes} style={{marginRight: '10px'}}/> 
                邀請
            </Button>
        </OverlayTrigger>
        <textarea style={{display: 'none'}} ref={textRef}/>
        </>                    
            
    )
}