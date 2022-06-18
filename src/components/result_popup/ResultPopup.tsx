import * as React from "react";
import "./ResultPopup.css";
import {AppContext} from "../../App";

interface IResultPopupProps {
    cities?:string[];
}

export const ResultPopup:React.FC<IResultPopupProps> = ({ cities }) => {
    const { popup_service } = React.useContext(AppContext);
    const cities_text = cities ? cities.map((city) => ` ${city.replace(',', '')}`) : "";
    const big_text = getBigText();

    return (
        <>
            <div className={"popup-background"}/>
            <div className={"popup"}>
                <div className={"popup-text-area"}>
                    <div className={"popup-header"}>{`You're going to visit: ${cities_text}`}</div>
                    <div className={"popup-text"}>{big_text}</div>
                    <div className={"popup-submit-button"}>{"Submit"}</div>
                </div>
                <div className={"close-button"} onClick={() => popup_service.closePopup()}>x</div>
            </div>
        </>
    );
}

function getBigText() {
    return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
}