import { useRef, useEffect, useState } from 'react';

type T = any;

export const useInterval = (callback: T, delay: number | null = 0) => {
  const savedCallback: React.MutableRefObject<T> = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const interval = setInterval(tick, delay);
      return () => clearInterval(interval);
    }
  }, [delay]);
};
