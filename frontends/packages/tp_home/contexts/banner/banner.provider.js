import { useCreateContext } from '../create-context';
import { useState, useEffect, useReducer } from 'react';
import { BannerFetchReducer, initialState } from './banner.reducer';

// const actionTypes = {
//     setBanner: 'SET_BANNER'
// }

export const BannerDataAction = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);
 
    const [state, dispatch] = useReducer(BannerFetchReducer, {
        isLoading: false,
        isError: false,
        bannerData: initialState,
    });
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //     dispatch({ type: 'FETCH_INIT' });
    
    //     try {
    //         const result = {};
    
    //         dispatch({ type: 'FETCH_SUCCESS', payload: {} });
    //     } catch (error) {
    //         dispatch({ type: 'FETCH_FAILURE' });
    //     }
    //     };
    
    //     fetchData();
    // }, [url]);
   
    return [state, setUrl];
};