import {
  Typography,
  Divider,
  Grid,
  Box
} from '@mui/material';
// import { 
//     TermsModalContainer,
//     TermsModalHeader,
//     TermsModalHeading,
//     TermsModalContent,
//     TermsModalActions,
//     TermsModalActionsContainer,
//     TermsModalCloseBtn,
//     TermsModalConfirmBtn,
//     TermsModalCancelBtn
//  } from './termsmodal.style';

 import { i18nextTermsDetails } from "@transitionpt/translations";
import EditorViewerFragmentsWrapper from '../../components/EditorComponent/ViewerFragments';

export default function TermsModal({termsLanguages}) {
    const { t } = i18nextTermsDetails;

    return(
      <Box>
        <Typography variant="h3" style={{textAlign: 'center', paddingBottom: "10px"}}>
          {t("READING.termsAndConditions")}
        </Typography>
        <Divider/>
        <Grid container sx={{pt: "10px", pb: "20px"}}>
          <Grid item>
            <EditorViewerFragmentsWrapper termsLanguages={termsLanguages}/>
          </Grid>
          {/* <TermsModalHeader>
            <TermsModalHeading>Dialog</TermsModalHeading>
          </TermsModalHeader> */}
          {/* <TermsModalCloseBtn onClick={() => closeModal()}>
            <CloseTwoToneIcon style={{ marginBottom: "-3px" }} />
          </TermsModalCloseBtn> */}
          {/* <TermsModalContent>
            <EditorViewerFragmentsWrapper termsLanguages={termsLanguages}/>
          </TermsModalContent> */}
          {/* <TermsModalActions>
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
          </TermsModalActions> */}
        </Grid>
        <Divider/>
      </Box>
    );
};