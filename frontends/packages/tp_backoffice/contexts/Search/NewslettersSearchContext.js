import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialSearchState = {
    searchText: "",
    mailingListId: "",
    offset: 1,
    limit: 10,
    sort: "EmailAddress",
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

export const NewslettersSearchContext = createContext({
    searchData: initialSearchState,
    doSearch: true
});

export const NewslettersSearchProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, {searchData: initialSearchState, doSearch: true});

    const search = (searchDataJson) => {
        dispatch({
          type: 'SEARCH',
          payload: searchDataJson
        });
    };

    return (
        <NewslettersSearchContext.Provider
          value={{
            ...state,
            search
          }}
        >
          {children}
        </NewslettersSearchContext.Provider>
    );
}

NewslettersSearchProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const NewslettersSearchConsumer = NewslettersSearchProvider.Consumer;