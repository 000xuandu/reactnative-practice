import {action, autorun, computed, makeObservable, observable} from 'mobx';

export interface TodoProps {
  task: string;
  completed: boolean;
  assignee: string | null;
}

const peopleStore = observable([{name: 'Michel'}, {name: 'Me'}]);

class ObservableTodoStore {
  todos: Array<TodoProps> = [];
  pendingRequests: number = 0;

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
      assignTask: action,
    });
    autorun(() => {
      console.log(this.report);
    });
  }

  get completedTodosCount() {
    return this.todos.filter(todo => todo.completed === true).length;
  }

  get report() {
    if (this.todos.length === 0) {
      return '<none>';
    }
    const nextTodo = this.todos.find(todo => todo.completed === false);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : '<none>'}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  assignTask() {
    observableTodoStore.todos[0].assignee = peopleStore[0].name;
    observableTodoStore.todos[1].assignee = peopleStore[1].name;
    peopleStore[0].name = 'Michel Weststrate';
  }

  addTodo(task: string) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null,
    });
  }
}

export const observableTodoStore = new ObservableTodoStore();
