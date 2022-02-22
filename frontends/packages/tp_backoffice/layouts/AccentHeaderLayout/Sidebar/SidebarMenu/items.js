import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';

import { i18nextSidemenu } from "@transitionpt/translations";
console.log(i18nextSidemenu)
const menuItems = [
  {
    heading: i18nextSidemenu.t('SIDEMENU_HEADERS.general'),
    items: [
      {
        name: i18nextSidemenu.t('SIDEMENU_GENERAL.dashboard'),
        icon: AnalyticsTwoToneIcon,
        link: '/',
      }
    ]
  },
  {
    heading: i18nextSidemenu.t('SIDEMENU_HEADERS.content'),
    items: [
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.banner'),
        icon: StorefrontTwoToneIcon,
        link: '/content/banner',
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.about'),
        icon: BackupTableTwoToneIcon,
        link: '/content/about',
      }
    ]
  },
  {
    heading: i18nextSidemenu.t('SIDEMENU_HEADERS.management'),
    items: [
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.users'),
        link: '/management/users',
        icon: AssignmentIndTwoToneIcon
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.profiles'),
        icon: DesignServicesTwoToneIcon,
        link: '/management/profiles'
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.newsletter'),
        icon: SmartToyTwoToneIcon,
        link: '/management/newsletter'
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.privacy'),
        icon: VpnKeyTwoToneIcon,
        link: '/management/privacy'
      }
    ]
  }
];
export default menuItems;
