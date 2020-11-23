import React from 'react';
const xmlns = 'http://www.w3.org/2000/svg';
export default function SvgElem({viewBox, path }){
    return (
        <svg viewBox={viewBox} xmlns={xmlns}>
            <path style={{fill:"#ffffff"}} d={path}/>
      </svg>
    )
}