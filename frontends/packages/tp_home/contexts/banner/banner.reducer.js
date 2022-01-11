

import BannerBG from '../../assets/bannerBg.png';
import BannerThumb from '../../assets/banner-thumb.png';

import client1 from '../../assets/sponsor/paypal.svg';
import client2 from '../../assets/sponsor/google.svg';
import client3 from '../../assets/sponsor/dropbox.svg';

export const initialState = {
    isLoading: false,
    isError: false,
    bannerData: {
        bannerImage: BannerBG,
        bannerThumb: BannerThumb,
        bannerTitle: 'Cooperativa Integral Terra de Lafões',
        bannerSubtitle: '"Descobrir é um estado permanente naquele que é curioso"',
        bannerSubtitleSignature: 'João P. Almeida',
        bannerSponsors: [
          {
            id: 1,
            path: '#',
            image: client1,
            title: 'paypal',
          },
          {
            id: 2,
            path: '#',
            image: client2,
            title: 'google',
          },
          {
            id: 3,
            path: '#',
            image: client3,
            title: 'dropbox',
          },
        ]
    }
};

export const BannerFetchReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_INIT':
          return {
            ...state,
            isLoading: true,
            isError: false
          };
        case 'FETCH_SUCCESS':
          return {
            ...state,
            isLoading: false,
            isError: false,
            bannerData: action.payload,
          };
        case 'FETCH_FAILURE':
          return {
            ...state,
            isLoading: false,
            isError: true,
          };
        default:
          throw new Error();
      }
};
