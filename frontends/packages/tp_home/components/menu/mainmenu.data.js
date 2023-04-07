// icons
import {GiThreeLeaves} from 'react-icons/gi';
import {RiRoadMapLine} from 'react-icons/ri';
import {IoCalendarOutline} from 'react-icons/io5';
import {GiNewspaper} from 'react-icons/gi';
import {AiOutlineTeam} from 'react-icons/ai';
import {FcBusinessContact} from 'react-icons/fc';
import {FcVoicePresentation} from 'react-icons/fc';
import {FcTimeline} from 'react-icons/fc';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    type: 'rootmenu',
    display: 'header',
    path: 'transitionmovement',
    label: 'Header.MENU.transitionMovement',
    ariaLabel: 'Header.ARIA.transitionMovement',
    icon: <GiThreeLeaves/>,
    submenu: [
      {
        type: 'component',
        display: 'all',
        path: 'about',
        label: 'Header.MENU.presentation',
        ariaLabel: 'Header.ARIA.presentation',
        icon: <FcBusinessContact/>
      },
      {
        type: 'page',
        display: 'all',
        path: '/aboutus',
        label: 'Header.MENU.about',
        ariaLabel: 'Header.ARIA.about',
        icon: <FcVoicePresentation/>
      },
      {
        type: 'page',
        display: 'all',
        path: '/timeline',
        label: 'Header.MENU.history',
        ariaLabel: 'Header.ARIA.history',
        icon: <FcTimeline/>
      }
    ]
  },
  {
    type: 'page',
    display: 'all',
    path: '/map',
    label: 'Header.MENU.map',
    ariaLabel: 'Header.ARIA.map',
    icon: <RiRoadMapLine/>
  },
  {
    type: 'component',
    display: 'all',
    path: 'events',
    label: 'Header.MENU.events',
    ariaLabel: 'Header.ARIA.events',
    icon: <IoCalendarOutline/>
  },
  {
    type: 'page',
    display: 'all',
    path: '/news',
    label: 'Header.MENU.news',
    ariaLabel: 'Header.ARIA.news',
    icon: <GiNewspaper/>
  },
  {
    type: 'page',
    display: 'bottom',
    path: '/aboutus',
    label: 'Header.MENU.about',
    ariaLabel: 'Header.ARIA.about',
    icon: <FcVoicePresentation/>
  },
  // {
  //   type: 'component',
  //   display: 'bottom',
  //   path: 'actions',
  //   label: 'Header.MENU.staff',
  //   ariaLabel: 'Header.ARIA.staff',
  //   icon: <AiOutlineTeam/>
  // },
];
