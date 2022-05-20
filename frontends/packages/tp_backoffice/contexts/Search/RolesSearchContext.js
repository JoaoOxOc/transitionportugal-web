import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialSearchState = {
    searchText: "",
    offset: 1,
    limit: 10,
    sort: "Name",
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

export const RolesSearchContext = createContext({
    searchData: initialSearchState,
    doSearch: true
});

export const RolesSearchProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, {searchData: initialSearchState, doSearch: true});

    const search = (searchDataJson) => {
        dispatch({
          type: 'SEARCH',
          payload: searchDataJson
        });
    };

    return (
        <RolesSearchContext.Provider
          value={{
            ...state,
            search
          }}
        >
          {children}
        </RolesSearchContext.Provider>
    );
}

RolesSearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const RolesSearchConsumer = RolesSearchProvider.Consumer;