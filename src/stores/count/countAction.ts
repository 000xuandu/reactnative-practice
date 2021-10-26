import * as countActionTypes from './countActionTypes';

export const todoAdded = (number: number) => {
  console.log('number: ', number);
  return {
    type: countActionTypes.COUNT_BY_NUMBER,
    payload: {number},
  };
};
