import { useState, forwardRef } from 'react';
import {
    Tooltip,
    IconButton,
    Button,
    Typography,
    TextField,
    InputAdornment,
    Slide,
    Grid,
    Box,
    Dialog,
    Divider,
    CircularProgress,
    styled
  } from '@mui/material';

  import { useSession } from "next-auth/react";
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import { i18nextSettingsList } from "@transitionpt/translations";
import Modal from '../../../components/Modal';
import { TestSendEmail } from '../../../services/settings';

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

const SingleActions = ({ settingsType }) => {
    const { t } = i18nextSettingsList;
    const [isOpen, setIsOpen] = useState(false);
    const [sendToEmail, setSendToEmail] = useState("");
    const [isEmailTesting, setIsEmailTesting] = useState(false);
    const [sendEmailResult, setSendEmailResult] = useState("");
    const { data: session, status } = useSession();

    const handleEmailFieldChange = (event) => {
        event.persist();
        setSendToEmail(event.target.value);
    };

    const dialogData = {
        message: t("ACTIONS.testEmailSend"),
        closeLabel: t("ACTIONS.closeTestEmailSendDialog"),
        showOkButton: false,
        okButton: t("ACTIONS.testSendEmailButton"),
        showCancelButton: true,
        cancelButton: t("ACTIONS.cancelTestEmailSendButton")
    }

    const receiveTestEmailCancelAction = (cancelEvent) => {
        setIsOpen(false);
    }

    const testSendEmailAction = async() => {
        setIsEmailTesting(true);
        const testSendResult = await TestSendEmail(process.env.NEXT_PUBLIC_API_BASE_URL + "/email/test/send", {emailTo: sendToEmail}, session.accessToken);
        if (testSendResult == true) {
            setSendEmailResult(t("ACTIONS.testSendSuccess", {sendToEmail: sendToEmail}));
        }
        else if (!testSendResult.ok) {
            console.log(testSendResult.responseBody);
            setSendEmailResult("Error: " + testSendResult.responseBody.error + "\n\nDetails: " + testSendResult.responseBody.stackTrace);
        }
        else {
            setSendEmailResult(""+testSendResult);
            console.log(testSendResult);
        }
        setIsEmailTesting(false);
    }

    return (
        <>
            <Tooltip title={t('ACTIONS.testEmailSend')} arrow>
                <Button
                        sx={{
                        mt: { xs: 2, sm: 0 }
                        }}
                        onClick={(event) => setIsOpen(true)}
                        variant="contained"
                        startIcon={<ForwardToInboxTwoToneIcon fontSize="small" />}
                    >
                    {t('ACTIONS.testSendEmailButton')}
                </Button>
            </Tooltip>
            {isOpen && 
                <Modal dialogCancelAction={receiveTestEmailCancelAction} dialogJson={dialogData} setIsOpen={isOpen}>
                    <Box>
                        <Typography variant="h3" style={{textAlign: 'center', paddingBottom: "10px"}}>
                        {t("ACTIONS.testEmailSend")}
                        </Typography>
                        <Divider/>
                        <Grid direction="column" container sx={{pt: "10px", pb: "20px"}}>
                            <Grid container direction="row" sx={{pt: "10px", pb: "20px"}}>
                                <Grid item>
                                    <TextField
                                        sx={{
                                            m: 0,
                                            width: '100%'
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <ForwardToInboxTwoToneIcon />
                                            </InputAdornment>
                                            ),
                                            type: "search"
                                        }}
                                        onChange={handleEmailFieldChange}
                                        placeholder={t('ACTIONS.sendToEmailField')}
                                        value={sendToEmail}
                                        size="small"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item>
                                <Button
                                    fullWidth
                                    size="medium"
                                    color="primary"
                                    variant="contained"
                                    onClick={() => testSendEmailAction()}
                                    aria-label={t("ACTIONS.testSendEmailButton")}
                                    startIcon={isEmailTesting ? <CircularProgress sx={{color: 'white' }} size="1.3rem" /> : <ForwardToInboxTwoToneIcon fontSize="small" />}
                                >
                                    {t("ACTIONS.testSendEmailButton")}
                                </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                            >
                                <TextField
                                    sx={{
                                        m: 0
                                    }}
                                    multiline
                                    rows={9}
                                    placeholder={t('ACTIONS.sendEmailResult')}
                                    value={sendEmailResult}
                                    size="small"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    inputProps={
                                        { 
                                            readOnly: true,
                                            style: { color: sendEmailResult ? (sendEmailResult.includes("Error") ? "red" : "green") : "inherit" }
                                        }
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Divider/>
                    </Box>
                </Modal>
            }
        </>
    );
}

export default SingleActions;