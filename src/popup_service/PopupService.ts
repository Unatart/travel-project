import * as React from "react";
import {IEvent, Event} from "../events/Event";

export interface IPopupService {
    createPopup:(view:React.ReactNode, name:string) => void;
    closePopup:() => void;
    getCurrentPopup:() => React.ReactNode | null;
}

interface IPopup {
    view:React.ReactNode;
    name:string;
}

export class PopupService implements IPopupService {
    public createPopup(view:React.ReactNode, name:string) {
        this.popup_list.push({ view, name });
        this.on_update.trigger();
    }

    public closePopup() {
        if (this.popup_list.length) {
            this.popup_list.pop();
            this.on_update.trigger();
        }
    }

    public getCurrentPopup() {
        if (this.popup_list.length) {
            return this.popup_list[this.popup_list.length - 1].view;
        }
        return null;
    }

    public onUpdate():IEvent<void> {
        return this.on_update;
    }

    private popup_list:IPopup[] = [];
    private on_update:Event<void> = new Event<void>();
}