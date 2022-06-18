import * as React from "react";
import "./Title.css";

interface ITitleProps {
    text:string;
    secondary_text?:string;
}

export function Title(props:ITitleProps) {
    return (
        <div className={"title"}>
            <div className={"first-text"}>{props.text}</div>
            <div className={"secondary-text"}>{props.secondary_text}</div>
        </div>
    );
}