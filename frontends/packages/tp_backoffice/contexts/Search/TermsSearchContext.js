import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialSearchState = {
    searchText: "",
    isActive: "",
    version: "",
    offset: 1,
    limit: 10,
    sort: "Version",
    sortDirection: "desc"
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

export const TermsSearchContext = createContext({
    searchData: initialSearchState,
    doSearch: true
});

export const TermsSearchProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, {searchData: initialSearchState, doSearch: true});

    const search = (searchDataJson) => {
        dispatch({
          type: 'SEARCH',
          payload: searchDataJson
        });
    };

    return (
        <TermsSearchContext.Provider
          value={{
            ...state,
            search
          }}
        >
          {children}
        </TermsSearchContext.Provider>
    );
}

TermsSearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const TermsSearchConsumer = TermsSearchProvider.Consumer;