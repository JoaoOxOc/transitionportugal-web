import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialActionsState = {
    areEmailsSent: false,
    areBannersActivated: false,
    selectedBanners: []
  };

const handlers = {
    RESEND: (state, action) => {
        const { selectedBanners, result } = action.payload;
        return {
          ...state,
          areBannersDeactivated: true,
          areBannersActivated: false,
          selectedBanners,
          result
        };
      },
    APPROVE: (state, action) => {
        const { selectedBanners, result } = action.payload;
        return {
            ...state,
            areBannersDeactivated: false,
            areBannersActivated: true,
            selectedBanners,
            result
        };
      }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const BannersActionsContext = createContext({
    ...initialActionsState
});

export const BannersActionsProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialActionsState);

    return (
        <BannersActionsContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
            {children}
        </BannersActionsContext.Provider>
    );
}

BannersActionsProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const BannersActionsConsumer = BannersActionsProvider.Consumer;