import React, {useState, useMemo, createElement as $} from 'react';
import { FilterArea, FilterExpander, PopupContext, em } from '../../main/vdom-filter.js';
import InputElement from '../input';
import ButtonElement from '../button';
import SvgElem from '../svg';
import { Text } from './MockData.js';
import { rowKeys } from './VdomListElement.js';

export default function VdomFiltersElement() {

    

    function FilterButton({ minWidth, content, BGcolor }) {
        return <ButtonElement style={{ display: "flex", flexBasis: em(minWidth)  }} caption={content} BGcolor={BGcolor || "primary"}/>
        //return $("div", { style: { display: "flex", flexBasis: minWidth + "em", border: "1px solid blue" } }, "B");
    }
    function FilterItem({ value }) {

        return (
            <InputElement value={value} style={{ border: "1px solid blue", height: "100%", boxSizing: "border-box" }} />
            // <div className="inputLike" style={{ border:"1px solid blue",height:"100%",boxSizing: "border-box" }}>
            //     <label>{value}</label>
            //     <input style={{ width: "100%" }}></input>
            // </div>
        )
    }

    function ModeButton({ setState, dataKey }) {
        return $("button", { onClick: () => setState(was => ({ ...was, [dataKey]: !was[dataKey] })) }, dataKey);
    }

    const [state, setState] = useState({});
    const { noFilters, showAll } = state;
    const canHide = !showAll;
    const [popup, setPopup] = useState(null);
    const identities = useMemo(() => ({ lt: {}, rt: {} }), []);

    return $(PopupContext.Provider, { value: [popup, setPopup] },
        $(ModeButton, { key: "showAll", setState, dataKey: "showAll" }),
        $(ModeButton, { key: "noFilters", setState, dataKey: "noFilters" }),
        $("div", { style: { height: "2em" } }, "BEFORE"),
        $(FilterArea, {
            key: "app",
            filters: noFilters ? [] : [
                $(FilterItem, { key: 1, value: "Number/Marking", minWidth: 7, maxWidth: 10, canHide }),
                $(FilterItem, { key: 2, value: "Location", minWidth: 5, maxWidth: 10, }),
                $(FilterItem, { key: 3, value: "Location Feature", minWidth: 8, maxWidth: 10, }),
                $(FilterItem, { key: 4, value: "Mode", minWidth: 3, maxWidth: 10, }),
                $(FilterItem, { key: 5, value: "From", minWidth: 3, maxWidth: 10, canHide }),
            ],
            buttons: [
                $(FilterExpander, {
                    key: 0, minWidth: 2, area: "lt", identity: identities.lt, optButtons: [
                        $(FilterButton, { key: 7, minWidth: 4, content: <SvgElem viewBox="0 0 267.21933 220.30299" path = "m 189.20991,110.151 75.737,-93.534 c 2.473,-3.056 2.972,-7.261 1.278,-10.809 -1.692,-3.549 -5.274,-5.808 -9.205,-5.808 h -84.952 c -3.078,0 -5.99,1.389 -7.926,3.781 l -30.532,37.706 -30.532,-37.706 C 101.14191,1.389 98.22891,0 95.15191,0 h -84.952 C 6.2689098,0 2.6869098,2.259 0.99390982,5.808 c -1.693,3.548 -1.194,7.754 1.27899998,10.809 L 78.00991,110.151 2.2729098,203.685 c -2.47399998,3.056 -2.97199998,7.261 -1.27899998,10.809 1.69299998,3.548 5.27399998,5.808 9.20600018,5.808 h 84.952 c 3.077,0 5.99,-1.389 7.926,-3.781 l 30.532,-37.705 30.531,37.706 c 1.936,2.392 4.849,3.781 7.926,3.781 h 84.953 c 3.931,0 7.513,-2.259 9.205,-5.808 1.693,-3.548 1.195,-7.754 -1.279,-10.809 z m -12.277,-89.753 h 58.706 l -59.553,73.545 -29.352,-36.25 z m -86.646,179.506 h -58.706 l 59.552,-73.545 29.352,36.25 z m 86.646,0 -145.352,-179.506 h 58.706 l 145.351,179.506 z"/> }),
                        $(FilterButton, { key: 6, minWidth: 4, BGcolor: "lightPrimary", content: <Text value={"XML (Only for dev, by AKU)"} key="t1"></Text>}),
                    ]
                }),
                $(FilterButton, { key: 1, minWidth: 2, area: "lt", content: <Text value={"Rows"} key="t1"></Text> }),
                $(FilterButton, { key: 2, minWidth: 2, area: "lt", BGcolor: "green", content: <Text value={rowKeys.length} key="t2"></Text> }),
                $(FilterButton, { key: 3, minWidth: 2, area: "lt", content: <SvgElem viewBox="0 0 17.5 19" path = "M6.74648 10.3648C6.84683 10.471 6.90585 10.6068 6.90585 10.7543V19.0001L10.4473 15.9721V10.7543C10.4473 10.6068 10.5063 10.471 10.6067 10.3648L16.5977 3.83667H0.755493L6.74648 10.3648Z M17.3532 0H0V2.6561H17.3532V0Z"/> })
            ],
        })
    )

}
