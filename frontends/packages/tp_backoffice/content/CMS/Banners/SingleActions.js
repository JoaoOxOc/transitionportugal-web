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

  import {ChangeStatusBanners} from '../../../services/cms/banners';
  import { useSession } from "next-auth/react";
  import { useSnackbar } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyTwoTone';
import DoNotDisturbOnTwoToneIcon from '@mui/icons-material/DoNotDisturbOnTwoTone';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import { i18nextBannersList } from "@transitionpt/translations";

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

export default function SingleActions({bannerIsDraft, bannerId, bannerPageKey, bannerComponentKey, bannerOrderPosition, refreshData}) {
    const { t } = i18nextBannersList;
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

    const deactivateBanner = () => {
        setDialogData({
            message: t("MESSAGES.deactivateBannerInfo", {bannerIdentification: bannerPageKey + "|" + bannerComponentKey + "|level:" + bannerOrderPosition}),
            okButton: t("LABELS.deactivateButton"),
            cancelButton: t("LABELS.cancelButton"),
            actionType: "DEACTIVATE"
        });
        handleOpenDialog();
    }

    const activateBanner = () => {
        setDialogData({
            message: t("MESSAGES.activateBannerInfo", {bannerIdentification: bannerPageKey + "|" + bannerComponentKey + "|level:" + bannerOrderPosition}),
            okButton: t("LABELS.activateButton"),
            cancelButton: t("LABELS.cancelButton"),
            actionType: "ACTIVATE"
        });
        handleOpenDialog();
    }

    const cloneBanner = () => {
        setDialogData({
            message: t("MESSAGES.cloneBannerInfo", {bannerIdentification: bannerPageKey + "|" + bannerComponentKey + "|level:" + bannerOrderPosition}),
            okButton: t("LABELS.cloneButton"),
            cancelButton: t("LABELS.cancelButton"),
            actionType: "CLONE"
        });
        handleOpenDialog();
    }

    const dialogOkAction = (actionType) => {
        switch(actionType) {
            case "ACTIVATE": {
                activateBannerAction();
            } break;
            case "CLONE": {
                // cloneBannerAction();
            } break;
        }
        handleCloseDialog();
    }

    const activateBannerAction = async() => {
        const activationResult = await ChangeStatusBanners(process.env.NEXT_PUBLIC_API_BASE_URL + "/cms/banner/activate", {id: bannerId}, session.accessToken);
        if (activationResult.bannerId) {
            enqueueSnackbar(t('MESSAGES.bannersActivated'), {
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
            enqueueSnackbar(t('MESSAGES.bannerActivatingError', {bannerIdentification: bannerPageKey + "|" + bannerComponentKey + "|level:" + bannerOrderPosition}), {
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

    // const cloneBannerAction = async() => {
    //     const cloneResult = await CloneBanner(process.env.NEXT_PUBLIC_API_BASE_URL + "/cms/banner/clone", {id: bannerId}, session.accessToken);
    //     if (cloneResult.bannerId) {
    //         enqueueSnackbar(t('MESSAGES.bannerCloned', {bannerIdentification: cloneResult.pageKey + "|" + cloneResult.componentKey + "|level:" + cloneResult.orderPosition}), {
    //             variant: 'success',
    //             anchorOrigin: {
    //               vertical: 'top',
    //               horizontal: 'center'
    //             },
    //             autoHideDuration: 2000,
    //             TransitionComponent: Slide
    //         });
    //     }
    //     else {
    //         enqueueSnackbar(t('MESSAGES.bannerCloningError', {bannerIdentification: bannerPageKey + "|" + bannerComponentKey + "|level:" + bannerOrderPosition}), {
    //             variant: 'error',
    //             anchorOrigin: {
    //               vertical: 'top',
    //               horizontal: 'center'
    //             },
    //             autoHideDuration: 2000,
    //             TransitionComponent: Slide
    //           });
    //     }
    //     refreshData(true);

    // }

    return (
        <>
        <Tooltip title={t('LABELS.clone')} arrow>
            <IconButton
            onClick={(event) => cloneBanner()}
            color="primary"
            >
                <FileCopyTwoToneIcon fontSize="small" />
            </IconButton>
        </Tooltip>
        { bannerIsDraft == false &&
            <Tooltip title={t('LABELS.deactivate')} arrow>
                <IconButton
                onClick={(event) => deactivateBanner()}
                color="primary"
                >
                    <DoNotDisturbOnTwoToneIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        }
        { (bannerIsDraft == true || bannerIsDraft == null) &&
            <Tooltip title={t('LABELS.activate')} arrow>
                <IconButtonActivate
                onClick={(event) => activateBanner()}
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