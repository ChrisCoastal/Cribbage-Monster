import React, { MouseEvent, FC, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

type ToolTipProps = {
  text: string;
  children?: ReactNode;
};

const ToolTip: FC<ToolTipProps> = ({ text, children }) => {
  const [showTip, setShowTip] = useState<boolean>(false);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });

  // useEffect(() => {
  //   const handleWindowMouseMove = (event) => {
  //     setCursor({
  //       x: event.screenX,
  //       y: event.screenY
  //     });
  //   };
  //   window.addEventListener('mousemove', handleWindowMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleWindowMouseMove);
  //   };
  // }, []);

  function handleMouseEnter(event: MouseEvent<HTMLElement>) {
    const X_PAD = 160;
    const Y_PAD = 160;
    const OFFSET = 30;

    const yOffset =
      event.clientY - Y_PAD < 0 && event.clientY + Y_PAD > window.innerHeight
        ? 0
        : event.clientY - Y_PAD < 0
        ? OFFSET
        : OFFSET * -1;
    const xOffset = event.clientX + X_PAD > window.innerWidth ? OFFSET * -4 : OFFSET;
    console.log(yOffset, xOffset);

    const pos = {
      x: event.clientX + xOffset,
      y: event.clientY + yOffset
    };
    setTipPos(pos);
    setShowTip(true);
  }
  function handleMouseLeave() {
    setShowTip(false);
  }

  return (
    <>
      {/* {children} */}
      {showTip &&
        createPortal(
          <div
            className={`pointer-events-none z-[1000] animate-fade-in rounded-sm bg-white/80 px-2 text-sm opacity-0`}
            style={{ position: 'absolute', left: tipPos.x, top: tipPos.y }}>
            {text}
          </div>,
          document.getElementById('overlay-root')!
        )}
      <span
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute h-full w-full"></span>
    </>
  );
};

// <>
// {isVisible &&
//   createPortal(
//     <>
//       <div
//         className={`${customStyles} absolute top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 animate-modal-slide-in rounded-lg bg-white p-4`}>
//         <div className="">
//           <div className="flex items-center justify-between gap-8">
//             <h2 className=" text-xl font-extrabold">{title.toUpperCase()}</h2>
//             <Button handler={() => modalHandler(false)}>X</Button>
//           </div>
//           {children}
//         </div>
//       </div>
//       <div
//         onClick={() => modalHandler(false)}
//         onKeyDown={keyDownHandler}
//         className="absolute top-0 left-0 z-[900] h-full w-full bg-stone-900 opacity-60"></div>
//     </>,
//     document.getElementById('overlay-root')!
//   )}
// </>

export default ToolTip;
