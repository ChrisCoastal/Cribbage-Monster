import React, { FC, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from 'src/components/UI/Button';

type ModalProps = {
  isVisible: boolean;
  modalContent: ReactNode;
  modalHandler: (visible?: boolean) => void;
  styles?: string;
  children?: ReactNode;
};

const useModal = () => {
  const [isModal, setIsModal] = useState<boolean>(false);

  function modalHandler(visible?: boolean) {
    setIsModal((prev) => (visible !== undefined ? visible : !prev));
  }

  const Modal: FC<ModalProps> = ({
    isVisible,
    modalContent,
    modalHandler,
    styles = '',
    children
  }) => {
    function keyDownHandler(event: React.KeyboardEvent<HTMLDivElement>) {
      console.log(event);
      if (event.key === 'escape') modalHandler(false);
    }

    return (
      <>
        {isVisible &&
          createPortal(
            <>
              <div
                className={`${styles} absolute top-1/2 left-1/2 z-[1000] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white`}>
                <Button handler={() => modalHandler(false)}></Button>
                {modalContent}
              </div>
              <div
                onClick={() => modalHandler(false)}
                onKeyDown={keyDownHandler}
                className="absolute top-0 left-0 z-[900] h-full w-full bg-neutral-900 opacity-60"></div>
            </>,
            document.getElementById('overlay-root')!
          )}
      </>
    );
  };

  return { isModal, modalHandler, Modal };
};

export default useModal;
