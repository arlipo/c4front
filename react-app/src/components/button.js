import React from 'react'
import { Text } from './test/MockData'

export default function ButtonElement({ caption, style, BGcolor, clickHandler }) {
    return (
        <div className="focusWrapper inlineBlock" style={style}>
            <button className= {`goCenter ${BGcolor}Color`} onClick={clickHandler}>
                {typeof caption === "object" ? caption : <Text value={caption}></Text>}
            </button>
        </div>
    )
}
