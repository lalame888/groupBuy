import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import React, { CSSProperties } from "react"
import { Button } from "react-bootstrap";
import  './msjh-normal.js'

interface ExportPdfButtonProps {
   style?: CSSProperties;
   onClick?(event: React.MouseEvent): void;
   tableId: string,
   saveName: string
}

export function ExportPdfButton(props:ExportPdfButtonProps): JSX.Element {
    function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        const doc = new jsPDF()
        autoTable(doc,{ html: `#${props.tableId}`,styles: { font: "msjh",halign: 'center',valign: 'middle',lineWidth: 0.1 } ,tableLineWidth:0.1})
       
        doc.save(`${props.saveName}.pdf`)
        if (props.onClick) props.onClick(e);
    }
    
    return (
        <Button variant="danger" style={props.style} onClick={onClick}>
            下載PDF
        </Button>

    )
}
