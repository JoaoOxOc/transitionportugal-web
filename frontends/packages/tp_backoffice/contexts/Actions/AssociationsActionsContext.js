import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialActionsState = {
    areEmailsSent: false,
    areAssociationsApproved: false,
    selectedAssociations: []
  };

const handlers = {
    RESEND: (state, action) => {
        const { selectedAssociations, result } = action.payload;
        return {
          ...state,
          areEmailsSent: true,
          areAssociationsApproved: false,
          selectedAssociations,
          result
        };
      },
    APPROVE: (state, action) => {
        const { selectedAssociations, result } = action.payload;
        return {
            ...state,
            areEmailsSent: false,
            areAssociationsApproved: true,
            selectedAssociations,
            result
        };
      }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AssociationsActionsContext = createContext({
    ...initialActionsState
});

export const AssociationsActionsProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialActionsState);

    return (
        <AssociationsActionsContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
            {children}
        </AssociationsActionsContext.Provider>
    );
}

AssociationsActionsProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const AssociationsActionsConsumer = AssociationsActionsProvider.Consumer;