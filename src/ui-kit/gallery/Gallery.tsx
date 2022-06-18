import * as React from "react";
import {IPorter} from "../../porter/porter";
import {ICity} from "./ICity";
import "./Gallery.css";
import {useActualCallback} from "../../hooks/useActualCallback";
import * as _ from "underscore";

interface IGalleryProps {
    porter:IPorter<ICity>;
}

const LIMIT = 18;
const THRESHOLD = 12;

// TODO: sceletons
export const Gallery:React.FC<IGalleryProps> = ({ porter }) => {
    const [offset, setOffset] = React.useState(0);
    const [next_threshold, setNextThreshold] = React.useState(THRESHOLD);
    const [data, setLoadedData] = React.useState<ICity[]>([]);
    const [top, setTop] = React.useState<number>(0);

    const loadNextChunk = _.throttle(useActualCallback(() => {
        const threshold_elem = document.getElementById(`element_num_${next_threshold}`);
        const rect = threshold_elem?.getBoundingClientRect();
        if (!rect) {
            return;
        }
        if (!top) {
            setTop(rect.top);
        }
        if (top && top - rect.top > rect.height || (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            porter.loadData(offset, offset + LIMIT).then(() => {
                setLoadedData(porter.getLoadedData());
            });
            setOffset(offset + LIMIT);
            setNextThreshold(offset + LIMIT - THRESHOLD);
            setTop(0);
        }
    }), 1000);


    React.useEffect(() => {
        window.addEventListener('scroll', loadNextChunk);

        porter.loadData(offset, offset + LIMIT).then(() => {
            setLoadedData(porter.getLoadedData());
            setOffset(offset + LIMIT);
            setNextThreshold(offset + LIMIT - THRESHOLD);
        });

        return () => {
            window.removeEventListener('scroll', loadNextChunk);
        }
    }, []);

    return (
        <div className={"grid-wrapper"}>
            {data.map((item, index) => (
                <div className={"tall"} key={index} id={`element_num_${index}`}>
                    <img src={item.images?.[0]} alt=""/>
                    <div className={"name"}>{item.name}</div>
                </div>
            ))}
        </div>
    )
}