'use client';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

type TModalProps = PropsWithChildren<{
  onClose: () => void;
}>;

const ModalContainer = ({ children, onClose }: TModalProps) => {
  const handleEscapePress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, []);

  return createPortal(
    <div
      className={`z-[100] flex justify-center items-center py-9 h-full w-full bg-grey-green/20 fixed top-0 left-0 right-0 bottom-0 backdrop-blur-[2px] overflow-auto`}
      onClick={(e) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export { ModalContainer };
