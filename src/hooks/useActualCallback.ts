import * as React from "react";

export const useActualCallback = <T extends any[], R>(callback:(...args:T) => R) => {
    const callback_ref = React.useRef(callback);
    callback_ref.current = callback;

    return React.useCallback((...args:T) => callback_ref.current(...args), []);
};
