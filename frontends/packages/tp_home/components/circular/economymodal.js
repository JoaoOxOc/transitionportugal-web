/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx } from 'theme-ui';
import React, { useEffect, useState } from "react";

import { EconomyModalStyle as styles } from './economymodal.style';
import { RiCloseLine } from "react-icons/ri";

export default function EconomyModal() {

    const closeModal = () => {
        const customEvent = new CustomEvent('closeModal', null);
        window.dispatchEvent(customEvent);
    }

    return(
        <div sx={styles.modal}>
          <div sx={styles.modalHeader}>
            <h5 sx={styles.heading}>Dialog</h5>
          </div>
          <button sx={styles.closeBtn} onClick={() => closeModal()}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div sx={styles.modalContent}>
            Are you sure you want to delete the item?
          </div>
          <div sx={styles.modalActions}>
            <div sx={styles.actionsContainer}>
              <button sx={styles.deleteBtn} onClick={() => closeModal()}>
                Delete
              </button>
              <button
                sx={styles.cancelBtn}
                onClick={() => closeModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
    );
};