import { useRef, useState } from 'react';
// import { useAuth } from '../../../../hooks/useAuth';
import { useRouter } from 'next/router';

import {
  Avatar,
  Box,
  Button,
  Divider,
  alpha,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
  styled
} from '@mui/material';
import { i18nextSidemenu } from "@transitionpt/translations";
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import UnfoldMoreTwoToneIcon from '@mui/icons-material/UnfoldMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import Link from '../../../../components/Link';
import { useSession, signOut } from "next-auth/react";

const UserBoxButton = styled(Button)(
  ({ theme }) => `
    padding: ${theme.spacing(1)};
    background-color: ${alpha(theme.colors.alpha.black[100], 0.08)};

    .MuiButton-label {
      justify-content: flex-start;
    }

    &:hover {
      background-color: ${alpha(theme.colors.alpha.black[100], 0.12)};
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
    color: ${theme.sidebar.menuItemColor};
    display: block;

    &.popoverTypo {
      color: ${theme.palette.secondary.main};
    }
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
    color: ${alpha(theme.sidebar.menuItemColor, 0.6)};

    &.popoverTypo {
      color: ${theme.palette.secondary.light};
    }
`
);

function SidebarTopSection() {
  const { t } = i18nextSidemenu;

  // const auth = useAuth();
  const { data: session, status } = useSession();
  // const { logout } = useAuth();
  const router = useRouter();

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
    <>
      {(session && session.user && !session.token.error) &&
        <>
      <UserBoxButton fullWidth color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar variant="rounded" alt={session.user.name} src={session.user.avatar} />
        <Box
          display="flex"
          flex={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <UserBoxText>
            <UserBoxLabel variant="body1">{session.user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {session.user.jobTitle}
            </UserBoxDescription>
          </UserBoxText>
          <UnfoldMoreTwoToneIcon
            fontSize="small"
            sx={{
              ml: 1
            }}
          />
        </Box>
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
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
            <UserBoxLabel className="popoverTypo" variant="body1">
              {session.user.name}
            </UserBoxLabel>
            <UserBoxDescription className="popoverTypo" variant="body2">
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
              onClick={() => {
                handleClose();
              }}
              button
            >
              <AccountBoxTwoToneIcon fontSize="small" />
              <ListItemText primary={t('SIDEMENU_USER.profile')} />
            </ListItem>
          </Link>
          {/* <ListItem
            onClick={() => {
              handleClose();
            }}
            button
          >
            <InboxTwoToneIcon fontSize="small" />
            <ListItemText primary={t('SIDEMENU_USER.inbox')} />
          </ListItem> */}
          <ListItem
            onClick={() => {
              handleClose();
            }}
            button
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
    </>
  );
}

export default SidebarTopSection;
