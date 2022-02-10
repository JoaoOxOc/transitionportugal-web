import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Link from '../../../components/Link';

import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Checkbox,
  Typography,
  FormControlLabel,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import { useRefMounted } from '../../../hooks/useRefMounted';
import { useSnackbar } from 'notistack';
import { Slide } from '@mui/material';
import { i18nextLoginForm } from "@transitionpt/translations";

export const LoginJWT = (props) => {
  const { t } = i18nextLoginForm;
  const [currentLang, setLang] = useState("pt");
  i18nextLoginForm.changeLanguage(currentLang);
  const { login } = useAuth();
  const isMountedRef = useRefMounted();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const handleNewMessage = (event) => {
      setLang(event.detail);
    };
          
    window.addEventListener('newLang', handleNewMessage);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: 'demo@example.com',
      password: 'test',
      terms: true,
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup.string()
        // .email(t('MESSAGES.emailInvalid'))
        .max(255)
        .required(t('MESSAGES.usernameEmailRequired')),
      password: Yup.string()
        .max(255)
        .required(t('MESSAGES.passwordRequired')),
      terms: Yup.boolean().oneOf(
        [true],
        t('MESSAGES.termsRequired')
      )
    }),
    onSubmit: async (values, helpers) => {
      try {
        await login(values.email, values.password);

        if (isMountedRef()) {
          const backTo = router.query.backTo || '/';
          router.push(backTo);
        }
      } catch (err) {
        console.error(err);
        if (isMountedRef()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
        if (err === "Unauthorized") {
          enqueueSnackbar(t('MESSAGES.loginError'), {
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
    }
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      <TextField
        error={Boolean(formik.touched.email && formik.errors.email)}
        fullWidth
        margin="normal"
        autoFocus
        helperText={formik.touched.email && formik.errors.email}
        label={t('FORMS.usernameOrEmailAddress')}
        name="email"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="text"
        value={formik.values.email}
        variant="outlined"
      />
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        margin="normal"
        helperText={formik.touched.password && formik.errors.password}
        label={t('FORMS.password')}
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
              checked={formik.values.terms}
              name="terms"
              color="primary"
              onChange={formik.handleChange}
            />
          }
          label={
            <>
              <Typography variant="body2">
                {t('LABELS.accept')}{' '}
                <Link href="#">{t('LABELS.terms')}</Link>.
              </Typography>
            </>
          }
        />
        <Link href="/auth/recover-password">
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
        type="submit"
        fullWidth
        size="large"
        variant="contained"
      >
        {t('LABELS.signInHere')}
      </Button>
    </form>
  );
};
