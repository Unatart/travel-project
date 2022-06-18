import * as React from "react";
import "./MainPage.css";
import {Title} from "../../ui-kit/title/Title";
import {Contacts} from "../../ui-kit/contacts/Contacts";
import {RoadMap} from "../../ui-kit/roadmap/RoadMap";


export const MainPage:React.FC = () => {
    return (
        <div className={"main"}>
            <Title text={"Start your journey here.."} secondary_text={"Compile trip of your dream with valuable price"} className={"grid-title"}/>
            <RoadMap/>
            <Contacts/>
        </div>
    )
}