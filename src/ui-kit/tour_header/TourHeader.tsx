import * as React from "react";
import {Title} from "../title/Title";
import "./TourHeader.css";

export function TourHeader() {
    return <Title  text={"Customize your tour"} secondary_text={"Select cities which you want to visit"} className={"tour-header"}/>;
}