import * as React from "react";
import "./TourPage.css";
import {Gallery} from "../../ui-kit/gallery/Gallery";
import {getCitiesRequest} from "../../data-mocks/requests/getCityRequest";
import {getImageRequest} from "../../data-mocks/requests/getImageRequest";
import {createPorter} from "../../porter/porter";
import {ICity} from "../../ui-kit/gallery/ICity";
import {TourHeader} from "../../ui-kit/tour_header/TourHeader";
import {Pointer} from "../../ui-kit/pointer/Pointer";
import {AppContext} from "../../App";
import {ResultPopup} from "../result_popup/ResultPopup";

export const TourPage:React.FC = () => {
    const [active_cities, setActiveCities] = React.useState<string[]>([]);
    const { popup_service } = React.useContext(AppContext);

    const [porter] = React.useState(() => createPorter<ICity>(getLoader));
    const createPopupAction = () => popup_service.createPopup(<ResultPopup cities={active_cities}/>, "result_popup");
    const updateActiveCities = (city:string, active:boolean) => {
        if (active) {
            setActiveCities([ city, ...active_cities ]);
            return;
        }

        setActiveCities(active_cities.filter((active_city) => city === active_city));
    }

    return (
        <div className={"voyage"}>
            <div id={"head"}/>
            <TourHeader/>
            <Gallery porter={porter} updateActiveCities={updateActiveCities}/>
            <Pointer text={"↑"}/>
            {active_cities && <Pointer text={"→"} bottom_text={"result"} style={{bottom: "5vh"}} onClick={createPopupAction}/>}
        </div>
    )
}

const getLoader = (from:number, to:number) => {
    return getCitiesRequest().then((data) => {
        const promises = [];
        for (let i = from; i < to; i++) {
            const city = data?.cities[i];
            if (city) {
                promises.push(getImageRequest(city.href).then((images) => ({ name: city.name, images })));
            }
        }

        return Promise.all(promises);
    });
};