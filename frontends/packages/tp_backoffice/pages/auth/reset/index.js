import { useState, useEffect, forwardRef, Ref } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Card,
  TextField,
  Typography,
  Container,
  Alert,
  Slide,
  Dialog,
  Collapse,
  Button,
  Avatar,
  CircularProgress,
  IconButton,
  styled
} from '@mui/material';
import Head from 'next/head';

import BaseLayout from '../../../layouts/BaseLayout';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { Guest } from '../../../components/Guest';
import Link from '../../../components/Link';
import { useSnackbar } from 'notistack';
import { i18nextReset } from "@transitionpt/translations";
import Logo from '../../../components/LogoSign';
import {genericFetch} from '../../../services/genericFetch';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
  );

  const DialogWrapper = styled(Dialog)(
    () => `
        .MuiDialog-paper {
          overflow: visible;
        }
  `
  );
  
  const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
        box-shadow: ${theme.colors.shadows.success};
        top: -${theme.spacing(6)};
        position: absolute;
        left: 50%;
        margin-left: -${theme.spacing(6)};
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
  );

function ResetPassword() {
    const { enqueueSnackbar } = useSnackbar();
    const [currentLang, setLang] = useState("pt");
    i18nextReset.changeLanguage(currentLang);
    const router = useRouter();
    const { t } = router.query;
    const [serverError, setServerError] = useState('');

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
      }, []);

    const [displayRecoverLink, setDisplayRecoverLink] = useState(false);
    const [openAlert, setOpenAlert] = useState(true);

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                  .min(8, i18nextReset.t('MESSAGES.passwordTooSmall', { number: 8 }))
                  .max(100, i18nextReset.t('MESSAGES.passwordTooBig', { number: 100 }))
                  .required(i18nextReset.t('MESSAGES.passwordRequired')),
            confirmPassword: Yup.string()
                  .oneOf(
                    [Yup.ref('password')],
                    i18nextReset.t('MESSAGES.passwordsNoMatch')
                  )
                  .required(i18nextReset.t('MESSAGES.confirmPasswordRequired'))
          }),
        onSubmit: async (values, helpers) => {
          try {
            const resetResult = await fetch(process.env.NEXT_PUBLIC_AUTH_URL + "/userRecoverPassword" + "?t="+ t, {
              method: 'POST',
              body: JSON.stringify({
                password: values.password,
                confirmPassword: values.confirmPassword
              }),
              headers: { 
                "Content-Type": "application/json",
                "credentials": 'include'
              }
            });
            // const resetResult = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/reset", "POST", t,{
            //     password: values.password,
            //     confirmPassword: values.confirmPassword
            // });
            const resetResultParsed = await resetResult.json();

            if (resetResultParsed.status === "Success") {
                handleOpenDialog();
                helpers.setSubmitting(false);
            }
            else {
                helpers.setStatus({ success: false });
                helpers.setErrors({ submit: resetResultParsed.statusText });
                helpers.setSubmitting(false);
                if (resetResult.status === 403) {
                  setServerError(t('MESSAGES.passwordComplexityError'));
                    // enqueueSnackbar(i18nextReset.t('MESSAGES.passwordComplexityError'), {
                    //   variant: 'error',
                    //   anchorOrigin: {
                    //     vertical: 'top',
                    //     horizontal: 'center'
                    //   },
                    //   autoHideDuration: 2000,
                    //   TransitionComponent: Slide
                    // });
                }
                else if (resetResult.status === 401) {
                    setDisplayRecoverLink(true);
                    setServerError(t('MESSAGES.tokenExpiredError'));
                    // enqueueSnackbar(i18nextReset.t('MESSAGES.tokenExpiredError'), {
                    //   variant: 'error',
                    //   anchorOrigin: {
                    //     vertical: 'top',
                    //     horizontal: 'center'
                    //   },
                    //   autoHideDuration: 2000,
                    //   TransitionComponent: Slide
                    // });
                }
                else if (resetResult.status === 404) {
                  setServerError(t('MESSAGES.userNotFoundError'));
                    // enqueueSnackbar(i18nextReset.t('MESSAGES.userNotFoundError'), {
                    //   variant: 'error',
                    //   anchorOrigin: {
                    //     vertical: 'top',
                    //     horizontal: 'center'
                    //   },
                    //   autoHideDuration: 2000,
                    //   TransitionComponent: Slide
                    // });
                }
                else {
                  setServerError(t('MESSAGES.userResetError'));
                }
            }
          } catch (err) {
            setServerError(t('MESSAGES.userResetError'));
            console.error(err);
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: err.message });
            helpers.setSubmitting(false);
          }
        }
      });
  
    return (
      <>
        <Head>
          <title>{i18nextReset.t('LABELS.pageTitle')}</title>
        </Head>
        <MainContent>
        <Container maxWidth="sm">
          <Logo />
          <Card
            sx={{
              mt: 3,
              p: 4
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{
                  mb: 1
                }}
              >
                {i18nextReset.t('LABELS.title')}
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3
                }}
              >
                {i18nextReset.t(
                  'LABELS.subtitle'
                )}
              </Typography>
            </Box>
            { displayRecoverLink &&
                <Box>
                    <Typography variant="body2">
                        {i18nextReset.t('LABELS.recoverMessage')}{' '}
                        <Link href="/auth/recover-password" aria-label={i18nextReset.t('LABELS.goBackToRecover')}>
                            <b>{i18nextReset.t('LABELS.recoverPassword')}</b>
                        </Link>
                    </Typography>
                </Box>
            }
                <form noValidate onSubmit={formik.handleSubmit}>
                  {serverError && (
                    <>
                      <Alert
                        sx={{
                          mb: 1
                        }}
                        severity="error"
                        aria-label={ t('FORMS.resetErrorResult') }
                      >
                        <span>{serverError}</span>
                      </Alert>
                    </>
                  )}
                  <TextField
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    fullWidth
                    helperText={formik.touched.password && formik.errors.password}
                    label={i18nextReset.t('FORMS.password')}
                    aria-labelledby={ i18nextReset.t('FORMS.password') } 
                    aria-describedby={ i18nextReset.t('FORMS.password_help') } 
                    margin="normal"
                    name="password"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    fullWidth
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    label={i18nextReset.t('FORMS.confirmPassword')}
                    aria-labelledby={ i18nextReset.t('FORMS.confirmPassword') } 
                    aria-describedby={ i18nextReset.t('FORMS.confirm_password_help') } 
                    margin="normal"
                    name="confirmPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.confirmPassword}
                    variant="outlined"
                  />

                  <Button
                    sx={{
                      mt: 3
                    }}
                    color="primary"
                    startIcon={
                      formik.isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={Boolean((formik.touched.password && formik.errors.password) || (formik.touched.confirmPassword && formik.errors.confirmPassword) || formik.isSubmitting)}
                    aria-describedby={ i18nextReset.t('FORMS.submit_help') } 
                    // onClick={handleOpenDialog}
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                  >
                    {i18nextReset.t('FORMS.submitNewPassword')}
                  </Button>
                </form>
          </Card>
        </Container>
      </MainContent>
      <DialogWrapper
        open={openDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <Box
          sx={{
            px: 4,
            pb: 4,
            pt: 10
          }}
        >
          <AvatarSuccess>
            <CheckTwoToneIcon />
          </AvatarSuccess>

          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label={ i18nextReset.t('LABELS.closeMessage') }
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
              {i18nextReset.t(
                'MESSAGES.passwordReset'
              )}
            </Alert>
          </Collapse>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 10
            }}
            variant="h3"
          >
            {i18nextReset.t('MESSAGES.successMessage')}
          </Typography>

          <Button
            fullWidth
            component={Link}
            size="large"
            variant="contained"
            onClick={handleCloseDialog}
            aria-label={ i18nextReset.t('LABELS.buttonToLogin') }
            href={'/auth/login/cover'}
          >
            {i18nextReset.t('LABELS.goLogIn')}
          </Button>
        </Box>
      </DialogWrapper>
      </>
    )
}

ResetPassword.getLayout = (page) => (
    <Guest>
      <BaseLayout>{page}</BaseLayout>
    </Guest>
  );
  
  export default ResetPassword;