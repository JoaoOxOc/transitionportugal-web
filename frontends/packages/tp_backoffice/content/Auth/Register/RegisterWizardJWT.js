import { useState, Children } from 'react';
import {
  Typography,
  Container,
  Divider,
  Button,
  Card,
  CircularProgress,
  Grid,
  Box,
  Step,
  StepLabel,
  Stepper,
  Collapse,
  Alert,
  Avatar,
  IconButton,
  styled
} from '@mui/material';
import { i18nextRegisterForm } from "@transitionpt/translations";
import Link from '../../../components/Link';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';


const BoxActions = styled(Box)(
    ({ theme }) => `
      background: ${theme.colors.alpha.black[5]}
  `
  );

const AvatarSuccess = styled(Avatar)(
    ({ theme }) => `
        background-color: ${theme.colors.success.main};
        color: ${theme.palette.success.contrastText};
        width: ${theme.spacing(12)};
        height: ${theme.spacing(12)};
        box-shadow: ${theme.colors.shadows.success};
        margin-left: auto;
        margin-right: auto;
  
        .MuiSvgIcon-root {
          font-size: ${theme.typography.pxToRem(45)};
        }
  `
  );

export function RegisterWizardJWT() {
    const { t } = i18nextRegisterForm;
    const [openAlert, setOpenAlert] = useState(true);

    return (
        <FormikStepper
                initialValues={{
                  first_name: '',
                  last_name: '',
                  terms: true,
                  promo: true,
                  password: '',
                  password_confirm: '',
                  email: '',
                  phone: '',
                  company_name: '',
                  company_size: '',
                  company_role: ''
                }}
                onSubmit={async (_values) => {
                  await sleep(3000);
                }}
              >
                <FormikStep
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .email(
                        t('The email provided should be a valid email address')
                      )
                      .max(255)
                      .required(t('The email field is required')),
                    first_name: Yup.string()
                      .max(255)
                      .required(t('The first name field is required')),
                    last_name: Yup.string()
                      .max(255)
                      .required(t('The first name field is required')),
                    password: Yup.string()
                      .min(8)
                      .max(255)
                      .required(t('The password field is required')),
                    password_confirm: Yup.string()
                      .oneOf(
                        [Yup.ref('password')],
                        t('Both password fields need to be the same')
                      )
                      .required(t('This field is required'))
                  })}
                  label={t('Personal Informations')}
                >
                  <Box p={4}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="first_name"
                          component={TextField}
                          label={t('First name')}
                          placeholder={t('Write your first name here...')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="last_name"
                          component={TextField}
                          label={t('Last name')}
                          placeholder={t('Write your last name here...')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="email"
                          component={TextField}
                          label={t('Email')}
                          placeholder={t('Write your email here...')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6} />
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          type="password"
                          name="password"
                          component={TextField}
                          label={t('Password')}
                          placeholder={t('Write a password here...')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          type="password"
                          name="password_confirm"
                          component={TextField}
                          label={t('Confirm password')}
                          placeholder={t('Confirm password here...')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="phone"
                          type="number"
                          component={TextField}
                          label={t('Phone number')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          name="promo"
                          type="checkbox"
                          component={CheckboxWithLabel}
                          Label={{
                            label: t(
                              'Yes, I want to receive monthly promotional materials.'
                            )
                          }}
                        />
                        <br />
                        <Field
                          name="terms"
                          type="checkbox"
                          component={CheckboxWithLabel}
                          Label={{
                            label: (
                              <Typography variant="body2">
                                {t('I accept the')}{' '}
                                <Link href="#">{t('terms and conditions')}</Link>.
                              </Typography>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </FormikStep>
                <FormikStep
                  validationSchema={Yup.object().shape({
                    company_size: Yup.string()
                      .max(55)
                      .required(t('The first name field is required')),
                    company_name: Yup.string()
                      .max(255)
                      .required(t('The first name field is required')),
                    company_role: Yup.string()
                      .max(255)
                      .required(t('The first name field is required'))
                  })}
                  label={t('Company Details')}
                >
                  <Box p={4}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="company_name"
                          component={TextField}
                          label={t('Company name')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="company_size"
                          type="number"
                          component={TextField}
                          label={t('Company size')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="company_role"
                          component={TextField}
                          label={t('Company role')}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </FormikStep>
                <FormikStep label={t('Complete Registration')}>
                  <Box px={4} py={8}>
                    <Container maxWidth="sm">
                      <AvatarSuccess>
                        <CheckTwoToneIcon />
                      </AvatarSuccess>
                      <Collapse in={openAlert}>
                        <Alert
                          sx={{
                            mt: 5
                          }}
                          action={
                            <IconButton
                              aria-label="close"
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
                            'A confirmation has been sent to your email address'
                          )}
                        </Alert>
                      </Collapse>

                      <Typography
                        align="center"
                        sx={{
                          pt: 5,
                          pb: 4,
                          lineHeight: 1.5,
                          px: 10
                        }}
                        variant="h2"
                      >
                        {t(
                          'Check your email to confirm your email and start using your account'
                        )}
                      </Typography>

                      <Button fullWidth variant="contained" href="/">
                        Continue to sign in
                      </Button>
                    </Container>
                  </Box>
                </FormikStep>
              </FormikStepper>
    );
}



export function FormikStep({ children }) {
    return <>{children}</>;
  }
  
  export function FormikStepper({ children, ...props }) {
    const childrenArray = Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);
    const { t } = i18nextRegisterForm;
  
    function isLastStep() {
      return step === childrenArray.length - 2;
    }
  
    return (
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await props.onSubmit(values, helpers);
            setCompleted(true);
            setStep((s) => s + 1);
          } else {
            setStep((s) => s + 1);
            helpers.setTouched({});
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step
                  key={child.props.label}
                  completed={step > index || completed}
                >
                  <StepLabel>{child.props.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
  
            {currentChild}
            {!completed ? (
              <BoxActions
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  disabled={isSubmitting || step === 0}
                  variant="outlined"
                  color="primary"
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                >
                  {t('Previous')}
                </Button>
  
                <Button
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting
                    ? t('Submitting')
                    : isLastStep()
                    ? t('Complete registration')
                    : t('Next step')}
                </Button>
              </BoxActions>
            ) : null}
          </Form>
        )}
      </Formik>
    );
  }