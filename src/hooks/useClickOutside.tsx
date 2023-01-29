import React, { useRef, useEffect, ReactNode, FC } from 'react';

type ListenClickOutsideProps = {
  children: ReactNode;
  callback?: () => void;
};

const useClickOutside = () => {
  const ListenClickOutside: FC<ListenClickOutsideProps> = ({ callback, children }) => {
    const wrapperRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      console.log('effect');

      function handleClickOutside(event: any) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          console.log('You clicked outside of me!');
          callback && callback();
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
