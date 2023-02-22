import React, { useState, useEffect } from 'react';

const useScrollY = () => {
  const [scrollY, setScrollY] = useState({ pos: 0, isDown: false });

  function isScroll() {
    if (window.scrollY > scrollY.pos) setScrollY({ pos: window.scrollY, isDown: true });
    if (window.scrollY < scrollY.pos || window.scrollY === 0)
      setScrollY({ pos: window.scrollY, isDown: false });
  }

  useEffect(() => {
    window.addEventListener('scroll', isScroll, { passive: true });
    return () => window.removeEventListener('scroll', isScroll);
  }, [scrollY.pos]);

  return scrollY;
};

export default useScrollY;
