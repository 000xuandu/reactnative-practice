import * as authActionTypes from "./authActionTypes";

export const signIn = (username: string, password: string) => ({
  type: authActionTypes.SIGN_IN,
  payload: { username, password },
});

export const signOut = () => ({
  type: authActionTypes.SIGN_OUT,
});
