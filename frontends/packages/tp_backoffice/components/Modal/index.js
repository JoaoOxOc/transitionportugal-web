import { useState, forwardRef } from "react";
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

import { DarkBg, Centered } from './modal.style';
import CloseIcon from '@mui/icons-material/Close';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const Modal = ({ setIsOpen, dialogOkAction, dialogCancelAction, children, dialogJson }) => {
    const [openDialog, setOpenDialog] = useState(setIsOpen);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        dialogCancelAction(false);
        setOpenDialog(false);
    };

    // const closeModal = () => {
    //     setIsOpen(false);
    //     document.body.style.overflow = 'unset';
    // };

    // useEffect(() => {
    //     const handleCloseModalMessage = (event) => {
    //         closeModal();
    //     };
                
    //     window.addEventListener('closeModal', handleCloseModalMessage);
    //     setIsOpen && (document.body.style.overflow = 'hidden');
    // }, [setIsOpen]);

  return (
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
                  aria-label={dialogJson.closeLabel}
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
            {children}
            <Grid
                container
                justifyContent="center"
                direction="row">
                <Grid item>
                    <Button
                        fullWidth
                        size="large"
                        color="primary"
                        variant="contained"
                        onClick={() => dialogOkAction(dialogJson.okReturnOption)}
                        aria-label={dialogJson.okButton}
                    >
                        {dialogJson.okButton}
                    </Button>
                </Grid>
                <Grid item sx={{pl: '10px'}}>
                    <Button
                        fullWidth
                        size="large"
                        color="secondary"
                        variant="contained"
                        onClick={handleCloseDialog}
                        aria-label={dialogJson.cancelButton}
                    >
                        {dialogJson.cancelButton}
                    </Button>
                </Grid>
            </Grid>
        </Box>
      </DialogWrapper>
  );
};

export default Modal;