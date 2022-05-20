import PropTypes from 'prop-types';

import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  styled
} from '@mui/material';
import { i18nextUserDetails } from "@transitionpt/translations";
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';

import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';

import BreadcrumbsDetailsComponent from '../../../../components/Breadcrumbs/BreadcrumbsDetailsComponent';
import Link from '../../../../components/Link';
import Label from '../../../../components/Label';
import BulkActions from '../BulkActions';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const AvatarAssociationWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const ProfileCover = ({ user, isProfile, breadcrumbsDataJson }) => {
  const { t } = i18nextUserDetails;
  let associationDetailsBaseUri = isProfile ? "/profile/association" : "/management/associations/single/";

  return (
    <>
      <Box display="flex" mb={3}>
        {!isProfile &&
        <Tooltip arrow placement="top" title={t('LABELS.goBack')}>
          <IconButton
            href="/management/users"
            color="primary"
            sx={{
              p: 2,
              mr: 2
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        }
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {t('LABELS.userDetails', {name: user.name})}
          </Typography>
          {/* <Typography variant="subtitle2">
            {t('This is a profile page. Easy to modify, always blazing fast')}
          </Typography> */}
          {!isProfile && breadcrumbsDataJson &&
              <BreadcrumbsDetailsComponent urlDataJson={breadcrumbsDataJson}/>
          }
        </Box>
      </Box>
      { user && user.associationId ? (
          <>
            <CardCover>
              <CardMedia image={user.associationLogoImage} />
              <CardCoverAction>
                <Tooltip title={t('LABELS.view')} arrow>
                    <Link href={isProfile ? associationDetailsBaseUri : associationDetailsBaseUri + user.associationId} isNextLink={true}>
                        <Button
                          startIcon={<LaunchTwoToneIcon />}
                          variant="contained"
                          component="span"
                        >
                          {user.associationName}
                        </Button>
                    </Link>
                </Tooltip>
                {/* <Input accept="image/*" id="change-cover" multiple type="file" />
                <label htmlFor="change-cover">
                  <Button
                    startIcon={<LaunchTwoToneIcon />}
                    variant="contained"
                    component="span"
                  >
                    {user.associationName}
                  </Button>
                </label> */}
              </CardCoverAction>
            </CardCover>
            <AvatarAssociationWrapper>
              <Avatar variant="rounded" alt={user.name} src={user.avatar} />
              <ButtonUploadWrapper>
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  name="icon-button-file"
                  type="file"
                />
                <label htmlFor="icon-button-file">
                  <IconButton component="span" color="primary">
                    <UploadTwoToneIcon />
                  </IconButton>
                </label>
              </ButtonUploadWrapper>
            </AvatarAssociationWrapper>
          </>
      ) : (
        <AvatarWrapper>
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>
      )}
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.name}
        </Typography>
        <Typography variant="subtitle2">{t("LABELS.userRole", {name: user.userRole == "AssociationAdmin" ? t("ROLES.associationAdmin") : (user.userRole == "Admin" ? t("ROLES.admin") : (user.associationId ? t("ROLES.associationUser") : t("ROLES.user")))})}</Typography>
        <Typography
          sx={{
            py: 2
          }}
          variant="subtitle2"
          color="text.primary"
        >
          {t('LABELS.accountStatus')}: <Label color={user && user.isActive ? "success" : "error"}>
                    {user && user.isActive ? <DoneTwoToneIcon fontSize="small" /> : <CloseTwoToneIcon fontSize="small" />}
                    <b>{user && user.isActive ? t('LABELS.active') : t('LABELS.inactive')}</b>
                  </Label>
          | {t('LABELS.accountEmailVerified')}: <Label color={user && user.isEmailVerified ? "success" : "error"}>
            {user && user.isEmailVerified ? <DoneTwoToneIcon fontSize="small" /> : <CloseTwoToneIcon fontSize="small" />}
            <b>{user && user.isEmailVerified ? t('LABELS.emailVerified') : t('LABELS.emailNotVerified')}</b>
          </Label>
        </Typography>
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {!isProfile && user &&
              <BulkActions isSingleRecord={true} recordId={user.id} recordIsVerified={user.isEmailVerified} recordIsActivated={user.isActive}/>
            }
            {/* <Button size="small" variant="contained">
              {t('Follow')}
            </Button> */}
            {/* <Button
              size="small"
              sx={{
                mx: 1
              }}
              variant="outlined"
            >
              {t('View website')}
            </Button> */}
            {/* <IconButton
              color="primary"
              sx={{
                p: 0.5
              }}
            >
              <MoreHorizTwoToneIcon />
            </IconButton> */}
          </Box>
          {/* <Button
            sx={{
              mt: { xs: 2, md: 0 }
            }}
            size="small"
            variant="text"
            endIcon={<ArrowForwardTwoToneIcon />}
          >
            {t('See all')}
            {' ' + user.followers + ' '}
            {t('connections')}
          </Button> */}
        </Box>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileCover;
