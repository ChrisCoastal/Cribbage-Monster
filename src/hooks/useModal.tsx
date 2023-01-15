import React, { FC, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from 'src/components/UI/Button';
import SubHeading from 'src/components/UI/SubHeading';

type ModalProps = {
  isVisible: boolean;
  title: string;
  customStyles?: string;
  children?: ReactNode;
};

const useModal = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  function modalHandler(isVisible: boolean) {
    setIsModal(isVisible);
  }

  const Modal: FC<ModalProps> = ({ isVisible, title, customStyles = '', children }) => {
    function keyDownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
      if (event.key === 'escape') modalHandler(false);
    }

    return (
      <>
        {isVisible &&
          createPortal(
            <>
              <div
                className={`${customStyles} animate-modal-bounce-in absolute top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-4`}>
                <div className="">
                  <div className="flex items-center justify-between gap-8">
                    <SubHeading>{title.toUpperCase()}</SubHeading>
                    <Button handler={() => modalHandler(false)}>X</Button>
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
