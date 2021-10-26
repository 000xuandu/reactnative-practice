import * as countActionTypes from '../count/countActionTypes';

export interface Action {
  readonly type: string;
  readonly payload?: any;
}

const initialState = {
  number: 0,
};

const countReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case countActionTypes.COUNT_BY_NUMBER:
      return {
        ...state,
        number: (state.number += action.payload.number),
      };
    default:
      return {
        ...state,
      };
  }
};

export default countReducer;
