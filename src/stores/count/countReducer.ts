import * as countActionTypes from "../count/countActionTypes";

export interface Action {
  readonly type: string;
  readonly payload?: any;
}

export interface Todo {
  id: number;
  name: string;
  isDone: boolean;
}

interface CountState {
  number: number;
  list: Todo[];
}

const initialState: CountState = {
  number: 0,
  list: [
    { id: 1, name: "todo 1", isDone: false },
    { id: 2, name: "todo 2", isDone: false },
    { id: 3, name: "todo 3", isDone: false },
    { id: 4, name: "todo 4", isDone: false },
    { id: 5, name: "todo 5", isDone: false },
  ],
};

const countReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case countActionTypes.TOGGLE_DONE_BY_ID:
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                isDone: !item.isDone,
              }
            : item
        ),
      };
    case countActionTypes.ADD_TODO_ITEM:
      return {
        ...state,
        list: state.list.concat(action.payload.item),
      };
    default:
      return {
        ...state,
      };
  }
};

export default countReducer;
