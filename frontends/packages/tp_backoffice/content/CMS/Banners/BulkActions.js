import { useState, useContext, useRef } from 'react';

import {
  Box,
  Menu,
  Tooltip,
  IconButton,
  Button,
  ListItemText,
  ListItem,
  List,
  Typography,
  styled,
  Slide
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { i18nextBannersList } from "@transitionpt/translations";
import { useErrorHandler } from 'react-error-boundary';
import { useSession } from "next-auth/react";
import { ActivateBanners, InactivateBanners, DeleteBanners } from '../../../services/cms/banners';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import { BannersActionsContext } from '../../../contexts/Actions/BannersActionsContext';
import { useRefMounted } from '../../../hooks/useRefMounted';

const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const ButtonSuccess = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.success.main};
     color: ${theme.palette.success.contrastText};

     &:hover {
        background: ${theme.colors.success.dark};
     }
    `
);

function BulkActions({isSingleRecord, recordId, recordIsVerified, recordIsActivated}) {
  const [onMenuOpen, menuOpen] = useState(false);
  const moreRef = useRef(null);
  const isMountedRef = useRefMounted();
  const [actionsError, setActionsError] = useState(null);
  useErrorHandler(actionsError);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = i18nextBannersList;
  const { selectedBanners } = useContext(BannersActionsContext);
  const { data: session, status } = useSession();

  const openMenu = () => {
    menuOpen(true);
  };

  const closeMenu = () => {
    menuOpen(false);
  };

  const resendEmails = async() => {
    const ids = isSingleRecord == true ? [recordId] : selectedBanners;
    const result = await ResendEmails(process.env.NEXT_PUBLIC_API_BASE_URL + '/banner/resend',{bannerIds: ids}, session.accessToken);
    if (isMountedRef()) {
      if (result.status) {
        if (result.status === 404) {
          enqueueSnackbar(t('MESSAGES.bannersNotFound'), {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            autoHideDuration: 2000,
            TransitionComponent: Slide
          });
        }
        else {
          setActionsError(result);
        }
      }
      else {
        enqueueSnackbar(t('MESSAGES.resentEmails'), {
            variant: 'success',
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

  const approve = async() => {
    const ids = isSingleRecord == true ? [recordId] : selectedBanners;
    const result = await ActivateBanners(process.env.NEXT_PUBLIC_API_BASE_URL + '/banner/approve',{bannerIds: ids}, session.accessToken);
    if (isMountedRef()) {
      if (result.status) {
        if (result.status === 404) {
          enqueueSnackbar(t('MESSAGES.bannersNotFound'), {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            autoHideDuration: 2000,
            TransitionComponent: Slide
          });
        }
        else {
          setActionsError(result);
        }
      }
      else {
        enqueueSnackbar(t('MESSAGES.bannersApproved'), {
            variant: 'success',
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

  const deleteAccount = async() => {
    const ids = isSingleRecord == true ? [recordId] : selectedBanners;
    const result = await DeleteBanners(process.env.NEXT_PUBLIC_API_BASE_URL + '/banner/delete',{bannerIds: ids}, session.accessToken);
    if (isMountedRef()) {
      if (result.status) {
        if (result.status === 404) {
          enqueueSnackbar(t('MESSAGES.bannersNotFound'), {
            variant: 'error',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center'
            },
            autoHideDuration: 2000,
            TransitionComponent: Slide
          });
        }
        else {
          setActionsError(result);
        }
      }
      else {
        enqueueSnackbar(t('MESSAGES.bannersRemoved'), {
            variant: 'success',
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

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            {t('LABELS.actions')}:
          </Typography>
          { !recordIsVerified &&
            <Tooltip arrow placement="top" title={isSingleRecord == true ? t('ACTIONS.resendVerifyEmailSingle') : t('ACTIONS.resendVerifyEmail')}>
              <IconButton
                color="primary"
                onClick={resendEmails}
                sx={{
                  ml: 1,
                  p: 1
                }}
              >
                <ForwardToInboxTwoToneIcon />
              </IconButton>
            </Tooltip>
          }
          { !recordIsActivated &&
            <ButtonSuccess
              sx={{
                ml: 1
              }}
              onClick={approve}
              startIcon={<CheckTwoToneIcon />}
              variant="contained">
                {isSingleRecord == true ? t('ACTIONS.activateBannerSingle') : t('ACTIONS.activateBanner')}
            </ButtonSuccess>
          }
        </Box>
        <IconButton
          color="primary"
          onClick={openMenu}
          ref={moreRef}
          sx={{
            ml: 2,
            p: 1
          }}
        >
          <MoreVertTwoToneIcon />
        </IconButton>
      </Box>

      <Menu
        disableScrollLock
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        <List
          sx={{
            p: 1
          }}
          component="nav"
        >
          <ListItem button onClick={deleteAccount}>
            <ListItemText primary={isSingleRecord == true ? t('ACTIONS.deleteSingle') : t('ACTIONS.delete')}/>
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
