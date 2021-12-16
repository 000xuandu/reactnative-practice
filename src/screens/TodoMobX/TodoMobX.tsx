import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {observableTodoStore, TodoProps} from './TodoStore';

const TodoItem = observer(({item, index}: {item: TodoProps; index: number}) => {
  console.log('render: ', index);
  const setToggleStatus = action(() => {
    observableTodoStore.todos[index].completed =
      !observableTodoStore.todos[index].completed;
  });
  return (
    <TouchableOpacity onPress={setToggleStatus}>
      <Text>
        {item.task} {item.assignee} {item.completed ? 'DONE' : 'OPEN'}
      </Text>
    </TouchableOpacity>
  );
});

const TodoMobX = () => {
  const peopleStore = observable([{name: 'Michel'}, {name: 'Me'}]);

  const addTodoItem = () => {
    observableTodoStore.addTodo('the first todo');
  };

  const setTodoCompleted = action(() => {
    observableTodoStore.todos[0].completed = true;
  });

  const addTodoAsync = action(() => {
    observableTodoStore.pendingRequests++;
    setTimeout(
      action(() => {
        addTodoItem();
        observableTodoStore.pendingRequests--;
      }),
      2000,
    );
  });

  const assignTask = action(() => {
    observableTodoStore.assignTask();
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title={'addTodo'} onPress={addTodoItem} />
      <Button title={'setTodoCompleted'} onPress={setTodoCompleted} />
      <Button title={'addTodoAsync'} onPress={addTodoAsync} />
      <Button title={'assignTask'} onPress={assignTask} />
      {observableTodoStore.todos.map((item, index) => (
        <TodoItem key={index} item={item} index={index} />
      ))}
      {observableTodoStore.pendingRequests > 0 && <Text>Loading...</Text>}
    </SafeAreaView>
  );
};

export default observer(TodoMobX);
const styles = StyleSheet.create({});
