import * as React from "react";
import {INavigableItemProps} from "../../navigation/withNavigation";
import {Link} from "react-router-dom";

interface IBarElementProps extends INavigableItemProps {
    item:string;
    style:React.CSSProperties;
}

export function BarElement(props:IBarElementProps) {
    return (
        <li
            className={props.is_active ? "active": undefined}
            style={props.style}
            onClick={() => props.onClick?.()}
        >
            <Link to={`${props.item === "main" ? "" : props.item}`}>{props.item}</Link>
        </li>
    );
}