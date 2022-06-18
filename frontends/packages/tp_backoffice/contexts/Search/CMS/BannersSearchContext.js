import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialSearchState = {
    searchText: "",
    langCode: "",
    pageKey: "",
    componentKey: "",
    orderPosition: "",
    isActive: "",
    offset: 1,
    limit: 10,
    sort: "PageKey",
    sortDirection: "asc"
};

const handlers = {
    INITIALIZE: (state, action) => {
  
      return {
        ...state,
        searchData: initialSearchState,
        doSearch: true
      };
    },
    SEARCH: (state, action) => {
      return {
        ...state,
        searchData: action.payload,
        doSearch: true
      };
    }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const BannersSearchContext = createContext({
    searchData: initialSearchState,
    doSearch: true
});

export const BannersSearchProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, {searchData: initialSearchState, doSearch: true});

    const search = (searchDataJson) => {
        dispatch({
          type: 'SEARCH',
          payload: searchDataJson
        });
    };

    return (
        <BannersSearchContext.Provider
          value={{
            ...state,
            search
          }}
        >
          {children}
        </BannersSearchContext.Provider>
    );
}

BannersSearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const BannersSearchConsumer = BannersSearchProvider.Consumer;