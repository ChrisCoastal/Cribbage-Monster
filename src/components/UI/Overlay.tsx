import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';

type OverlayProps = {
  style?: 'dark' | 'transparent';
  className?: string;
  onClick?: () => void;
};

const Overlay: FC<OverlayProps> = ({ style, className, onClick }) => {
  // const [isVisible, setIsVisible] = useState<boolean>(false);

  // function handleClick() {
  //   setIsVisible((prev) => !prev);
  //   onClick && onClick();
  // }

  const overlayStyle = style === 'dark' ? 'bg-stone-900' : 'bg-transparent';

  return createPortal(
    <div
      onClick={onClick}
      className={`${overlayStyle} ${className} absolute top-0 left-0 z-40 h-screen w-screen opacity-60`}></div>,
    document.getElementById('overlay-root')!
  );
};

export default Overlay;
