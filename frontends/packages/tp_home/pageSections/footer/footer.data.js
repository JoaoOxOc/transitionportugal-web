import {BiSitemap} from 'react-icons/bi';
import {MdOutlinePrivacyTip} from 'react-icons/md';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
      header: 'Policy',
      items: [
        {
          path: '#',
          label: 'Header.PRIVACY_MENU.policy',
          icon: <MdOutlinePrivacyTip/>
        },
        {
          path: '#',
          label: 'Header.PRIVACY_MENU.sitemap',
          icon: <BiSitemap/>
        },
      ],
    },
  ];
  