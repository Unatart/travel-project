export interface ISubscribe<T> {
    on(cb:(...params:T[]) => void):IEvent<T>;
    once(cb:(...params:T[]) => void):IEvent<T>;
}

export interface IEvent<T> extends ISubscribe<T> {
    off(listener?:any):void;
    listen(listener:any):ISubscribe<T>;
    hasListeners():boolean;
}

export type IEventCallback<TParam> = (...param:TParam[]) => void;

interface IListenerItem<T> {
    listener:any;
    event:Event<T>;
}

export class Event<T> implements IEvent<T> {
    public on(cb:IEventCallback<T> | undefined) {
        if (cb) {
            this.callbacks.push(cb);
        }
        return this;
    }

    public once(cb:IEventCallback<T>) {
        const handler = (...params:T[]) => {
            this.callbacks.splice(this.callbacks.indexOf(handler), 1);
            cb.apply(this, params);
        };
        this.callbacks.push(handler);
        return this;
    }

    public off(listener?:any) {
        if (listener) {
            this.listeners = this.listeners.filter((item:IListenerItem<T>) => {
                return item.listener !== listener;
            });
        } else {
            this.callbacks = [];
            this.listeners = [];
        }
    }

    public trigger(...params:T[]) {
        for (const cb of this.callbacks) {
            cb.apply(this, params);
        }

        for (const item of this.listeners) {
            item.event.trigger.apply(item.event, params);
        }

        return this;
    }

    public listen(listener:any):Event<T> {
        let item:IListenerItem<T> | undefined = this.listeners.find((cur_item:IListenerItem<T>) => {
            return cur_item.listener === listener;
        });

        if (!item) {
            item = {
                listener,
                event: new Event<T>(),
            };
            this.listeners.push(item);
        }

        return item.event;

    }

    public hasListeners():boolean {
        return !!(this.callbacks.length || this.listeners.length);
    }


    private callbacks:Array<IEventCallback<T>> = [];
    private listeners:Array<IListenerItem<T>> = [];
}