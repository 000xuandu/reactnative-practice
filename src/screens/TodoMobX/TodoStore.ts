import { flow, makeAutoObservable } from "mobx";
import { todoAPIs } from "~apis";
import { ParamsAPIs } from "~models/common";
import { Todo } from "~models/user";

class ObservableTodoStore {
  todoList: Array<Todo> = [];

  isLoading = true;

  constructor() {
    makeAutoObservable(this, {
      fetchTodoList: flow,
    });
  }

  *fetchTodoList(params?: ParamsAPIs) {
    this.todoList = [];
    this.isLoading = true;
    try {
      const userList: Array<Todo> = yield todoAPIs.getAll(params);
      this.todoList = userList;
      console.log(this.todoList);
    } catch (error) {
      console.log("fetchTodoList: ", error);
    } finally {
      this.isLoading = false;
    }
  }

  deleteTodoItem(todoId: number) {
    this.todoList = this.todoList?.filter((todo) => todo.id !== todoId);
  }

  toggleCompleted(todoId: number) {
    this.todoList = this.todoList.map((todo) =>
      todo.id === todoId
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
    );
  }
}

export const observableTodoStore = new ObservableTodoStore();
