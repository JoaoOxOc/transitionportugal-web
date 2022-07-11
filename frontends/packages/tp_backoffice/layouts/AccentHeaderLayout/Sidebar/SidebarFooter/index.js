import {
  Box,
  IconButton,
  Badge,
  Tooltip,
  alpha,
  tooltipClasses,
  styled,
  useTheme
} from '@mui/material';
import { i18nextSidemenu } from "@transitionpt/translations";
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import PowerSettingsNewTwoToneIcon from '@mui/icons-material/PowerSettingsNewTwoTone';
import SmsTwoToneIcon from '@mui/icons-material/SmsTwoTone';
import Link from '../../../../components/Link';
// import { useAuth } from '../../../../hooks/useAuth';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.black[100],
    color: theme.palette.getContrastText(theme.colors.alpha.black[100]),
    boxShadow: theme.shadows[24],
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(12)
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.black[100]
  }
}));

function SidebarFooter() {
  const { t } = i18nextSidemenu;
  const theme = useTheme();
  // const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await logout();
      // router.push('/auth/login/cover');
      // TODO: clear strapi cookies
      signOut({ callbackUrl: '/admin/auth/login/cover?backTo=' + router.asPath });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: 60
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LightTooltip placement="top" arrow title={t('SIDEMENU_USER.eventsCalendar')}>
        <IconButton
          sx={{
            background: `${theme.colors.alpha.black[10]}`,
            color: `${theme.colors.alpha.black[70]}`,
            transition: `${theme.transitions.create(['all'])}`,

            '&:hover': {
              background: `${alpha(theme.colors.alpha.black[100], 0.2)}`,
              color: `${theme.colors.alpha.black[100]}`
            }
          }}
          href="/content/events"
          component={Link}
        >
          <EventTwoToneIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
      {/* <LightTooltip placement="top" arrow title={t('Messenger')}>
        <Badge
          color="success"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          sx={{
            '.MuiBadge-badge': {
              animation: 'pulse 1s infinite',
              top: '5%',
              transition: `${theme.transitions.create(['all'])}`
            }
          }}
          variant="dot"
          overlap="circular"
        >
          <IconButton
            href="/applications/messenger"
            component={Link}
            sx={{
              background: `${theme.colors.alpha.black[10]}`,
              color: `${theme.colors.alpha.black[70]}`,
              transition: `${theme.transitions.create(['all'])}`,

              '&:hover': {
                background: `${alpha(theme.colors.alpha.black[100], 0.2)}`,
                color: `${theme.colors.alpha.black[100]}`
              },
              mx: 1
            }}
          >
            <SmsTwoToneIcon fontSize="small" />
          </IconButton>
        </Badge>
      </LightTooltip> */}
      <LightTooltip placement="top" arrow title={t('SIDEMENU_USER.logout')}>
        <IconButton
          sx={{
            background: `${theme.colors.alpha.black[10]}`,
            color: `${theme.colors.alpha.black[70]}`,
            transition: `${theme.transitions.create(['all'])}`,

            '&:hover': {
              background: `${alpha(theme.colors.alpha.black[100], 0.2)}`,
              color: `${theme.colors.alpha.black[100]}`
            }
          }}
          onClick={handleLogout}
        >
          <PowerSettingsNewTwoToneIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
    </Box>
  );
}

export default SidebarFooter;
