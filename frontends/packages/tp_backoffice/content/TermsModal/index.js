/** @jsxImportSource theme-ui */

import React, { useEffect, useState } from "react";

import { 
    TermsModalContainer,
    TermsModalHeader,
    TermsModalHeading,
    TermsModalContent,
    TermsModalActions,
    TermsModalActionsContainer,
    TermsModalCloseBtn,
    TermsModalConfirmBtn,
    TermsModalCancelBtn
 } from './termsmodal.style';

 import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import EditorViewerFragmentsWrapper from '../../components/EditorComponent/ViewerFragments';

export default function TermsModal({termsLanguages}) {

    const closeModal = () => {
        const customEvent = new CustomEvent('closeModal', null);
        window.dispatchEvent(customEvent);
    }

    return(
        <TermsModalContainer>
          <TermsModalHeader>
            <TermsModalHeading>Dialog</TermsModalHeading>
          </TermsModalHeader>
          <TermsModalCloseBtn onClick={() => closeModal()}>
            <CloseTwoToneIcon style={{ marginBottom: "-3px" }} />
          </TermsModalCloseBtn>
          <TermsModalContent>
            <EditorViewerFragmentsWrapper termsLanguages={termsLanguages}/>
          </TermsModalContent>
          <TermsModalActions>
            <TermsModalActionsContainer>
              <TermsModalConfirmBtn onClick={() => closeModal()}>
                Consent
              </TermsModalConfirmBtn>
              <TermsModalCancelBtn
                onClick={() => closeModal()}
              >
                Close
              </TermsModalCancelBtn>
            </TermsModalActionsContainer>
          </TermsModalActions>
        </TermsModalContainer>
    );
};