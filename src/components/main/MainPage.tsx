import * as React from "react";
import {Title} from "../../ui-kit/title/Title";
import "./MainPage.css";

export const MainPage:React.FC = () => {
    return (
        <div className={"main"}>
            <Title text={"Start your journey here.."} secondary_text={"Compile trip of your dream with valuable price"}/>
        </div>
    )
}