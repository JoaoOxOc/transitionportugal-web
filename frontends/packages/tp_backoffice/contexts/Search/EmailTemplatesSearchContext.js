import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialSearchState = {
    searchText: "",
    language: "",
    offset: 1,
    limit: 10,
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

export const EmailTemplatesSearchContext = createContext({
    searchData: initialSearchState,
    doSearch: true
});

export const EmailTemplatesSearchProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, {searchData: initialSearchState, doSearch: true});

    const search = (searchDataJson) => {
        dispatch({
          type: 'SEARCH',
          payload: searchDataJson
        });
    };

    return (
        <EmailTemplatesSearchContext.Provider
          value={{
            ...state,
            search
          }}
        >
          {children}
        </EmailTemplatesSearchContext.Provider>
    );
}

EmailTemplatesSearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const EmailTemplatesSearchConsumer = EmailTemplatesSearchProvider.Consumer;