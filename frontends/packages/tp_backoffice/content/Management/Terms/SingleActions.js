import { useState, forwardRef } from 'react';
import {
    Tooltip,
    IconButton,
    Button,
    Typography,
    Slide,
    Grid,
    Box,
    Dialog,
    Collapse,
    Alert,
    styled
  } from '@mui/material';

  import {CloneTermsRecord, ActivateTermsRecord} from '../../../services/terms';
  import { useSession } from "next-auth/react";
  import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone';
import DoNotDisturbOnTwoToneIcon from '@mui/icons-material/DoNotDisturbOnTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { i18nextTermsList } from "@transitionpt/translations";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const IconButtonActivate = styled(IconButton)(
    ({ theme }) => `
        color: ${theme.palette.success.dark};
      `
);

const DialogWrapper = styled(Dialog)(
    () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
  );

export default function SingleActions({termsIsActive, termsBeenActive, termsId, termsVersion, refreshData}) {
    const { t } = i18nextTermsList;
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState({});
    const { data: session, status } = useSession();
    const { enqueueSnackbar } = useSnackbar();

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const deactivateTerms = () => {
        console.log(termsId);
        handleOpenDialog();
    }

    const activateTerms = () => {
        setDialogData({
            message: t("MESSAGES.activateTermsInfo", {version: termsVersion}),
            okButton: t("LABELS.activateButton"),
            cancelButton: t("LABELS.cancelButton"),
            actionType: "ACTIVATE"
        });
        handleOpenDialog();
    }

    const cloneTerms = () => {
        setDialogData({
            message: t("MESSAGES.cloneTermsInfo", {version: termsVersion}),
            okButton: t("LABELS.cloneButton"),
            cancelButton: t("LABELS.cancelButton"),
            actionType: "CLONE"
        });
        handleOpenDialog();
    }

    const dialogOkAction = (actionType) => {
        switch(actionType) {
            case "ACTIVATE": {
                activateTermsAction();
            } break;
            case "CLONE": {
                cloneTermsAction();
            } break;
        }
        handleCloseDialog();
    }

    const activateTermsAction = async() => {
        const activationResult = await ActivateTermsRecord(process.env.NEXT_PUBLIC_API_BASE_URL + "/terms/activate", {id: termsId}, session.accessToken);
        if (activationResult.termsId) {
            enqueueSnackbar(t('MESSAGES.termsVersionActivated', {version: activationResult.termsVersion}), {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                },
                autoHideDuration: 2000,
                TransitionComponent: Slide
            });
        }
        else {
            enqueueSnackbar(t('MESSAGES.termsActivatingError', {version: termsVersion}), {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                },
                autoHideDuration: 2000,
                TransitionComponent: Slide
              });
        }
        refreshData(true);
    }

    const cloneTermsAction = async() => {
        const cloneResult = await CloneTermsRecord(process.env.NEXT_PUBLIC_API_BASE_URL + "/terms/clone", {id: termsId}, session.accessToken);
        if (cloneResult.termsId) {
            enqueueSnackbar(t('MESSAGES.termsVersionCloned', {version: cloneResult.termsVersion}), {
                variant: 'success',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                },
                autoHideDuration: 2000,
                TransitionComponent: Slide
            });
        }
        else {
            enqueueSnackbar(t('MESSAGES.termsCloningError', {version: termsVersion}), {
                variant: 'error',
                anchorOrigin: {
                  vertical: 'top',
                  horizontal: 'center'
                },
                autoHideDuration: 2000,
                TransitionComponent: Slide
              });
        }
        refreshData(true);

    }

    return (
        <>
        <Tooltip title={t('LABELS.clone')} arrow>
            <IconButton
            onClick={(event) => cloneTerms()}
            color="primary"
            >
                <FileCopyTwoToneIcon fontSize="small" />
            </IconButton>
        </Tooltip>
        {/* { termsIsActive && !termsBeenActive &&
            <Tooltip title={t('LABELS.deactivate')} arrow>
                <IconButton
                onClick={(event) => deactivateTerms()}
                color="primary"
                >
                    <DoNotDisturbOnTwoToneIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        } */}
        { !termsIsActive &&
            <Tooltip title={t('LABELS.activate')} arrow>
                <IconButtonActivate
                onClick={(event) => activateTerms()}
                >
                    <AddCircleTwoToneIcon fontSize="small" />
                </IconButtonActivate>
            </Tooltip>
        }
        <DialogWrapper
        open={openDialog}
        maxWidth="lg"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
          <Box
              sx={{
                  width: '100%'
              }}>
            <IconButton
                sx={{
                  float: 'right'
                }}
                  aria-label={ t('LABELS.closeMessage') }
                  color="inherit"
                  size="medium"
                  onClick={() => {
                    handleCloseDialog();
                  }}
                >
                  <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
        <Box
          sx={{
            px: 4,
            pb: 4,
            pt: 4
          }}
        >
          {/* <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label={ t('LABELS.closeMessage') }
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="info"
            >
              {t(
                'MESSAGES.passwordResetInstructions'
              )}
            </Alert>
          </Collapse> */}

          <Typography
            align="center"
            sx={{
              pb: 4,
              px: 10
            }}
            variant="h3"
          >
            {dialogData.message}
          </Typography>
            <Grid
                container
                justifyContent="center"
                direction="row">
                <Grid item>
                    <Button
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={() => dialogOkAction(dialogData.actionType)}
                        aria-label={dialogData.okButton}
                    >
                        {dialogData.okButton}
                    </Button>
                </Grid>
                <Grid item sx={{pl: '10px'}}>
                    <Button
                        fullWidth
                        size="large"
                        color="secondary"
                        variant="contained"
                        onClick={handleCloseDialog}
                        aria-label={dialogData.cancelButton}
                    >
                        {dialogData.cancelButton}
                    </Button>
                </Grid>
            </Grid>
        </Box>
      </DialogWrapper>
        </>
    );
}