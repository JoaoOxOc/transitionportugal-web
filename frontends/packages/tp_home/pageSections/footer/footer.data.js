import {BiSitemap} from 'react-icons/bi';
import {MdOutlinePrivacyTip, MdContactSupport} from 'react-icons/md';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
      header: 'Policy',
      items: [
        {
          type: 'page',
          display: 'all',
          path: 'privacy',
          label: 'Header.PRIVACY_MENU.policy',
          ariaLabel: 'Header.PRIVACY_ARIA.policy',
          icon: <MdOutlinePrivacyTip/>
        },
        {
          type: 'page',
          display: 'all',
          path: 'sitemap',
          label: 'Header.PRIVACY_MENU.sitemap',
          ariaLabel: 'Header.PRIVACY_ARIA.sitemap',
          icon: <BiSitemap/>
        },
        {
          type: 'component',
          display: 'submenu',
          path: 'contactUs',
          label: 'Header.PRIVACY_MENU.contactUs',
          ariaLabel: 'Header.PRIVACY_MENU.contactUs',
          icon: <MdContactSupport/>
        }
      ],
    },
  ];
  