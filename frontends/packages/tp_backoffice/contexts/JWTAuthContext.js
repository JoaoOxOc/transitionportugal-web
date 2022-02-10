import { createContext, useEffect, useReducer } from 'react';

import { authApi } from '../mocks/auth';
import PropTypes from 'prop-types';

import {genericFetch} from '../services/genericFetch';

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
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
  ...initialAuthState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
});

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          const userProfile = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/profile", "GET", accessToken,{});
          if (userProfile.result) {
            const user = userProfile.result;
            //const user = await me(accessToken);

            dispatch({
              type: 'INITIALIZE',
              payload: {
                isAuthenticated: true,
                user
              }
            });
          }
          else {
            const refreshToken = window.localStorage.getItem('refreshToken');
            if (refreshToken) {
              const refreshedTokenData = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/refresh", "POST", null,
              {
                accessToken: accessToken,
                refreshToken: refreshToken,
              });
              if (refreshedTokenData.accessToken) {
                userProfile = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/profile", "GET", refreshedTokenData.accessToken,{});
                if (userProfile.result) {
                  //const user = await authApi.me(response.token);
                  const user = userProfile.result;
            
                  localStorage.setItem('accessToken', refreshedTokenData.accessToken);
                  localStorage.setItem('refreshToken', refreshedTokenData.refreshToken);
        
                  dispatch({
                    type: 'INITIALIZE',
                    payload: {
                      isAuthenticated: true,
                      user
                    }
                  });
                }
                else {
                  throw userProfile.statusText;
                }
              }
            }
            else {
              dispatch({
                type: 'INITIALIZE',
                payload: {
                  isAuthenticated: false,
                  user: null
                }
              });
            }
          }
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email, password) => {
      //const accessToken = await login({ email, password });
      //console.log(accessToken);
      const response = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/login", "POST", null,{
            username: email,
            password: password
          }
      );
      if (response.token) {
        const userProfile = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/profile", "GET", response.token,{});
        if (userProfile.result) {
          //const user = await authApi.me(response.token);
          const user = userProfile.result;
    
          localStorage.setItem('accessToken', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);

          dispatch({
            type: 'LOGIN',
            payload: {
              user,
              isReauthenticated: true
            }
          });
        }
        else {
          throw userProfile.statusText;
        }
      }
      else {
        throw response.statusText;
      }
  };

  const logout = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const userLogout = await genericFetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/user/logout", "GET", accessToken,{});
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email, name, password) => {
    const accessToken = await authApi.register({ email, name, password });
    const user = await authApi.me(accessToken);

    localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register
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
