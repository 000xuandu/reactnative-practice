import * as countActionTypes from "./countActionTypes";

export const toggleDoneById = (id: number) => ({
  type: countActionTypes.TOGGLE_DONE_BY_ID,
  payload: { id },
});

export const addNewTodoItem = (newItem: any) => ({
  type: countActionTypes.ADD_TODO_ITEM,
  payload: { item: newItem },
});
