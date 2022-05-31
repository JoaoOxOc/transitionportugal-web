import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import AnalyticsTwoToneIcon from '@mui/icons-material/AnalyticsTwoTone';
import AssignmentIndTwoToneIcon from '@mui/icons-material/AssignmentIndTwoTone';
import ApartmentTwoToneIcon from '@mui/icons-material/ApartmentTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import CameraOutdoorTwoToneIcon from '@mui/icons-material/CameraOutdoorTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import AllInboxTwoToneIcon from '@mui/icons-material/AllInboxTwoTone';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import AppSettingsAltTwoToneIcon from '@mui/icons-material/AppSettingsAltTwoTone';
import FestivalTwoToneIcon from '@mui/icons-material/FestivalTwoTone';
import NewspaperTwoToneIcon from '@mui/icons-material/NewspaperTwoTone';
import ContactPhoneTwoToneIcon from '@mui/icons-material/ContactPhoneTwoTone';
import BlurCircularTwoToneIcon from '@mui/icons-material/BlurCircularTwoTone';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import AccountBalanceTwoToneIcon from '@mui/icons-material/AccountBalanceTwoTone';

import { i18nextSidemenu } from "@transitionpt/translations";

const menuItems = [
  {
    heading: i18nextSidemenu.t('SIDEMENU_HEADERS.general'),
    collapsable: false,
    roles: ["Admin", "User", "AssociationAdmin", "AssociationUser"],
    scopes: ["any"],
    items: [
      {
        name: i18nextSidemenu.t('SIDEMENU_GENERAL.dashboard'),
        icon: AnalyticsTwoToneIcon,
        link: '/',
        roles: ["Admin", "User"],
        scopes: ["any"]
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_PROFILE.association'),
        icon: AccountBalanceTwoToneIcon,
        link: '/profile/association',
        roles: ["AssociationAdmin", "AssociationUser"],
        scopes: ["association.read", "association.admin"]
      }
    ]
  },
  {
    heading: i18nextSidemenu.t('SIDEMENU_HEADERS.content'),
    collapsable: false,
    roles: ["Admin", "User"],
    scopes: ["any"],
    items: [
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.banner'),
        icon: StorefrontTwoToneIcon,
        link: '/content/banner',
        roles: ["Admin", "User"],
        scopes: ["cms.write"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.about'),
        icon: BackupTableTwoToneIcon,
        link: '/content/about',
        roles: ["Admin", "User"],
        scopes: ["cms.write"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.contacts'),
        icon: ContactPhoneTwoToneIcon,
        link: '/content/contacts',
        roles: ["Admin", "User"],
        scopes: ["cms.write"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.circularEconomy'),
        icon: BlurCircularTwoToneIcon,
        link: '/content/circularEconomy',
        roles: ["Admin", "User"],
        scopes: ["cms.write"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.events'),
        icon: FestivalTwoToneIcon,
        link: '/content/events',
        roles: ["Admin", "User"],
        scopes: ["cms.write"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.newsBlog'),
        icon: NewspaperTwoToneIcon,
        link: '/content/news',
        roles: ["Admin", "User"],
        scopes: ["cms.write"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_CONTENT.donations'),
        icon: VolunteerActivismTwoToneIcon,
        link: '/content/donations',
        roles: ["Admin", "User"],
        scopes: ["cms.write"],
      }
    ]
  },
  {
    heading: i18nextSidemenu.t('SIDEMENU_HEADERS.management'),
    collapsable: true,
    roles: ["Admin", "User"],
    scopes: ["any"],
    items: [
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.users'),
        link: '/management/users',
        icon: AssignmentIndTwoToneIcon,
        roles: ["Admin", "User"],
        scopes: ["users.write"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.associations'),
        link: '/management/associations',
        icon: ApartmentTwoToneIcon,
        roles: ["Admin", "User"],
        scopes: ["users.write"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.profiles'),
        icon: DesignServicesTwoToneIcon,
        link: '/management/profiles',
        roles: ["Admin"],
        scopes: ["roles.admin"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.scopes'),
        icon: CameraOutdoorTwoToneIcon,
        link: '/management/scopes',
        roles: ["Admin"],
        scopes: ["scopes.admin"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.newsletter'),
        icon: SmartToyTwoToneIcon,
        link: '/management/newsletters',
        roles: ["Admin", "User"],
        scopes: ["newsletter.admin"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_MANAGEMENT.privacy'),
        icon: VpnKeyTwoToneIcon,
        link: '/management/privacy',
        roles: ["Admin", "User"],
        scopes: ["terms.admin"],
      }
    ]
  },
  {
    heading: i18nextSidemenu.t('SIDEMENU_HEADERS.Settings'),
    collapsable: true,
    roles: ["Admin", "User"],
    scopes: ["any"],
    items: [
      {
        name: i18nextSidemenu.t('SIDEMENU_SETTINGS.email'),
        icon: ForwardToInboxTwoToneIcon,
        link: '/management/settings/email',
        roles: ["Admin"],
        scopes: ["settings.admin"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_SETTINGS.emailTemplates'),
        icon: AllInboxTwoToneIcon,
        link: '/management/settings/emailTemplate',
        roles: ["Admin", "User"],
        scopes: ["email.admin"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_SETTINGS.userAuth'),
        icon: AdminPanelSettingsTwoToneIcon,
        link: '/management/settings/auth',
        roles: ["Admin"],
        scopes: ["settings.admin"],
      },
      {
        name: i18nextSidemenu.t('SIDEMENU_SETTINGS.clientApps'),
        icon: AppSettingsAltTwoToneIcon,
        link: '/management/app/clients',
        roles: ["Admin"],
        scopes: ["client.admin"],
      }
    ]
  },
];
export default menuItems;
