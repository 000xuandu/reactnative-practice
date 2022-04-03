import { ActionReducer } from "~models/common";
import * as authActionTypes from "../auth/authActionTypes";

interface AuthState {
  isLogin: boolean;
}

const initialState: AuthState = {
  isLogin: false,
};

const authReducer = (state = initialState, action: ActionReducer) => {
  switch (action.type) {
    case authActionTypes.SIGN_IN:
      return {
        ...state,
        isLogin: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
