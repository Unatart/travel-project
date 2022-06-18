import {INavigableItemProps, withNavigation} from "../../navigation/withNavigation";
import * as React from "react";
import {ICity} from "../gallery/ICity";

interface IGalleryItem extends INavigableItemProps {
    index?:number;
    item:ICity;
}

function GalleryItem({ index, item, is_active, onClick }:IGalleryItem) {
    return (
        <div className={"tall"} key={index} id={`element_num_${index}`} onClick={() => onClick?.()}>
            <img className={`${is_active ? "active-item" : undefined}`} src={item.images?.[0]} alt=""/>
            <div className={"name"}>{item.name}</div>
        </div>
    );
}

export const NavGalleryItem = withNavigation(GalleryItem);