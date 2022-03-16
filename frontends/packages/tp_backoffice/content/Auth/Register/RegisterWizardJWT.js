import { useState, useRef, Children } from 'react';
import {
  Typography,
  Container,
  Divider,
  Button,
  Slide,
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
import { useSnackbar } from 'notistack';
import { i18nextRegisterForm } from "@transitionpt/translations";
import Link from '../../../components/Link';
import { Field, Form, Formik, ErrorMessage } from 'formik';
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
    const { enqueueSnackbar } = useSnackbar();
    const [openAlert, setOpenAlert] = useState(true);
    const [userRegistered, setUserRegistered] = useState(false);
    const [currentLang, setLang] = useState("pt");
    i18nextRegisterForm.changeLanguage(currentLang);

    useEffect(() => {
        const handleNewMessage = (event) => {
          setLang(event.detail);
        };
              
        window.addEventListener('newLang', handleNewMessage);
    }, []);

    const cacheTest = (asyncValidate) => {
      let _valid = false;
      let _value = '';
    
      return async (value) => {
        if (value !== _value) {
          const response = await asyncValidate(value);
          _value = value;
          _valid = response;
          return response;
        }
        return _valid;
      };
    };

    const checkEmailUnique = async (value) => {
      const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/search-user", "POST", null,{ username: value, password: "t" });

      return response.ok !== undefined;
    }

    const checkUsernameUnique = async (value) => {
      const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/search-user", "POST", null,{ username: value, password: "t" });

      return response.ok !== undefined;
    }

    const checkAssociationEmailUnique = async (value) => {
          const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/association/search", "POST", null,{ email: value });

          return response.ok !== undefined;
    }

    const checkAssociationVatUnique = async (value) => {
      const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/association/search", "POST", null,{ vat: value });

      return response.ok !== undefined;
    }

    const checkAssociationVatValid = async (value) => {
      const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/association/validatevat", "POST", null,{ vat: value });

      return response.ok !== undefined;
    }

    return (
        <FormikStepper
                isRegistered={userRegistered}
                initialValues={{
                  first_name: '',
                  last_name: '',
                  username: '',
                  terms: '',
                  promo: true,
                  password: '',
                  password_confirm: '',
                  email: '',
                  association_name: '',
                  association_email: '',
                  association_vat: '',
                  association_address: '',
                  association_town: '',
                }}
                onSubmit={async (values, helpers) => {
                  try {
                    const resetResult = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/register", "POST", null,{
                        firstName: values.first_name,
                        lastName: values.last_name,
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        confirmPassword: values.password_confirm,
                        termsConfirmed: values.terms,
                        associationName: values.association_name,
                        associationEmail: values.association_email,
                        associationVat: values.association_vat,
                        associationAddress: values.association_address,
                        associationTown: values.association_town,
                    });
                    if (resetResult.status === "Success") {
                        setUserRegistered(true);
                        helpers.setSubmitting(false);
                    }
                    else {
                        helpers.setStatus({ success: false });
                        helpers.setErrors({ submit: resetResult.statusText });
                        helpers.setSubmitting(false);
                        if (resetResult.status === 403) {
                            enqueueSnackbar(t('MESSAGES.passwordComplexityError'), {
                              variant: 'error',
                              anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center'
                              },
                              autoHideDuration: 2000,
                              TransitionComponent: Slide
                            });
                        }
                        if (resetResult.status === 500) {
                            enqueueSnackbar(t('MESSAGES.serverError'), {
                              variant: 'error',
                              anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center'
                              },
                              autoHideDuration: 2000,
                              TransitionComponent: Slide
                            });
                        }
                        else if (resetResult.statusText === "Unauthorized") {
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
                        else if (resetResult.status === 409) {
                            enqueueSnackbar(t('MESSAGES.userAlreadyExists'), {
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
                        useRef(cacheTest(checkEmailUnique)).current
                        // async (email) => {
                        //   if (email) {
                        //     const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/search-user", "POST", null,{ username: email, password: "t" });

                        //     return response.ok !== undefined;
                        //   }
                        //   else {
                        //     return true;
                        //   }
                        // }
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
                        useRef(cacheTest(checkUsernameUnique)).current
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
                      .required(t('MESSAGES.confirmPasswordRequired')),
                    terms: Yup.bool()
                      .oneOf([true], 'MESSAGES.termsRequired')
                      .required(t('MESSAGES.termsRequired'))
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
                          aria-labelledby={ t('FORMS.firstName') } 
                          aria-describedby={ t('FORMS.firstName_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="last_name"
                          component={TextField}
                          label={t('FORMS.lastName')}
                          aria-labelledby={ t('FORMS.lastName') } 
                          aria-describedby={ t('FORMS.lastName_help') }
                          placeholder={t('PLACEHOLDER.lastName')}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="email"
                          component={TextField}
                          label={t('FORMS.emailAddress')}
                          aria-labelledby={ t('FORMS.emailAddress') } 
                          aria-describedby={ t('FORMS.emailAddress_help') }
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
                          aria-labelledby={ t('FORMS.username') } 
                          aria-describedby={ t('FORMS.username_help') }
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
                          aria-labelledby={ t('FORMS.password') } 
                          aria-describedby={ t('FORMS.password_help') }
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
                          aria-labelledby={ t('FORMS.confirmPassword') } 
                          aria-describedby={ t('FORMS.confirmPassword_help') }
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
                          aria-labelledby={ t('FORMS.confirmTerms') } 
                          aria-describedby={ t('FORMS.confirmTerms_help') }
                          Label={{
                            label: (
                              <>
                                <Typography variant="body2">
                                  {t('LABELS.accept')}{' '}
                                  <Link href="#" aria-label={ t('FORMS.confirmTermsPopup') } >{t('LABELS.terms')}</Link>.
                                </Typography>
                                <ErrorMessage name="terms" component="div" className="invalid-feedback" />
                              </>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </FormikStep>
                <FormikStep
                  validationSchema={Yup.object().shape({
                    association_name: Yup.string()
                      .max(50,t('MESSAGES.associationNameTooBig', { number: 50 }))
                      .required(t('MESSAGES.associationNameRequired')),
                      association_email: Yup.string()
                      .email(t('MESSAGES.associationEmailInvalid'))
                      .max(100,t('MESSAGES.associationEmailTooBig', { number: 100 }))
                      .required(t('MESSAGES.associationEmailRequired'))
                      .test(
                        'association-email-backend-validation',  // Name
                        t('MESSAGES.associationEmailAlreadyTaken'),               // Msg
                        useRef(cacheTest(checkAssociationEmailUnique)).current
                        
                      ),
                      association_vat: Yup.string()
                      .max(20,t('MESSAGES.associationVatTooBig', { number: 20 }))
                      .test(
                        'association-vat-exists',  // Name
                        t('MESSAGES.associationVatAlreadyTaken'),               // Msg
                        useRef(cacheTest(checkAssociationVatUnique)).current
                        
                      )
                      .test(
                        'association-vat-backend-validation',  // Name
                        t('MESSAGES.associationVatInvalid'),               // Msg
                        useRef(cacheTest(checkAssociationVatValid)).current
                        
                      ),
                      association_address: Yup.string()
                      .max(100,t('MESSAGES.associationAddressTooBig', { number: 100 })),
                      association_town: Yup.string()
                      .max(50,t('MESSAGES.associationTownTooBig', { number: 50 }))
                      .required(t('MESSAGES.associationTownRequired'))
                  })}
                  label={t('LABELS.step2Title')}
                >
                  <Box p={4}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_name"
                          component={TextField}
                          label={t('FORMS.associationName')}
                          aria-labelledby={ t('FORMS.associationName') } 
                          aria-describedby={ t('FORMS.associationName_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_email"
                          type="email"
                          component={TextField}
                          label={t('FORMS.associationEmail')}
                          aria-labelledby={ t('FORMS.associationEmail') } 
                          aria-describedby={ t('FORMS.associationEmail_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_vat"
                          component={TextField}
                          label={t('FORMS.associationVat')}
                          aria-labelledby={ t('FORMS.associationVat') } 
                          aria-describedby={ t('FORMS.associationVat_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_address"
                          component={TextField}
                          label={t('FORMS.associationAddress')}
                          aria-labelledby={ t('FORMS.associationAddress') } 
                          aria-describedby={ t('FORMS.associationAddress_help') }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          fullWidth
                          name="association_town"
                          component={TextField}
                          label={t('FORMS.associationTown')}
                          aria-labelledby={ t('FORMS.associationTown') } 
                          aria-describedby={ t('FORMS.associationTown_help') }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </FormikStep>
                <FormikStep label={t('LABELS.step3Title')}>
                  {userRegistered == true &&
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
                              'MESSAGES.confirmationEmailSent'
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
                          variant="h3"
                        >
                          {t(
                            'MESSAGES.successfulMessage'
                          )}
                        </Typography>

                        <Button
                          fullWidth 
                          variant="contained"
                          aria-label={ t('LABELS.buttonToLogin') }
                          href={'/auth/login/cover'}>
                          {t('LABELS.goLogIn')}
                        </Button>
                      </Container>
                    </Box>
                    }
                </FormikStep>
              </FormikStepper>
    );
}



export function FormikStep({ children }) {
    return <>{children}</>;
  }
  
  export function FormikStepper({ children, isRegistered, ...props }) {
    const childrenArray = Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);
    const { t } = i18nextRegisterForm;

    function isLastStep() {
      return step === childrenArray.length - 2;
    }

    if (completed == false && isRegistered == true) {
      setCompleted(true);
      setStep((s) => s + 1);
    }
  
    return (
      <Formik
        {...props}
        validationSchema={currentChild.props.validationSchema}
        validateOnChange={false}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
              await props.onSubmit(values, helpers);
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