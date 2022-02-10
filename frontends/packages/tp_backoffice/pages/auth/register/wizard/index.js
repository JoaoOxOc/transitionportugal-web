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
  ListItemText,
  ListItem,
  List,
  ListItemIcon,
  styled
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';

import BaseLayout from '../../../../layouts/BaseLayout';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';
import * as Yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { Guest } from '../../../../components/Guest';
import Link from '../../../../components/Link';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import Scrollbar from '../../../../components/Scrollbar';
import { i18nextRegister } from "@transitionpt/translations";
import { i18nextRegisterForm } from "@transitionpt/translations";
import Logo from '../../../../components/LogoSign';
import { useRouter } from 'next/router';

import SwiperCore, { Navigation, Pagination } from 'swiper';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';

SwiperCore.use([Navigation, Pagination]);

const icons = {
  Auth0: '/static/images/logo/auth0.svg',
  FirebaseAuth: '/static/images/logo/firebase.svg',
  JWT: '/static/images/logo/jwt.svg',
  Amplify: '/static/images/logo/amplify.svg'
};

const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

const MainContent = styled(Box)(
  () => `
    height: 100%;
    overflow: auto;
    flex: 1;
`
);

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

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 500px;
  background: ${theme.colors.gradients.blue3};
`
);

const SidebarContent = styled(Box)(
  ({ theme }) => `
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing(6)};
`
);

const CardImg = styled(Card)(
  ({ theme }) => `
    border-radius: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border: 11px solid ${theme.colors.alpha.trueWhite[10]};
    transition: ${theme.transitions.create(['border'])};
    width: ${theme.spacing(16)};
    height: ${theme.spacing(16)};
    margin-bottom: ${theme.spacing(3)};
`
);

const SwipeIndicator = styled(IconButton)(
  ({ theme }) => `
        color: ${theme.colors.alpha.trueWhite[50]};
        width: ${theme.spacing(6)};
        height: ${theme.spacing(6)};
        border-radius: 100px;
        transition: ${theme.transitions.create(['background', 'color'])};

        &:hover {
          color: ${theme.colors.alpha.trueWhite[100]};
          background: ${theme.colors.alpha.trueWhite[10]};
        }
`
);

const LogoWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    left: ${theme.spacing(4)};
    top: ${theme.spacing(4)};
`
);

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.trueWhite[100]};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      color: ${theme.colors.alpha.trueWhite[70]};
`
);

const DividerWrapper = styled(Divider)(
  ({ theme }) => `
      background: ${theme.colors.alpha.trueWhite[10]};
`
);

const ListItemTextWrapper = styled(ListItemText)(
  ({ theme }) => `
      color: ${theme.colors.alpha.trueWhite[70]};
`
);
const ListItemIconWrapper = styled(ListItemIcon)(
  ({ theme }) => `
      color: ${theme.colors.success.main};
      min-width: 32px;
`
);

const SwiperWrapper = styled(Box)(
  ({ theme }) => `
      .swiper-pagination {
        .swiper-pagination-bullet {
          background: ${theme.colors.alpha.trueWhite[30]};
          opacity: 1;
          transform: scale(1);

          &.swiper-pagination-bullet-active {
            background: ${theme.colors.alpha.trueWhite[100]};
            width: 16px;
            border-radius: 6px;
          }
        }
      }
`
);

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

function RegisterWizard() {
  const { t } = i18nextRegister;
  const [openAlert, setOpenAlert] = useState(true);

  return (
    <>
      <Head>
        <title>Register - Wizard</title>
      </Head>
      <Content>
      <SidebarWrapper
          sx={{
            display: { xs: 'none', md: 'inline-block' }
          }}
        >
          <Scrollbar>
            <SidebarContent>
              <Box mb={2} display="flex" justifyContent="center">
                <SwipeIndicator className="MuiSwipe-root MuiSwipe-left">
                  <ChevronLeftTwoToneIcon fontSize="large" />
                </SwipeIndicator>
                <SwipeIndicator className="MuiSwipe-root MuiSwipe-right">
                  <ChevronRightTwoToneIcon fontSize="large" />
                </SwipeIndicator>
              </Box>
              <TypographyPrimary
                align="center"
                variant="h3"
                sx={{
                  mb: 4,
                  px: 8
                }}
              >
                {t('Multiple authentication methods available')}
              </TypographyPrimary>
              <SwiperWrapper>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={1}
                  loop
                  navigation={{
                    nextEl: '.MuiSwipe-right',
                    prevEl: '.MuiSwipe-left'
                  }}
                  pagination={{ dynamicBullets: true, clickable: true }}
                >
                  <SwiperSlide>
                    <Box textAlign="center">
                      <CardImg>
                        <img
                          height={80}
                          alt="JSON Web Token"
                          src={icons['Auth0']}
                        />
                      </CardImg>
                      <TypographyPrimary
                        align="center"
                        variant="h3"
                        sx={{
                          mb: 2
                        }}
                      >
                        Auth0
                      </TypographyPrimary>
                      <TypographySecondary
                        align="center"
                        variant="subtitle2"
                        sx={{
                          mb: 5
                        }}
                      >
                        Auth0 is an easy to implement, adaptable authentication
                        and authorization platform.
                      </TypographySecondary>
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box textAlign="center">
                      <CardImg>
                        <img
                          height={80}
                          alt="AWS Amplify"
                          src={icons['Amplify']}
                        />
                      </CardImg>
                      <TypographyPrimary
                        align="center"
                        variant="h3"
                        sx={{
                          mb: 2
                        }}
                      >
                        AWS Amplify
                      </TypographyPrimary>
                      <TypographySecondary
                        align="center"
                        variant="subtitle2"
                        sx={{
                          mb: 5
                        }}
                      >
                        Build scalable mobile and web apps fast, with endless
                        flexibility.
                      </TypographySecondary>
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box textAlign="center">
                      <CardImg>
                        <img
                          height={80}
                          alt="JSON Web Token"
                          src={icons['JWT']}
                        />
                      </CardImg>
                      <TypographyPrimary
                        align="center"
                        variant="h3"
                        sx={{
                          mb: 2
                        }}
                      >
                        JSON Web Token
                      </TypographyPrimary>
                      <TypographySecondary
                        align="center"
                        variant="subtitle2"
                        sx={{
                          mb: 5
                        }}
                      >
                        JSON Web Tokens are an open method for representing
                        claims securely between two parties.
                      </TypographySecondary>
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box textAlign="center">
                      <CardImg>
                        <img
                          height={80}
                          alt="Firebase"
                          src={icons['FirebaseAuth']}
                        />
                      </CardImg>
                      <TypographyPrimary
                        align="center"
                        variant="h3"
                        sx={{
                          mb: 2
                        }}
                      >
                        Firebase
                      </TypographyPrimary>
                      <TypographySecondary
                        align="center"
                        variant="subtitle2"
                        sx={{
                          mb: 5
                        }}
                      >
                        Firebase helps teams from startups to global enterprises
                        build &amp; run successful apps.
                      </TypographySecondary>
                    </Box>
                  </SwiperSlide>
                </Swiper>
              </SwiperWrapper>

              <DividerWrapper
                sx={{
                  mt: 3,
                  mb: 4
                }}
              />
              <Box>
                <TypographyPrimary
                  variant="h3"
                  sx={{
                    mb: 3
                  }}
                >
                  {t('Start your free trial today')}
                </TypographyPrimary>

                <List
                  dense
                  sx={{
                    mb: 3
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemIconWrapper>
                      <CheckCircleOutlineTwoToneIcon />
                    </ListItemIconWrapper>
                    <ListItemTextWrapper
                      primaryTypographyProps={{ variant: 'h6' }}
                      primary={t('premium features included')}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIconWrapper>
                      <CheckCircleOutlineTwoToneIcon />
                    </ListItemIconWrapper>
                    <ListItemTextWrapper
                      primaryTypographyProps={{ variant: 'h6' }}
                      primary={t('no credit card required')}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIconWrapper>
                      <CheckCircleOutlineTwoToneIcon />
                    </ListItemIconWrapper>
                    <ListItemTextWrapper
                      primaryTypographyProps={{ variant: 'h6' }}
                      primary={t('modern development solutions')}
                    />
                  </ListItem>
                </List>
              </Box>
            </SidebarContent>
          </Scrollbar>
        </SidebarWrapper>
        <MainContent>
          <Container
            sx={{
              my: 4
            }}
            maxWidth="md"
          >
            <Logo />
            <Card
              sx={{
                mt: 3,
                pt: 4
              }}
            >
              <Box px={4}>
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1
                  }}
                >
                  {t('Create account')}
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3
                  }}
                >
                  {t('Fill in the fields below to sign up for an account.')}
                </Typography>
              </Box>

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
            </Card>
          </Container>
        </MainContent>
      </Content>
    </>
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

RegisterWizard.getLayout = (page) => (
  <Guest>
    <BaseLayout>{page}</BaseLayout>
  </Guest>
);

export default RegisterWizard;
