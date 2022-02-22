/** @jsxImportSource theme-ui */

import React, { useEffect } from "react";

import { ModalStyle as styles } from './modal.style';

const Modal = ({ setIsOpen, children }) => {

    useEffect(() => {
        const handleCloseModalMessage = (event) => {
            closeModal();
        };
                
        window.addEventListener('closeModal', handleCloseModalMessage);
        setIsOpen && (document.body.style.overflow = 'hidden');
    }, [setIsOpen]);

    const closeModal = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
     };

  return (
    <>
      <div sx={styles.darkBG} onClick={() => closeModal()} />
      <div sx={styles.centered}>
        {children}
      </div>
    </>
  );
};

export default Modal;