
import { StoreObject } from "@/interface";
import { CSSProperties, useState} from "react"
import { Modal } from "react-bootstrap";
import { MenuCanvas } from "./MenuCanvas";
import styled from "styled-components";

interface StoreMenuImageProps {
    store: StoreObject
}

const ImageDiv = styled.div`
        cursor: pointer;
        border: 1px solid transparent;
        max-width: 130px;
        height: fit-content;
        display: inline-flex;
        padding: 5px;
        &:hover{
            border: 1px solid gray;
        }
    `
export function StoreMenuImage(props: StoreMenuImageProps){
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const imageStyle: CSSProperties = {
        minWidth: '120px'
    }
    if (!props.store.menuImage?.length) return <span></span>
    return(   
        <>
            <ImageDiv>
                <img
                    style={imageStyle}
                    src={(props.store.menuImage)? props.store.menuImage[0] :''}
                    alt={props.store.name}
                    onClick={()=> setIsModalOpen(true)}
                />
            </ImageDiv>
            <Modal
                show={isModalOpen}
                onHide={()=> setIsModalOpen(false)}
                size="xl"
            >
                <Modal.Header closeButton>
                    <h3>{`${props.store.name}菜單 `}</h3>
                </Modal.Header>
                <Modal.Body>
                    <MenuCanvas menuImage={props.store.menuImage}/>
                </Modal.Body>
            </Modal>
        </>
    )
}