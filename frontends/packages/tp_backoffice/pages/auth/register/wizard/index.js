import { useState, Children } from 'react';
import {
  Typography,
  Container,
  Divider,
  Card,
  Box,
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
import { Guest } from '../../../../components/Guest';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import Scrollbar from '../../../../components/Scrollbar';
import Link from '../../../../components/Link';
import { GetPublicTerms } from '../../../../services/terms';
import { GetAssociationTypes } from '../../../../services/associations';
import { i18nextRegister } from "@transitionpt/translations";

import SwiperCore, { Navigation, Pagination } from 'swiper';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import Logo from '../../../../components/LogoSign';
import { RegisterWizardJWT } from '../../../../content/Auth/Register/RegisterWizardJWT';

SwiperCore.use([Navigation, Pagination]);

const icons = {
  CircularEconomy: '/admin/static/images/logo/circular-economy-icon-green.png',
  InnerTransition: '/admin/static/images/logo/inner-transition.png',
  InnerCircle: '/admin/static/images/logo/inner-circle.png',
  TransitionTowns: '/admin/static/images/logo/transition-towns.png'
};

const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

const MainContent = styled(Box)(
  ({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      padding: '0 0 0 0'
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 400px 0 0'
    },
    height: '100%',
    overflow: 'auto',
    flex: 1,
    minWidth: '600px'
  })
);


const SidebarWrapper = styled(Box)(
  ({ theme }) => ({
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      width: '100%'
    },
    [theme.breakpoints.up('md')]: {
      position: 'fixed',
      width: '420px'
    },
    right: 0,
    top: 0,
    height: '100%',
    background: theme.colors.gradients.blue3
  })
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

function RegisterWizard({termsProps, associationTypes}) {
  const { t } = i18nextRegister;
  console.log(termsProps);
  return (
    <>
      <Head>
        <title>{t('LABELS.pageTitle')}</title>
      </Head>
      <Content>
        
      <MainContent>
          <Container
            sx={{
              my: 4
            }}
            maxWidth="md"
          >
            <Logo/>
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
                  {t('LABELS.subtitle')}
                </Typography>
              </Box>
              <Box px={4} mt={3} mb={3}>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {t('LABELS.alreadyRegistered')}
                </Typography>{' '}
                <Link
                  href={'/auth/login/cover'}
                  aria-label={ t('LABELS.buttonToLogin') }
                >
                  <b>{t('LABELS.signInHere')}</b>
                </Link>
              </Box>

              <RegisterWizardJWT termsProps={termsProps} associationTypes={associationTypes}/>
            </Card>
          </Container>
        </MainContent>
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
                {t('COVER.title')}
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
                        <Image width={80} height={80} alt={t('COVER.transitionTowns')} src={icons['TransitionTowns']} />
                      </CardImg>
                      <TypographyPrimary
                        align="center"
                        variant="h3"
                        sx={{
                          mb: 2
                        }}
                      >
                        {t('COVER.transitionTowns')}
                      </TypographyPrimary>
                      <TypographySecondary
                        align="center"
                        variant="subtitle2"
                        sx={{
                          mb: 5
                        }}
                      >
                        {t('COVER.aboutTransitionTowns')}
                      </TypographySecondary>
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box textAlign="center">
                      <CardImg>
                        <Image width={80} height={80} alt={t('COVER.circularEconomy')} src={icons['CircularEconomy']} />
                      </CardImg>
                      <TypographyPrimary
                        align="center"
                        variant="h3"
                        sx={{
                          mb: 2
                        }}
                      >
                        {t('COVER.circularEconomy')}
                      </TypographyPrimary>
                      <TypographySecondary
                        align="center"
                        variant="subtitle2"
                        sx={{
                          mb: 5
                        }}
                      >
                        {t('COVER.aboutCircularEconomy')}
                      </TypographySecondary>
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box textAlign="center">
                      <CardImg>
                      <Image width={80} height={80} alt={t('COVER.innerTransition')} src={icons['InnerTransition']} />
                      </CardImg>
                      <TypographyPrimary
                        align="center"
                        variant="h3"
                        sx={{
                          mb: 2
                        }}
                      >
                        {t('COVER.innerTransition')}
                      </TypographyPrimary>
                      <TypographySecondary
                        align="center"
                        variant="subtitle2"
                        sx={{
                          mb: 5
                        }}
                      >
                        {t('COVER.aboutInnerTransition')}
                      </TypographySecondary>
                    </Box>
                  </SwiperSlide>
                  <SwiperSlide>
                    <Box textAlign="center">
                      <CardImg>
                        <Image width={80} height={80} alt={t('COVER.innerCircle')} src={icons['InnerCircle']} />
                      </CardImg>
                      <TypographyPrimary
                        align="center"
                        variant="h3"
                        sx={{
                          mb: 2
                        }}
                      >
                        {t('COVER.innerCircle')}
                      </TypographyPrimary>
                      <TypographySecondary
                        align="center"
                        variant="subtitle2"
                        sx={{
                          mb: 5
                        }}
                      >
                        {t('COVER.aboutInnerCircle')}
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
                  {t('COVER.bottomTitle')}
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
                      primary={t('COVER.bottomAdvantage1')}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIconWrapper>
                      <CheckCircleOutlineTwoToneIcon />
                    </ListItemIconWrapper>
                    <ListItemTextWrapper
                      primaryTypographyProps={{ variant: 'h6' }}
                      primary={t('COVER.bottomAdvantage2')}
                    />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIconWrapper>
                      <CheckCircleOutlineTwoToneIcon />
                    </ListItemIconWrapper>
                    <ListItemTextWrapper
                      primaryTypographyProps={{ variant: 'h6' }}
                      primary={t('COVER.bottomAdvantage3')}
                    />
                  </ListItem>
                </List>
              </Box>
            </SidebarContent>
          </Scrollbar>
        </SidebarWrapper>
      </Content>
    </>
  );
}

RegisterWizard.getLayout = (page) => (
  <Guest>
    <BaseLayout>{page}</BaseLayout>
  </Guest>
);

export async function getServerSideProps(context) {
    const { req } = context;
    const userBrowserLanguage = req.headers ? req.headers['accept-language'].split(",")[0].toLowerCase() : "pt-pt";
    const termsProps = await GetPublicTerms(userBrowserLanguage);
    let associationTypesGetResponse = null;
    let associationTypesGetResponseError = null;
    try {
      associationTypesGetResponse = await GetAssociationTypes(process.env.NEXT_PUBLIC_API_BASE_URL + "/associations/types");

      if (associationTypesGetResponse.status) {
        associationTypesGetResponseError = {status: associationTypesGetResponse.status, statusText: associationTypesGetResponse.statusText };
      }
      else if (associationTypesGetResponse.errno === "ENOTFOUND" || associationTypesGetResponse.errno === "ECONNREFUSED") {
        associationTypesGetResponseError = { message: 'FetchError', status: 404, statusText: associationTypesGetResponse.errno };
      }
    } catch (err) {
      associationTypesGetResponseError = {status: err.status, statusText: err.statusText };
    }
    const associationTypes = associationTypesGetResponseError ? { associationTypesError: associationTypesGetResponseError } : {associationTypes: associationTypesGetResponse.associationTypes};

    return {
      props: { termsProps, associationTypes },
    }
}

export default RegisterWizard;
