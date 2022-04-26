import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialActionsState = {
    areEmailsSent: false,
    areUsersApproved: false,
    selectedUsers: []
  };

const handlers = {
    RESEND: (state, action) => {
        const { selectedUsers, result } = action.payload;
        return {
          ...state,
          areEmailsSent: true,
          areUsersApproved: false,
          selectedUsers,
          result
        };
      },
    APPROVE: (state, action) => {
        const { selectedUsers, result } = action.payload;
        return {
            ...state,
            areEmailsSent: false,
            areUsersApproved: true,
            selectedUsers,
            result
        };
      }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const UsersActionsContext = createContext({
    ...initialActionsState
});

export const UsersActionsProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialActionsState);

    return (
        <UsersActionsContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
            {children}
        </UsersActionsContext.Provider>
    );
}

UsersActionsProvider.propTypes = {
    children: PropTypes.node.isRequired
};
  
export const UsersActionsConsumer = UsersActionsProvider.Consumer;