import * as React from "react";
import "./NavBar.css";
import {BarElement} from "../bar_element/BarElement";
import {withNavigation} from "../../navigation/withNavigation";
import {useLocation} from "react-router-dom";

interface INavBar {
    items:string[];
}

const ITEM_WIDTH = 160;
const NavBarElement = withNavigation(BarElement);

export const NavBar:React.FC<INavBar> = (props) => {
    const sampleLocation = useLocation();

    return (
        <div className="wrapper">
            <nav>
                <ul>
                    {props.items.map((item, index) =>
                        <NavBarElement
                            is_active={sampleLocation.pathname === `/${item === "main" ? "" : item}`}
                            item={item}
                            style={{offset: index * ITEM_WIDTH}}
                            key={index}
                        />
                    )}
                </ul>
            </nav>
        </div>
    );
}