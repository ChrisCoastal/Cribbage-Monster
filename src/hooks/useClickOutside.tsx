import React, { useRef, useEffect, ReactNode, FC } from 'react';

type ListenClickOutsideProps = {
  children: ReactNode;
  outCallback?: () => void;
  inCallback?: () => void;
};

const useClickOutside = () => {
  const ListenClickOutside: FC<ListenClickOutsideProps> = ({
    outCallback,
    inCallback,
    children
  }) => {
    const wrapperRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      function handleClickOutside(event: any) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          outCallback && outCallback();
        }
        if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
          inCallback && inCallback();
        }
      }
      document.addEventListener('click', handleClickOutside, true);
      return () => document.removeEventListener('click', handleClickOutside, true);
    }, [wrapperRef]);

    return <span ref={wrapperRef}>{children}</span>;
  };

  return ListenClickOutside;
};

export default useClickOutside;
