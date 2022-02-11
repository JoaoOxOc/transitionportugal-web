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
import {genericFetch} from '../../../services/genericFetch';


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
                  username: '',
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
                        t('MESSAGES.emailInvalid')
                      )
                      .max(100,t('MESSAGES.emailTooBig', { number: 100 }))
                      .required(t('MESSAGES.emailRequired'))
                      .test(
                        'email-backend-validation',  // Name
                        t('MESSAGES.emailAlreadyTaken'),               // Msg
                        async (email) => {
                          if (email) {
                            const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/search-user", "POST", null,{ username: email, password: "t" });

                            return response.ok !== undefined;
                          }
                          else {
                            return true;
                          }
                        }
                      ),
                    first_name: Yup.string()
                      .max(20, t('MESSAGES.firstNameTooBig', { number: 20 }))
                      .required(t('MESSAGES.firstNameRequired')),
                    last_name: Yup.string()
                      .max(20, t('MESSAGES.lastNameTooBig', { number: 20 }))
                      .required(t('MESSAGES.lastNameRequired')),
                    username: Yup.string()
                      .max(50, t('MESSAGES.usernameTooBig', { number: 50 }))
                      .required(t('MESSAGES.usernameRequired'))
                      .test(
                        'username-backend-validation',  // Name
                        t('MESSAGES.usernameAlreadyTaken'),               // Msg
                        async (username) => {
                          if (username) {
                            const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/search-user", "POST", null,{ username: username, password: "t" });

                            return response.ok !== undefined;
                          }
                          else {
                            return true;
                          }
                        }
                      ),
                    password: Yup.string()
                      .min(8, t('MESSAGES.passwordTooSmall', { number: 8 }))
                      .max(100, t('MESSAGES.passwordTooBig', { number: 100 }))
                      .required(t('MESSAGES.passwordRequired')),
                    password_confirm: Yup.string()
                      .oneOf(
                        [Yup.ref('password')],
                        t('MESSAGES.passwordsNoMatch')
                      )
                      .required(t('MESSAGES.confirmPasswordRequired'))
                  })}
                  label={t('LABELS.step1Title')}
                >
                  <Box p={4}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="first_name"
                          component={TextField}
                          label={t('FORMS.firstName')}
                          placeholder={t('PLACEHOLDER.firstName')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="last_name"
                          component={TextField}
                          label={t('FORMS.lastName')}
                          placeholder={t('PLACEHOLDER.lastName')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="email"
                          component={TextField}
                          label={t('FORMS.emailAddress')}
                          placeholder={t('PLACEHOLDER.emailAddress')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="username"
                          type="text"
                          component={TextField}
                          label={t('FORMS.username')}
                          placeholder={t('PLACEHOLDER.username')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          type="password"
                          name="password"
                          component={TextField}
                          label={t('FORMS.password')}
                          placeholder={t('PLACEHOLDER.password')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          type="password"
                          name="password_confirm"
                          component={TextField}
                          label={t('FORMS.confirmPassword')}
                          placeholder={t('PLACEHOLDER.confirmPassword')}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        {/* <Field
                          name="promo"
                          type="checkbox"
                          component={CheckboxWithLabel}
                          Label={{
                            label: t(
                              'Yes, I want to receive monthly promotional materials.'
                            )
                          }}
                        />
                        <br /> */}
                        <Field
                          name="terms"
                          type="checkbox"
                          component={CheckboxWithLabel}
                          Label={{
                            label: (
                              <Typography variant="body2">
                                {t('LABELS.accept')}{' '}
                                <Link href="#">{t('LABELS.terms')}</Link>.
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
                  label={t('LABELS.step2Title')}
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
                <FormikStep label={t('LABELS.step3Title')}>
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
        validateOnChange={false}
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
                  {t('LABELS.previous')}
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
                    ? t('LABELS.submitting')
                    : isLastStep()
                    ? t('LABELS.completeRegist')
                    : t('LABELS.nextStep')}
                </Button>
              </BoxActions>
            ) : null}
          </Form>
        )}
      </Formik>
    );
  }