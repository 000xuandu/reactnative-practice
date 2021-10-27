import React from 'react';
import {Button, FlatList, View} from 'react-native';
import {shallowEqual} from 'react-redux';
import {RootState, useAppDispatch, useAppSelector} from '~stores';
import {addNewTodoItem} from '~stores/count/countAction';
import {Todo} from '~stores/count/countReducer';
import {TodoItem} from './TodoItem';

const TodoScreen = () => {
  const {todoIdList, renderItem, keyExtractor, addTodoItem} =
    useTodoScreenLogic();

  return (
    <View>
      <FlatList
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={todoIdList}
      />
      <Button title="Add Todo Item" onPress={addTodoItem} />
    </View>
  );
};

const useTodoScreenLogic = () => {
  const dispatch = useAppDispatch();

  const todoIdList = useAppSelector(
    (rootState: RootState) =>
      rootState.countReducer.list.map((item: Todo) => item.id),
    shallowEqual,
  );

  const keyExtractor = (item: any) => item.toString();

  const renderItem = ({item}: {item: number}) => {
    return <TodoItem key={item} id={item} />;
  };

  const addTodoItem = () => {
    const id = new Date().getTime();
    const newItem = {
      id,
      name: `todo ${id}`,
      isDone: false,
    };
    dispatch(addNewTodoItem(newItem));
  };

  return {
    todoIdList,
    keyExtractor,
    renderItem,
    addTodoItem,
  };
};
export default TodoScreen;
