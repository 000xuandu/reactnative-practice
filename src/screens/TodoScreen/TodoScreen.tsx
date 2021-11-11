import React from 'react';
import {Button, FlatList, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {shallowEqual} from 'react-redux';
import {SPACE_BOTTOM_AREA} from '~constants/theme';
import {RootState, useAppDispatch, useAppSelector} from '~stores';
import {addNewTodoItem} from '~stores/count/countAction';
import {Todo} from '~stores/count/countReducer';
import {TodoItemMemo} from './TodoItem';

const TodoScreen = () => {
  const {todoIdList, renderItem, keyExtractor, addTodoItem} =
    useTodoScreenLogic();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        data={todoIdList}
      />
      <Button title="Add Todo Item" onPress={addTodoItem} />
    </SafeAreaView>
  );
};

const useTodoScreenLogic = () => {
  const dispatch = useAppDispatch();

  const todoIdList = useAppSelector(
    (rootState: RootState) =>
      rootState.countReducer.list.map((item: Todo) => item.id),
    // shallowEqual,
  );

  const keyExtractor = (item: any) => item.toString();

  const renderItem = ({item}: {item: number}) => {
    return <TodoItemMemo key={item} id={item} />;
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

const styles = StyleSheet.create({
  container: {flex: 1, paddingBottom: SPACE_BOTTOM_AREA},
});
export default TodoScreen;
