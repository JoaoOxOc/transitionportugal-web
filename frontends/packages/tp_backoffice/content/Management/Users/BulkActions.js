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
  Slide,
  styled
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { i18nextUsersList } from "@transitionpt/translations";
import { useErrorHandler } from 'react-error-boundary';

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';

import { UsersActionsContext } from '../../../contexts/Actions/UsersActionsContext';
import { useRefMounted } from '../../../hooks/useRefMounted';
import { ResendEmails, ApproveUsers, DeleteUsers } from '../../../services/users';

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
  const { t } = i18nextUsersList;
  const isMountedRef = useRefMounted();
  const [actionsError, setActionsError] = useState(null);
  useErrorHandler(actionsError);
  const { enqueueSnackbar } = useSnackbar();
  const { selectedUsers } = useContext(UsersActionsContext);
  console.log(selectedUsers);

  const openMenu = () => {
    menuOpen(true);
  };

  const closeMenu = () => {
    menuOpen(false);
  };

  const resendEmails = async() => {
    const ids = isSingleRecord == true ? [recordId] : selectedUsers;
    const result = await ResendEmails(process.env.NEXT_PUBLIC_API_BASE_URL + '/users/resend',{userIds: ids});
    if (isMountedRef()) {
      if (result.status) {
        if (result.status === 404) {
          enqueueSnackbar(t('MESSAGES.usersNotFound'), {
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
    const ids = isSingleRecord == true ? [recordId] : selectedUsers;
    const result = await ApproveUsers(process.env.NEXT_PUBLIC_API_BASE_URL + '/users/approve',{userIds: ids});
    if (isMountedRef()) {
      if (result.status) {
        if (result.status === 404) {
          enqueueSnackbar(t('MESSAGES.usersNotFound'), {
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
        enqueueSnackbar(t('MESSAGES.usersApproved'), {
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
    const ids = isSingleRecord == true ? [recordId] : selectedUsers;
    const result = await DeleteUsers(process.env.NEXT_PUBLIC_API_BASE_URL + '/users/delete',{userIds: ids});
    if (isMountedRef()) {
      if (result.status) {
        if (result.status === 404) {
          enqueueSnackbar(t('MESSAGES.usersNotFound'), {
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
        enqueueSnackbar(t('MESSAGES.usersRemoved'), {
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
                {isSingleRecord == true ? t('ACTIONS.approveUserSingle') : t('ACTIONS.approveUser')}
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
