import React, { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import anime from 'animejs';

import AddIcon from 'src/components/UI/icons/AddIcon/AddIcon';
import SubHeading from 'src/components/UI/SubHeading';

type ModalProps = {
  isVisible: boolean;
  title?: string;
  clickAway?: boolean;
  className?: string;
  children?: ReactNode;
};

const useModal = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  function modalHandler(isVisible: boolean, canClickAway = true) {
    if (!canClickAway) return;
    setIsModal(isVisible);
  }

  const Modal: FC<ModalProps> = ({ isVisible, title, clickAway = true, className, children }) => {
    function keyDownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.key === 'escape') modalHandler(false);
    }

    useEffect(() => {
      anime({
        targets: '.modal',
        opacity: { value: [0, 1], duration: 400 },
        translateX: { value: ['-50%'], duration: 0 },
        translateY: ['-50%'],
        duration: 1000,
        easing: 'spring(0.5, 100, 10, 0)'
      });
    }, []);

    return (
      <>
        {isVisible &&
          createPortal(
            <>
              <div
                className={`modal ${className} absolute left-1/2 top-1/2 z-[1000] w-full bg-stone-800 p-4 sm:w-fit sm:rounded-lg`}>
                <div>
                  <div className="flex items-center justify-between gap-8 pb-2">
                    <SubHeading className="pt-1">{title}</SubHeading>
                    {clickAway && (
                      <button onClick={() => modalHandler(false)}>
                        <AddIcon height="32" width="32" className="rotate-45" />
                      </button>
                    )}
                  </div>
                  {children}
                </div>
              </div>
              <div
                onClick={() => modalHandler(false, clickAway)}
                onKeyDown={keyDownHandler}
                className="fixed top-0 left-0 z-[900] h-full w-full bg-stone-900 opacity-60"></div>
            </>,
            document.getElementById('overlay-root')!
          )}
      </>
    );
  };

  return { isModal, modalHandler, Modal };
};

export default useModal;
