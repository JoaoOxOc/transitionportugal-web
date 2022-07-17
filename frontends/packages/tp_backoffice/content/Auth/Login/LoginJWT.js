import * as Yup from 'yup';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useFormik, ErrorMessage } from 'formik';
import Link from '../../../components/Link';
import { getProviders, signIn } from "next-auth/react";
import { getCsrfToken } from "next-auth/react";

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Checkbox,
  Alert,
  Typography,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
// import { useAuth } from '../../../hooks/useAuth';
import { useRefMounted } from '../../../hooks/useRefMounted';
import Modal from '../../../components/Modal';
import TermsModal from '../../../content/TermsModal';
import { useSnackbar } from 'notistack';
import { Slide } from '@mui/material';
import { i18nextLoginForm } from "@transitionpt/translations";

const errors = {
  Signin: "Try signing with a different account.",
  OAuthSignin: "Try signing with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin: 'MESSAGES.loginError',
  CredentialsEmptyLoginError: 'MESSAGES.loginError',
  default: 'MESSAGES.loginError',
};

const SignInError = ({ error, t }) => {
  const { enqueueSnackbar } = useSnackbar();
  const errorMessage = "MESSAGES.serverError";
  if (error && error.includes("request")) {
    errorMessage = "MESSAGES.serverError";
  }
  else {
    errorMessage = error && (errors[error] ?? errors.default);
  }
  // useEffect(() => {
  //   enqueueSnackbar(t(errorMessage), {
  //           variant: 'error',
  //           anchorOrigin: {
  //             vertical: 'top',
  //             horizontal: 'center'
  //           },
  //           autoHideDuration: 2000,
  //           TransitionComponent: Slide
  //         });
  // }, [errorMessage,enqueueSnackbar,t]);
  return (
    <>
      <Alert
        sx={{
          mb: 1
        }}
        // action={
        //   <IconButton
        //     aria-label="close"
        //     color="inherit"
        //     size="small"
        //     onClick={() => {
        //       setOpenAlert(false);
        //     }}
        //   >
        //     <CloseIcon fontSize="inherit" />
        //   </IconButton>
        // }
        severity="error"
        aria-label={ t('FORMS.authErrorResult') }
      >
        <span>{t(errorMessage)}</span>
      </Alert>
    </>
    // <div className="error">
    //   <p>{t(errorMessage)}</p>
    // </div>
  );
};


export const LoginJWT = ({ providers, csrfToken, termsProps, ...props }) => {
  const router = useRouter();
  const { backTo, error } = router.query;
  const { t } = i18nextLoginForm;
  // const { login } = useAuth();
const [termsConsented, setTermsConsented] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMountedRef = useRefMounted();
  const { enqueueSnackbar } = useSnackbar();
  const formLoginElement = useRef(null);

  const termsDialogJson = {
    closeLabel: t("LABELS.closeTermsDialog"),
    okReturnOption: "consented",
    showOkButton: true,
    okButton: t("LABELS.termsConsentButton"),
    showCancelButton: true,
    cancelButton: t("LABELS.termsCancelButton"),
  }

  const receiveCancelConsentAction = (eventValue) => {
    setIsOpen(false);
  }

  const receiveConsentAction = (eventValue) => {
    setTermsConsented(true);
    formik.setFieldValue("terms",true);
    setIsOpen(false);
  }
  
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      terms: true,
      submit: null
    },
    validationSchema: Yup.object({
      username: Yup.string()
        // .email(t('MESSAGES.emailInvalid'))
        .max(255)
        .required(t('MESSAGES.usernameEmailRequired')),
      password: Yup.string()
        .max(255)
        .required(t('MESSAGES.passwordRequired')),
      terms: Yup.bool()
      .oneOf([true],t('MESSAGES.termsRequired'))
      .required(t('MESSAGES.termsRequired'))
    }),
    onSubmit: async (values, helpers) => {
      // helpers.validateForm(values).then((e) => {helpers.setSubmitting(true); formLoginElement.current.submit(values);})
      // console.log(helpers);
      helpers.setSubmitting(true);
      const res = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password,
        terms: values.terms,
        callbackUrl: `${window.location.origin + (backTo ? backTo : '/admin')}`,
      });
      if (res?.error) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: res.error });
      } else {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: null });
      }
      if (res.error) {
        if (error) {
          window.history.pushState({}, null, "/admin/auth/login/cover" + (backTo ? '?backTo=' + backTo + '&error=' : '?error=') + res.error);
          //router.push(window.location.replace("/admin/auth/login/cover" + (backTo ? '?backTo=' + backTo + '&error=' : '?error=') + res.error));
        }
        let splittedUri = window.location.href.split("?error=");
        if (splittedUri.length < 2) {
          splittedUri = window.location.href.split("&error=");
        }
        router.push(splittedUri[0] + (backTo ? '&error=' : "?error=") + res.error);
      }
      if (res.url) router.push(res.url);
      helpers.setSubmitting(false);

      // try {
      //   await login(values.username, values.password);

      //   if (isMountedRef()) {
      //     const backTo = router.query.backTo || '/';
      //     router.push(backTo);
      //   }
      // } catch (err) {
      //   console.error(err);
      //   if (isMountedRef()) {
      //     helpers.setStatus({ success: false });
      //     helpers.setErrors({ submit: err.message });
      //     helpers.setSubmitting(false);
      //   }
      //   if (err === "Unauthorized") {
      //     enqueueSnackbar(t('MESSAGES.loginError'), {
      //       variant: 'error',
      //       anchorOrigin: {
      //         vertical: 'top',
      //         horizontal: 'center'
      //       },
      //       autoHideDuration: 2000,
      //       TransitionComponent: Slide
      //     });
      //   }
      // }
    }
  });

  const setProviderLayout = (providerData) => {
    if (providerData.name == "Credentials") {
      return (
          <form key={providerData.name} ref={formLoginElement} onSubmit={formik.handleSubmit} action={providerData.callbackUrl} method="POST" {...props}>
            {error && <SignInError error={error} t={t} />}
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              margin="normal"
              autoFocus
              helperText={formik.touched.username && formik.errors.username}
              label={t('FORMS.usernameOrEmailAddress')}
              aria-labelledby={ t('FORMS.usernameOrEmailAddress') }
              aria-describedby={ t('FORMS.usernameOrEmailAddress_help') }
              name="username"
              placeholder='username/email'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.username}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              margin="normal"
              helperText={formik.touched.password && formik.errors.password}
              label={t('FORMS.password')}
              aria-labelledby={ t('FORMS.password') }
              aria-describedby={ t('FORMS.password_help') }
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box alignItems="center" display="flex" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsConsented}
                    onChange={e => { setTermsConsented(e.target.checked);formik.setFieldValue("terms",e.target.checked);}}
                    aria-label={ t('LABELS.checkConfirmTerms') }
                    name="terms"
                    color="primary"
                  />
                }
                label={
                  <>
                    <Typography variant="body2">
                      {t('LABELS.accept')}{' '}
                      <Link href="#" onClick={() => setIsOpen(true)} aria-label={ t('LABELS.linkToReadTerms') }>{t('LABELS.terms')}</Link>.
                    </Typography>
                  </>
                }
              />
              <Link href="/auth/recover-password" aria-label={ t('LABELS.buttonToRecoverPassword') }>
                <b>{t('LABELS.lostPassword')}</b>
              </Link>
            </Box>

            {Boolean(formik.touched.terms && formik.errors.terms) && (
              <FormHelperText error>{formik.errors.terms}</FormHelperText>
            )}

            <Button
              sx={{
                mt: 3
              }}
              color="primary"
              startIcon={
                formik.isSubmitting ? <CircularProgress size="1rem" /> : null
              }
              disabled={formik.isSubmitting}
              aria-describedby={ t('FORMS.submit_help') }
              type="submit"
              fullWidth
              size="large"
              variant="contained"
            >
              {t('LABELS.signInHere')}
            </Button>
            {(termsProps.terms && isOpen) && <Modal dialogOkAction={receiveConsentAction} dialogCancelAction={receiveCancelConsentAction} dialogJson={termsDialogJson} setIsOpen={isOpen}><TermsModal termsLanguages={termsProps.terms.termsLanguages}/></Modal>}
          </form>
      )
    }
    else {
      return (
        <div key={providerData.name}>
          <div className="provider">
                <button onClick={() => signIn(providerData.id, {
                    callbackUrl: `${window.location.origin + backTo ?? backTo}`,
                  })}>
                  Sign in with {providerData.name}
                </button>
          </div>
        </div>
      )
    }
  }

  return (
    <>
      {providers && Object.values(providers).map((provider, index) => (
        setProviderLayout(provider, index)
      ))}
    </>
  );
};