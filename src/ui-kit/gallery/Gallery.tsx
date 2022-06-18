import * as React from "react";
import {IPorter} from "../../porter/porter";
import {ICity} from "./ICity";
import "./Gallery.css";
import {useActualCallback} from "../../hooks/useActualCallback";
import * as _ from "underscore";
import {NavGalleryItem} from "../gallery_item/GalleryItem";

interface IGalleryProps {
    porter:IPorter<ICity>;
    setResultPointer:(pointer:boolean) => void;
}

const LIMIT = 18;
const THRESHOLD = 12;

// TODO: add skeletons
export const Gallery:React.FC<IGalleryProps> = ({ porter, setResultPointer }) => {
    const [active_count, setActiveCount] = React.useState(0);

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

    const onGalleryItemClick = (is_active?:boolean) => {
        if (is_active === undefined) {
            return;
        }
        if (is_active) {
            setActiveCount(active_count + 1);
            setResultPointer(true);
        } else {
            setActiveCount(active_count - 1);
            if (active_count === 1) {
                setResultPointer(false);
            }
        }
    }

    return (
        <div className={"grid-wrapper"}>
            {data.map((item, index) => <NavGalleryItem item={item} index={index} onClick={onGalleryItemClick}/>)}
        </div>
    )
}