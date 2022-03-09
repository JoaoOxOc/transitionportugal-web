import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialSearchState = {
    searchText: "",
    page: 1,
    size: 10,
    sort: "Key",
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

export const SettingsSearchContext = createContext({
    searchData: initialSearchState,
    doSearch: true,
    search: () => Promise.resolve()
});

export const SettingsSearchProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialSearchState);

    const search = (searchDataJson) => {
        dispatch({
          type: 'SEARCH',
          payload: {
            searchDataJson
          }
        });
    };

    return (
        <SettingsSearchContext.Provider
          value={{
            ...state,
            doSearch: true,
            search
          }}
        >
          {children}
        </SettingsSearchContext.Provider>
    );
}

SettingsSearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const SettingsSearchConsumer = SettingsSearchProvider.Consumer;