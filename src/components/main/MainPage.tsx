import * as React from "react";
import "./MainPage.css";
import {Title} from "../../ui-kit/title/Title";


export const MainPage:React.FC = () => {
    return (
        <div className={"main"}>
            <Title text={"Start your journey here.."} secondary_text={"Compile trip of your dream with valuable price"}/>
            {/*<Map/>*/}
            {/*<Buttons/>*/}
            {/*<Contacts/>*/}
        </div>
    )
}