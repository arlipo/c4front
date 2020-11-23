import React from 'react'
import { Text } from './test/MockData'

export default function ButtonElement({ caption, style, BGcolor }) {
    return (
        <div className="focusWrapper inlineBlock" style={style}>
            <button className= {`goCenter ${BGcolor}Color`}>
                {typeof caption === "object" ? caption : <Text value={caption}></Text>}
            </button>
        </div>
    )
}
