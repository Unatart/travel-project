import * as React from "react";
import "./RoadMap.css";

const OFFSET = 100;

export function RoadMap() {
    const roadmap_data = getRoadMapData();
    return (
        <div className={"roadmap"} key={"roadmap"}>
            {roadmap_data.map((item, index) => {
                return (
                    <>
                        <div
                            className={"roadmap-item"}
                            style={{top: OFFSET * index}}
                            key={`item-${index}`}
                        >
                            {item}
                        </div>
                        {index < roadmap_data.length - 1 &&
                            <div
                                className={"map-arrow rotate"}
                                key={`arrow-${index}`}
                                style={{top: index ? 2 * OFFSET * index : OFFSET / 2}}
                            >
                                {"⤵"}
                            </div>
                        }
                    </>
                )
            })}
        </div>
    );
}

function getRoadMapData() {
    return ["1. Select cities which you want to visit", "2. Choose best flight and hotel's options", "3. You're awesome, go on vacation!"]
}