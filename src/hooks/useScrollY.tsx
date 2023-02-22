import { useState, useEffect, useCallback } from 'react';

const useScrollY = () => {
  const [scrollY, setScrollY] = useState({ pos: 0, isDown: false });

  const isScroll = useCallback(
    function isScroll() {
      if (window.scrollY > scrollY.pos) setScrollY({ pos: window.scrollY, isDown: true });
      if (window.scrollY < scrollY.pos || window.scrollY === 0)
        setScrollY({ pos: window.scrollY, isDown: false });
    },
    [scrollY.pos]
  );

  useEffect(() => {
    window.addEventListener('scroll', isScroll, { passive: true });
    return () => window.removeEventListener('scroll', isScroll);
  }, [scrollY.pos, isScroll]);

  return scrollY;
};

export default useScrollY;
