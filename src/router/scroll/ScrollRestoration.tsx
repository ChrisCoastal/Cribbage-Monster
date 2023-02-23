import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ScrollRestorationProps = {
  scrollY?: number;
};

const ScrollRestoration: FC<ScrollRestorationProps> = ({ scrollY = 0 }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(scrollY, 0);
  }, [pathname, scrollY]);

  return null;
};

export default ScrollRestoration;
