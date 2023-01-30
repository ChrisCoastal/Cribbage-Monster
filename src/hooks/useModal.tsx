import React, { FC, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from 'src/components/UI/Button';
import AddIcon from 'src/components/UI/icons/AddIcon/AddIcon';
import SubHeading from 'src/components/UI/SubHeading';

type ModalProps = {
  isVisible: boolean;
  title: string;
  className?: string;
  children?: ReactNode;
};

const useModal = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  function modalHandler(isVisible: boolean) {
    setIsModal(isVisible);
  }

  const Modal: FC<ModalProps> = ({ isVisible, title, className = '', children }) => {
    function keyDownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.key === 'escape') modalHandler(false);
    }

    return (
      <>
        {isVisible &&
          createPortal(
            <>
              <div
                className={`${className} absolute top-1/2 left-1/2 z-[1000] w-full -translate-x-1/2 -translate-y-1/2 animate-modal-bounce-in rounded-lg bg-white p-4 sm:w-fit`}>
                <div>
                  <div className="flex items-center justify-between gap-8 pb-2">
                    <SubHeading className="pt-1">{title}</SubHeading>
                    <button onClick={() => modalHandler(false)}>
                      <AddIcon height="32" width="32" className="rotate-45" />
                    </button>
                  </div>
                  {children}
                </div>
              </div>
              <div
                onClick={() => modalHandler(false)}
                onKeyDown={keyDownHandler}
                className="absolute top-0 left-0 z-[900] h-full w-full bg-stone-900 opacity-60"></div>
            </>,
            document.getElementById('overlay-root')!
          )}
      </>
    );
  };

  return { isModal, modalHandler, Modal };
};

export default useModal;
