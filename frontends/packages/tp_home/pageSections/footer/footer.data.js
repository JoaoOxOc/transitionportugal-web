import {BiSitemap} from 'react-icons/bi';
import {MdOutlinePrivacyTip} from 'react-icons/md';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
      header: 'Policy',
      items: [
        {
          path: 'privacy',
          label: 'Header.PRIVACY_MENU.policy',
          ariaLabel: 'Header.PRIVACY_ARIA.policy',
          icon: <MdOutlinePrivacyTip/>
        },
        {
          path: 'sitemap',
          label: 'Header.PRIVACY_MENU.sitemap',
          ariaLabel: 'Header.PRIVACY_ARIA.sitemap',
          icon: <BiSitemap/>
        },
      ],
    },
  ];
  