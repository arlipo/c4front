import React, {useState, createElement as $} from 'react';
import HighlightProvider from '../../providers/HighlightProvider';
import { ImageElement } from '../image';
import { GridRoot, GridCell, GridCol, Highlighter } from "../../main/vdom-list.js";
import { createSyncProviders } from '../../main/vdom-hooks';
import { Text, ByCell, ProjectCell, StockCell, NumMarkCell, LocationCell } from "./MockData.js";
export const rowKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20,21,22,23,24,25,26,27,28,29,30].map(k => "r" + k)
export default function VdomListElement() {
    const [state, setState] = useState({ enableColDrag: false })
    const { enableColDrag } = state

    const exCol = (colKey, hideWill, minWidth, maxWidth, caption) => $(GridCol, {
        key: ":" + colKey, colKey, hideWill, minWidth, maxWidth, 
        ...(
            colKey === "drag" ? {isDrag: true} : colKey === "expand" ? { isExpander: true, canDrag: enableColDrag  } :
                { caption, canDrag: enableColDrag }
        )
    })

    const cols = [
        exCol("c0", 1, 21, 30, "By"),
        exCol("expand", 0, 1.5, 5, "Expand"),
        exCol("c1", 1, 10, 15, "Project"),
        exCol("c2", 2, 10, 15, "Stock"),
        exCol("c3", 2, 5, 5, "Cargo"),
        exCol("c4", 3, 5, 5, "By"),
        exCol("c5", 3, 5, 5, "Out"),
        exCol("c6", 2, 5, 5, "Remains"),
        exCol("c7", 2, 5, 5, "In"),
        exCol("c8", 2, 5, 6, "Container"),
        exCol("c9", 1, 10, 15, "Number/Marking"),
        exCol("c10", 1, 7, 10, "Location"),
        exCol("drag", 0, 2, 5, "")
    ];
    
    const exCell = rowKey => col =>
        $(GridCell, {
            key: ":" + rowKey + col.key, rowKey, colKey: col.props.colKey,
            ...(col.props.colKey === "drag" ? { /*isRowDragHandle: true,*/isDrag:true, style: { userSelect: "none", cursor: "pointer" } } : {}),
            ...(col.props.colKey === "expand" ? { isExpander: true } : {}),
            ...(col.props.colKey === "c8" ? { style: { paddingRight: "3vw" } } : {}),
            children: [
                col.props.colKey === "expand" ? getExpanderElement() :
                    col.props.colKey === "drag" ? getDragElement() :
                        col.props.colKey === "c0" ? ByCell() :
                            col.props.colKey === "c1" ? ProjectCell() :
                                col.props.colKey === "c2" ? StockCell() :
                                    col.props.colKey === "c8" ? getCargoIconCell() :
                                        col.props.colKey === "c9" ? NumMarkCell() :
                                            col.props.colKey === "c10" ? LocationCell() :
                                                <Text value={col.props.colKey + rowKey} key="defaultCell"></Text>
            ]
        })


    function getExpanderElement() {
        return <ImageElement color="#90929F" className="expanderElement" src='/icons/downarrowrow.svg' key="expander"/>
    }

    function getCargoIconCell() {
        return $(ImageElement, { className: "rowIconSize", src: '/icons/container.svg', key: "cargoIconCell" })
    }

    function getDragElement() {
        return <ImageElement color="#90929F" className="dragElement" src='/icons/drag.svg' key="dropElem"/>
    }
    const maxTableWidth = cols.filter(head=>head.key!==":expand").reduce((acc,head)=>acc + head.props.maxWidth, 0)*16
    const listEl = $(GridRoot, {
        key: "list",
        identity:  {},
        cols,
        children: rowKeys.flatMap(rowKey => cols.map(exCell(rowKey))),
        rowKeys,
        maxTableWidth
    })

    const children = [
        listEl,
        <Highlighter key="row-highlighter" attrName="data-row-key" />,
        <Highlighter key="col-highlighter" attrName="data-col-key" />
        // <div className="test">test </div>
    ]

    const childrenWithHighlight = <HighlightProvider children={children}/>
    const sender = { enqueue: () => { } }
    const ack = null

    return createSyncProviders({ sender, ack, children: childrenWithHighlight })
}

        // const containerElement = document.createElement("div")
        // document.body.appendChild(containerElement)
        // ReactDOM.render($(App), containerElement)