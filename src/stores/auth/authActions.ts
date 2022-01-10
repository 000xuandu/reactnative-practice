import * as authActionTypes from './authActionTypes';

export const signIn = (username: string, password: string) => {
  return {
    type: authActionTypes.SIGN_IN,
    payload: {username, password},
  };
};

export const signOut = () => {
  return {
    type: authActionTypes.SIGN_OUT,
  };
};
