import React, { useState, useEffect, useRef } from 'react';

const useElementHeight = () => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    setHeight(ref.current.clientHeight);
  }, []);

  return <div ref={ref}>{height}</div>;
};

export default useElementHeight;
