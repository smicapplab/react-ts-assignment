import { useEffect, useRef } from "react";

export const useOnceMountEffect = (cb, condition = true) => {
    const isCalledRef = useRef(false);

    useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true;
            cb();
        }
    }, [cb, condition]);
}