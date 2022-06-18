import * as React from "react";
import "./VoyagePage.css";
import {Gallery} from "../../ui-kit/gallery/Gallery";
import {getCitiesRequest} from "../../data-mocks/requests/getCityRequest";
import {getImageRequest} from "../../data-mocks/requests/getImageRequest";
import {createPorter} from "../../porter/porter";
import {ICity} from "../../ui-kit/gallery/ICity";

export const VoyagePage:React.FC = () => {
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
            {/*<Header/>*/}
            <Gallery porter={porter}/>
            {/*<TopPointer/>*/}
        </div>
    )
}