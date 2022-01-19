// icons
import {GiThreeLeaves} from 'react-icons/gi';
import {RiRoadMapLine} from 'react-icons/ri';
import {IoCalendarOutline} from 'react-icons/io5';
import {GiNewspaper} from 'react-icons/gi';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    type: 'component',
    path: 'about',
    label: 'Header.MENU.about',
    icon: <GiThreeLeaves/>
  },
  {
    type: 'component',
    path: 'map',
    label: 'Header.MENU.map',
    icon: <RiRoadMapLine/>
  },
  {
    type: 'page',
    path: 'events',
    label: 'Header.MENU.events',
    icon: <IoCalendarOutline/>
  },
  {
    type: 'page',
    path: 'news',
    label: 'Header.MENU.news',
    icon: <GiNewspaper/>
  },
];
