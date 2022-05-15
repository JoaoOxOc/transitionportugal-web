import { useRef, useState } from 'react';
// import { useAuth } from '../../../../hooks/useAuth';
import { useRouter } from 'next/router';

import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  styled
} from '@mui/material';
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import Link from '../../../../components/Link';
import { i18nextSidemenu } from "@transitionpt/translations";
import { useSession, signOut } from "next-auth/react";

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(0)};
        color: ${theme.colors.alpha.trueWhite[70]};

        &:hover {
          color: ${theme.colors.alpha.trueWhite[100]};
        }
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);

function HeaderUserbox() {
  const { t } = i18nextSidemenu;

  const router = useRouter();
  const { data: session, status } = useSession();
  // const auth = useAuth();

  // const { logout } = useAuth();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      // await logout();
      // router.push('/auth/login/cover');
      signOut({ callbackUrl: '/auth/login/cover?backTo=' + router.asPath });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component="span"
      sx={{
        display: { xs: 'none', sm: 'inline-block' }
      }}
    >
      {(session && session.user && !session.error) &&
      <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar alt={session.user.name} src={session.user.avatar} />
        <ExpandMoreTwoToneIcon
          fontSize="small"
          sx={{
            ml: 0.5
          }}
        />
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210
          }}
          display="flex"
        >
          <Avatar variant="rounded" alt={session.user.name} src={session.user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{session.user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {session.user.jobTitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0
          }}
        />
        <List
          sx={{
            p: 1
          }}
          component="nav"
        >
          <Link href={"/profile/user"} isNextLink={true}>
            <ListItem
              button
              onClick={() => {
                handleClose();
              }}
            >
                <AccountBoxTwoToneIcon fontSize="small" />
                <ListItemText primary={t('SIDEMENU_USER.profile')} />
            </ListItem>
          </Link>
          {/* <ListItem
            button
            onClick={() => {
              handleClose();
            }}
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary={t('SIDEMENU_USER.inbox')} />
          </ListItem> */}
          <ListItem
            button
            onClick={() => {
              handleClose();
            }}
          >
            <AccountTreeTwoToneIcon fontSize="small" />
            <ListItemText primary={t('SIDEMENU_USER.posts')} />
          </ListItem>
        </List>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1
              }}
            />
            {t('SIDEMENU_USER.logout')}
          </Button>
        </Box>
      </Popover>
      </>
      }
    </Box>
  );
}

export default HeaderUserbox;
