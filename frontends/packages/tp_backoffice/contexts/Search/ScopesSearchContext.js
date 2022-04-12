import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialSearchState = {
    searchText: "",
    page: 1,
    size: 10,
    sort: "ScopeName",
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

export const ScopesSearchContext = createContext({
    searchData: initialSearchState,
    doSearch: true
});

export const ScopesSearchProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, {searchData: initialSearchState, doSearch: true});

    const search = (searchDataJson) => {
        dispatch({
          type: 'SEARCH',
          payload: searchDataJson
        });
    };

    return (
        <ScopesSearchContext.Provider
          value={{
            ...state,
            search
          }}
        >
          {children}
        </ScopesSearchContext.Provider>
    );
}

ScopesSearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const ScopesSearchConsumer = ScopesSearchProvider.Consumer;