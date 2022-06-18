import * as React from "react";
import "./Pointer.css";

interface IPointerProps {
    style?:React.CSSProperties;
    text?:string;
    bottom_text?:string;
    onClick?:() => void;
}

export function Pointer(props:IPointerProps) {
    return (
        <div className={"pointer"} style={props.style} onClick={props.onClick}>
            {props.text && <div className={"pointer-text"}><a href="#head">{props.text}</a></div>}
            {props.bottom_text && <div className={"bottom-text"}>{props.bottom_text}</div>}
        </div>
    );
}