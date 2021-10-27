import * as countActionTypes from './countActionTypes';

export const toggleDoneById = (id: number) => {
  return {
    type: countActionTypes.TOGGLE_DONE_BY_ID,
    payload: {id},
  };
};

export const addNewTodoItem = (newItem: any) => {
  return {
    type: countActionTypes.ADD_TODO_ITEM,
    payload: {item: newItem},
  };
};
