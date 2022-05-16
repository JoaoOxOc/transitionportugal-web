import React, { useEffect } from "react";

import { DarkBg, Centered } from './modal.style';

const Modal = ({ setIsOpen, children }) => {

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
    };

    useEffect(() => {
        const handleCloseModalMessage = (event) => {
            closeModal();
        };
                
        window.addEventListener('closeModal', handleCloseModalMessage);
        setIsOpen && (document.body.style.overflow = 'hidden');
    }, [setIsOpen]);

  return (
    <>
      <DarkBg onClick={() => closeModal()} />
      <Centered>
        {children}
      </Centered>
    </>
  );
};

export default Modal;