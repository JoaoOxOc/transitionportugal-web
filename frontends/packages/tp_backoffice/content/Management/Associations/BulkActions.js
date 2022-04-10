import { useState, useRef } from 'react';

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
  styled
} from '@mui/material';
import { i18nextAssociationsList } from "@transitionpt/translations";

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';

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

function BulkActions() {
  const [onMenuOpen, menuOpen] = useState(false);
  const moreRef = useRef(null);
  const { t } = i18nextAssociationsList;

  const openMenu = () => {
    menuOpen(true);
  };

  const closeMenu = () => {
    menuOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography variant="h5" color="text.secondary">
            {t('Bulk actions')}:
          </Typography>
          <Tooltip arrow placement="top" title={t('Resend verification email')}>
            <IconButton
              color="primary"
              sx={{
                ml: 1,
                p: 1
              }}
            >
              <ForwardToInboxTwoToneIcon />
            </IconButton>
          </Tooltip>
          <ButtonSuccess
            sx={{
              ml: 1
            }}
            startIcon={<CheckTwoToneIcon />}
            variant="contained">
              {t('Approve')}
          </ButtonSuccess>
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
          <ListItem button>
            <ListItemText primary={t('Delete associations')} />
          </ListItem>
        </List>
      </Menu>
    </>
  );
}

export default BulkActions;
