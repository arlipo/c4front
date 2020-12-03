import React from 'react'
import { FilterArea, PopupContext, FilterButtonExpander, em } from '../../main/vdom-filter.js'
import InputElement from '../input'
import ButtonElement from '../button'
import { Text } from './MockData.js'
import { rowKeys } from './VdomListElement.js'
import { ImageElement } from '../image.js'

const { createElement: $, useState, useMemo } = React

export default function VdomFiltersElement() {



    function FilterButton({ flexBasis, content, BGcolor, onClick, minWidth }) { 
        return <ButtonElement style={{ display: "flex", flexBasis: em(flexBasis), minWidth: em(minWidth)  }} clickHandler={onClick && onClick} caption={content} BGcolor={BGcolor || "primary"}/>
        //return $("div", { style: { display: "flex", flexBasis: minWidth + "em", border: "1px solid blue" } }, "B");
    }
    function FilterItem({ nonEmpty, value }) {

        return (
            <InputElement value={value} style={{ border: "1px solid blue", height: "100%", boxSizing: "border-box" }} />
            // <div className="inputLike" style={{ border:"1px solid blue",height:"100%",boxSizing: "border-box" }}>
            //     <label>{value}</label>
            //     <input style={{ width: "100%" }}></input>
            // </div>
        )
    }

    function ModeButton({ setState, dataKey, minWidth, content, area }) {
        return $(FilterButton, { key: dataKey, minWidth, content, area, onClick: () => setState(was => ({ ...was, [dataKey]: !was[dataKey] })) }, dataKey)
    }


    const [state, setState] = useState({})
    const { noFilters, showAll } = state
    const canHide = !showAll
    const [popup, setPopup] = useState(null)
    const identities = useMemo(() => ({ lt: {}, rt: {} }), [])

    return $(PopupContext.Provider, { value: [popup, setPopup] },
        $("div", { style: { height: "5em" } }, "BEFORE"),
        $(FilterArea, {
            key: "app",
            filters: noFilters ? [] : [
                $(FilterItem, { key: 1, value: "Number/Marking", minWidth: 7, maxWidth: 10 }),
                $(FilterItem, { key: 2, value: "Location", minWidth: 5, maxWidth: 10 }),
                $(FilterItem, { key: 3, value: "Location Feature", minWidth: 8, maxWidth: 10, canHide }),
                $(FilterItem, { key: 4, value: "Mode", minWidth: 3, maxWidth: 10 }),
                $(FilterItem, { key: 5, value: "From", minWidth: 3, maxWidth: 10, canHide }),
            ],
            buttons: [
                $(FilterButtonExpander, {
                    key: 0, minWidth: 2, area: "lt", identity: identities.lt, optButtons: [
                        $(ModeButton, { key: "noFilters", setState, dataKey: "noFilters", flexBasis: 4, minWidth: 2, content:  <ImageElement src="/icons/hidefilters.svg" className="hideFilterIcon" key="hideFiltersImage" color="#ffffff"/>}),
                        $(FilterButton, { key: 6, flexBasis: 4, minWidth: 15, BGcolor: "lightPrimary", content: <Text value={"XML (Only for dev, by AKU)"} key="t1"></Text>}),
                    ]
                }),
                $(FilterButton, { key: 1, flexBasis: 2, area: "lt", minWidth: 6, content: <Text value={"Rows"} key="t1"></Text> }),
                $(FilterButton, { key: 2, flexBasis: 2, area: "lt", minWidth: 4, BGcolor: "green", content: <Text value={rowKeys.length} key="t2"></Text> }),
                $(ModeButton, { key: "showAll", setState, dataKey: "showAll", flexBasis: 2, minWidth: 2, area: "lt", content: <ImageElement src="/icons/filterbutton.svg" className="filterButtonIcon" key="filterbuttonFiltersImage" color="#ffffff"/> })
            ],
        })
    )

}
