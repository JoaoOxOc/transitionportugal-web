// icons
import {GiThreeLeaves} from 'react-icons/gi';
import {RiRoadMapLine} from 'react-icons/ri';
import {IoCalendarOutline} from 'react-icons/io5';
import {GiNewspaper} from 'react-icons/gi';
import {AiOutlineTeam} from 'react-icons/ai';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    type: 'component',
    display: 'all',
    path: 'about',
    label: 'Header.MENU.about',
    icon: <GiThreeLeaves/>
  },
  {
    type: 'page',
    display: 'all',
    path: 'map',
    label: 'Header.MENU.map',
    icon: <RiRoadMapLine/>
  },
  {
    type: 'component',
    display: 'all',
    path: 'events',
    label: 'Header.MENU.events',
    icon: <IoCalendarOutline/>
  },
  {
    type: 'page',
    display: 'all',
    path: 'news',
    label: 'Header.MENU.news',
    icon: <GiNewspaper/>
  },
  {
    type: 'component',
    display: 'bottom',
    path: 'actions',
    label: 'Header.MENU.staff',
    icon: <AiOutlineTeam/>
  },
];
