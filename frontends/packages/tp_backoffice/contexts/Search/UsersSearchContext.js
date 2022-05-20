import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialSearchState = {
    searchText: "",
    associationId: "",
    userRole: "",
    isActive: "",
    isVerified: "",
    offset: 1,
    limit: 10,
    sort: "UserName",
    sortDirection: "asc"
};

const handlers = {
    INITIALIZE: (state, action) => {
  
      return {
        ...state,
        searchData: initialSearchState,
        doSearch: false
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

export const UsersSearchContext = createContext({
    searchData: initialSearchState,
    doSearch: false
});

export const UsersSearchProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, {searchData: initialSearchState, doSearch: true});

    const search = (searchDataJson) => {
        dispatch({
          type: 'SEARCH',
          payload: searchDataJson
        });
    };

    const cleanup = () => {
      dispatch({
        type: 'INITIALIZE',
        payload: initialSearchState
      });
    }

    return (
        <UsersSearchContext.Provider
          value={{
            ...state,
            search,
            cleanup
          }}
        >
          {children}
        </UsersSearchContext.Provider>
    );
}

UsersSearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const UsersSearchConsumer = UsersSearchProvider.Consumer;