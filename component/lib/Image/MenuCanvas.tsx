
import { CSSProperties, useEffect, useState } from "react";
import { Cropper } from "react-cropper";
import { Carousels } from "../Button";

interface MenuCanvasProps {
    menuImage: Array<string>
    style?: CSSProperties
}

// TODO: 尺寸很奇怪，希望寬高都限制在螢幕畫面中不要滾輪
export function MenuCanvas(props: MenuCanvasProps){
    const [index, setIndex] = useState<number>(0);
    useEffect(()=>{ // 更變了資料之後改成回到第一頁
        setIndex(0);
    },[props.menuImage]);

    function changeImage(offset: number) {
        const newIndex = index + offset;
        if (newIndex >= props.menuImage.length) {
            setIndex(0);
        } else if (newIndex<0) {
            setIndex( props.menuImage.length-1);
        } else {
            setIndex(newIndex);
        }
    }
    const hasPagination: boolean = props.menuImage.length > 1;

    function quickKey(this: Window,event: KeyboardEvent): void {
        const keyCode: string = event.code;
        const target: any = event.target;
        if (target.classList.contains('modal') === false &&  // 不是正在操作modal的時候
           ( ['INPUT','SELECT','TEXTAREA'].indexOf(target.tagName) === -1  )  // 當目前target（非input、select） 
        ) {
            if (keyCode === 'ArrowRight') {  // 方向鍵往右 : 切下一頁
                event.preventDefault();
                changeImage(1)
            } else if (keyCode === 'ArrowLeft') { // 方向鍵往左 : 切上一頁
                event.preventDefault();
                changeImage(-1)
            }
        }
	}
	// 監聽快捷鍵事件
	useEffect(()=>{
		window.addEventListener('keydown',quickKey);
		return ()=>{window.removeEventListener('keydown', quickKey);}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[props.menuImage,index])

    return(
        <div style={{maxWidth: '90%',maxHeight: '80vh', ...props.style}}>
            {
                (hasPagination) &&
                <div style={{display: 'flex', justifyContent: 'flex-end',alignItems:'center'}}>
                    <span style={{fontSize: '18px', marginBottom:'10px'}}>第 {index+1} 頁 / 共 {props.menuImage.length} 頁</span>
                </div>
            }
            <div style={{display: 'flex',position: 'relative'}}>
                {
                    (hasPagination) &&
                    <Carousels
                        style={{left:'10%',width:'10%',marginLeft: '-10%'}}
                        direct="left"
                        onClick={()=> changeImage(-1)}
                    />
                }
                    <Cropper
                        src={props.menuImage[index]}
                        checkOrientation={true}
                        style={{left: hasPagination?'calc(max(10%,80px))': '0px',position: 'relative',width: '100%'}}
                        dragMode="move"        // 移動模式
                        preview=".preview"     // 預覽圖的selector
                        guides={false}          // 出現格線
                        cropBoxMovable={false}  // cropBox不能移動
                        cropBoxResizable={false}  //cropBox不能縮放
                        toggleDragModeOnDblclick={false}   // 雙擊不要切換dragMode
                        autoCrop={true}         
                        autoCropArea={1} 
                        ready={(e)=>{
                            if(e.target) {
                                const target: any = e.target
                                target.cropper.clear()
                            }
                        }}
                        wheelZoomRatio={0.1}    
                        viewMode={0}            // 沒有限制框內一定要有切到圖
                        highlight={false}   // 顯示的圖片不要白白的 (不要有opacity=0.1 的白色濾鏡)
                    />
                {
                    (hasPagination) &&
                    <Carousels
                        style={{width:'10%',left:'calc(max(10%, 80px) + 100%)',marginLeft:0}}
                        direct="right"
                        onClick={()=> changeImage(1)}
                    />
                }
                </div>
            </div>
        
            
    )
}