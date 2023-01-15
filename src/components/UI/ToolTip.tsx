import React, { MouseEvent, FC, ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useInterval } from 'src/hooks/useInterval';

type ToolTipProps = {
  text: string;
  customTipStyles?: string;
  customWrapperStyles?: string;
  children?: ReactNode;
};

const ToolTip: FC<ToolTipProps> = ({ text, customTipStyles, customWrapperStyles, children }) => {
  const [showTip, setShowTip] = useState<boolean>(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  function getTipOffset({ cursorX, cursorY }: { cursorX: number; cursorY: number }): {
    x: number;
    y: number;
  } {
    const X_SCREEN_PAD = 160;
    const Y_SCREEN_PAD = 160;
    const X_OFFSET = { left: -120, right: 10 };
    const Y_OFFSET = { above: -20, below: 20 };

    const yOffset =
      cursorY - Y_SCREEN_PAD < 0 && cursorY + Y_SCREEN_PAD > window.innerHeight
        ? 0
        : cursorY - Y_SCREEN_PAD < 0
        ? Y_OFFSET.below
        : Y_OFFSET.above;
    const xOffset = cursorX + X_SCREEN_PAD > window.innerWidth ? X_OFFSET.left : X_OFFSET.right;

    return {
      x: cursorX + xOffset,
      y: cursorY + yOffset
    };
  }

  function handleMouseEnter(event: MouseEvent<HTMLElement>) {
    const pos = getTipOffset({ cursorX: event.clientX, cursorY: event.clientY });
    setTipPos(pos);
    setShowTip(true);
  }

  function handleMouseLeave() {
    setShowTip(false);
  }

  return (
    <>
      {showTip &&
        createPortal(
          <div
            className={`${customTipStyles} pointer-events-none z-[1000] animate-fade-in rounded-sm bg-white/80 px-2 text-sm opacity-0`}
            style={{ position: 'absolute', left: tipPos.x, top: tipPos.y }}>
            {text}
          </div>,
          document.getElementById('overlay-root')!
        )}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${customWrapperStyles} h-full w-full`}>
        {children}
      </div>
    </>
  );
};

export default ToolTip;
