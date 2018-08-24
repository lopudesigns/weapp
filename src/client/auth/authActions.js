import Cookie from 'js-cookie';
import { createAction } from 'redux-actions';
import { getAuthenticatedUserName, getIsAuthenticated } from '../reducers';
import { createAsyncActionType } from '../helpers/stateHelpers';
import { addNewNotification } from '../app/appActions';
import { getFollowing } from '../user/userActions';
import { API_TYPES } from '../../common/constants/notifications';

export const LOGIN = '@auth/LOGIN';
export const LOGIN_START = '@auth/LOGIN_START';
export const LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = '@auth/LOGIN_ERROR';

export const RELOAD = '@auth/RELOAD';
export const RELOAD_START = '@auth/RELOAD_START';
export const RELOAD_SUCCESS = '@auth/RELOAD_SUCCESS';
export const RELOAD_ERROR = '@auth/RELOAD_ERROR';

export const LOGOUT = '@auth/LOGOUT';

export const UPDATE_USER_METADATA = createAsyncActionType('@auth/UPDATE_USER_METADATA');
export const LOGIN = createAsyncActionType('@auth/LOGIN');

const loginError = createAction(LOGIN_ERROR);

export const login = () => (dispatch, getState, { authAPI }) => {
  let promise = Promise.resolve(null);

  if (getIsAuthenticated(getState())) {
    promise = Promise.resolve(null);
  } else if (!authAPI.options.accessToken) {
    promise = Promise.reject(new Error('There is not accessToken present'));
  } else {
    promise = authAPI.me().catch(() => dispatch(loginError()));
  }

  return dispatch({
    type: LOGIN,
    payload: {
      promise,
    },
    meta: {
      refresh: getIsAuthenticated(getState()),
    },
  }).catch(() => dispatch(loginError()));
};

export const getCurrentUserFollowing = () => dispatch => dispatch(getFollowing());

export const reload = () => (dispatch, getState, { authAPI }) =>
  dispatch({
    type: RELOAD,
    payload: {
      promise: authAPI.me(),
    },
  });

export const logout = () => (dispatch, getState, { authAPI }) => {
  authAPI.revokeToken();
  Cookie.remove('access_token');

  dispatch({
    type: LOGOUT,
  });
};

export const getUpdatedSCUserMetadata = () => (dispatch, getState, { authAPI }) =>
  dispatch({
    type: UPDATE_USER_METADATA.ACTION,
    payload: {
      promise: authAPI.me(),
    },
  });

export const login = () => (dispatch, getState, { authAPI }) => {
  const accessToken = Cookie.get('access_token');
  const state = getState();

  if (!getIsAuthenticated(state)) {
    return dispatch({ type: LOGIN.ERROR });
  }

  authAPI.subscribe((response, message) => {
    const type = message && message.type;

    if (type === API_TYPES.notification && message.notification) {
      dispatch(addNewNotification(message.notification));
    }
  });

  const targetUsername = getAuthenticatedUserName(state);

  return dispatch({
    type: LOGIN.ACTION,
    meta: targetUsername,
    payload: {
      promise: authAPI.sendAsync('login', [accessToken]),
    },
  });
};
