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
  IconButton,
  styled
} from '@mui/material';
import Head from 'next/head';

import BaseLayout from '../../../layouts/BaseLayout';

import { useRefMounted } from '../../../hooks/useRefMounted';
import CloseIcon from '@mui/icons-material/Close';
import { Guest } from '../../../components/Guest';
import Link from '../../../components/Link';
import { useRouter } from 'next/router';

import { i18nextRecover } from "@transitionpt/translations";
import {genericFetch} from '../../../services/genericFetch';
import { useSnackbar } from 'notistack';
import Logo from '../../../components/LogoSign';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

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

function RecoverPasswordBasic() {
  const { t } = i18nextRecover;
  const [currentLang, setLang] = useState("pt");
  i18nextRecover.changeLanguage(currentLang);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { demo } = router.query;

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

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
      username: '',
      submit: null
    },
    validationSchema: Yup.object({
        username: Yup.string()
              .max(100, t('MESSAGES.usernameTooBig', { number: 50 }))
              .required(t('MESSAGES.usernameEmailRequired'))
      }),
    onSubmit: async (values, helpers) => {
      try {
        const resetResult = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/recover", "POST", null,{
            username: values.username
        });
        console.log(resetResult);
        if (resetResult.status === "Success") {
            setOpenDialog(true);
        }
        else {
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: resetResult.statusText });
            helpers.setSubmitting(false);
            if (resetResult.statusText === "Unauthorized") {
                setDisplayRecoverLink(true);
                enqueueSnackbar(t('MESSAGES.tokenExpiredError'), {
                  variant: 'error',
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  autoHideDuration: 2000,
                  TransitionComponent: Slide
                });
            }
            else if (resetResult.status === 404) {
                enqueueSnackbar(t('MESSAGES.userNotFoundError'), {
                  variant: 'error',
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center'
                  },
                  autoHideDuration: 2000,
                  TransitionComponent: Slide
                });
            }
        }
      } catch (err) {
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
        <title>{t('LABELS.pageTitle')}</title>
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
                {t('LABELS.title')}
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3
                }}
              >
                {t(
                  'LABELS.subtitle'
                )}
              </Typography>
            </Box>
                <form noValidate onSubmit={formik.handleSubmit}>
                  <TextField
                    error={Boolean(formik.touched.username && formik.errors.username)}
                    fullWidth
                    helperText={formik.touched.username && formik.errors.username}
                    label={t('FORMS.usernameOrEmailAddress')}
                    aria-labelledby={ t('FORMS.usernameOrEmailAddress') } 
                    aria-describedby={ t('FORMS.usernameOrEmailAddress_help') }
                    margin="normal"
                    name="username"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
                    value={formik.values.username}
                    variant="outlined"
                  />

                  <Button
                    sx={{
                      mt: 3
                    }}
                    color="primary"
                    disabled={Boolean(formik.touched.username && formik.errors.username)}
                    aria-describedby={ t('FORMS.submit_help') } 
                    // onClick={handleOpenDialog}
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                  >
                    {t('FORMS.recoverAccount')}
                  </Button>
                </form>
          </Card>
          <Box mt={3} textAlign="right">
            <Typography
              component="span"
              variant="subtitle2"
              color="text.primary"
              fontWeight="bold"
            >
              {t('LABELS.signInLabel')}
            </Typography>{' '}
            <Link
              href={'/auth/login/cover'}
              aria-label={ t('LABELS.buttonToLogin') }
            >
              <b>{t('LABELS.signIn')}</b>
            </Link>
          </Box>
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
          </Collapse>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 10
            }}
            variant="h3"
          >
            {t('MESSAGES.successMessage')}
          </Typography>

          <Button
            fullWidth
            component={Link}
            size="large"
            variant="contained"
            onClick={handleCloseDialog}
            aria-label={ t('LABELS.buttonToLogin') }
            href={'/auth/login/cover'}
          >
            {t('LABELS.goLogIn')}
          </Button>
        </Box>
      </DialogWrapper>
    </>
  );
}

RecoverPasswordBasic.getLayout = (page) => (
  <Guest>
    <BaseLayout>{page}</BaseLayout>
  </Guest>
);

export default RecoverPasswordBasic;
