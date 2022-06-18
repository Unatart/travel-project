import * as React from "react";
import "./TourPage.css";
import {Gallery} from "../../ui-kit/gallery/Gallery";
import {getCitiesRequest} from "../../data-mocks/requests/getCityRequest";
import {getImageRequest} from "../../data-mocks/requests/getImageRequest";
import {createPorter} from "../../porter/porter";
import {ICity} from "../../ui-kit/gallery/ICity";
import {TourHeader} from "../../ui-kit/tour_header/TourHeader";
import {Pointer} from "../../ui-kit/pointer/Pointer";

export const TourPage:React.FC = () => {
    const [result_pointer, setResultPointer] = React.useState(false);
    const loader = (from:number, to:number) => {
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

    const [porter] = React.useState(() => createPorter<ICity>(loader));

    return (
        <div className={"voyage"}>
            <div id={"head"}/>
            <TourHeader/>
            <Gallery porter={porter} setResultPointer={setResultPointer}/>
            <Pointer text={"↑"}/>
            {result_pointer && <Pointer text={"→"} bottom_text={"result"} style={{bottom: "5vh"}}/>}
        </div>
    )
}