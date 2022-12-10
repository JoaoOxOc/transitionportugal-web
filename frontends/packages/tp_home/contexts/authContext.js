import { createContext, useEffect, useReducer, useCallback } from 'react';

import PropTypes from 'prop-types';

// READ: https://fatmali.medium.com/use-context-and-custom-hooks-to-share-user-state-across-your-react-app-ad7476baaf32
// READ: https://www.bezkoder.com/handle-jwt-token-expiration-react/
// READ: https://javascript.plainenglish.io/handle-refresh-token-with-axios-1e0f45e9afa
const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  isReauthenticated: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user, isReauthenticated } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      isReauthenticated: isReauthenticated,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
        try {
            const result = await fetch(process.env.NEXT_PUBLIC_HOME_BASE_URL + "/admin/api/auth/session", {
                method: 'GET',
                headers: { 
                    "Content-Type": "application/json",
                    "credentials": 'include'
                }
            });
            if (!result.ok) {
                const resultErrorBody = await result.text();
                console.log("fetchSessionError ",resultErrorBody);
                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: {}
                    }
                });
            }
            else {
                const bodyResponse = await result.json();
                if (bodyResponse && bodyResponse.user) {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: true,
                            user: bodyResponse.user
                        }
                        });
                }
                else {
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: {}
                        }
                    });
                }
            }
        }
        catch (e) {
            console.log("fetchSessionError ",e);
            dispatch({
                type: 'INITIALIZE',
                payload: {
                    isAuthenticated: false,
                    user: {}
                }
            });
        }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
    // dispatch({
    //     type: 'LOGIN',
    //     payload: {
    //       user,
    //       isReauthenticated: true
    //     }
    // });
  };

  const logout = async () => {
    
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const AuthConsumer = AuthContext.Consumer;
