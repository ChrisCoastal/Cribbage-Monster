import { useRef, useEffect, MutableRefObject } from 'react';

type T = any;

export const useInterval = (callback: T, delay: number | null = 0, max?: number) => {
  const savedCallback: MutableRefObject<T> = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (max && savedCallback.current >= max) return;

    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay, max]);
};
