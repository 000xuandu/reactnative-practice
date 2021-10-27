import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {RootState, useAppSelector} from '~stores';
import {toggleDoneById} from '~stores/count/countAction';
import {Todo} from '~stores/count/countReducer';
export const TodoItem = ({id}: {id: number}) => {
  const {todo, toggleDone, textStyle} = useTodoItemLogic(id);
  return (
    <View style={styles.container}>
      <Button title="Toggle Done" onPress={toggleDone} />
      <Text style={textStyle}>{todo?.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', padding: 4, marginHorizontal: 4},
});

const useTodoItemLogic = (id: number) => {
  const todo = useAppSelector((state: RootState) =>
    state.countReducer.list.find((item: Todo) => item.id === id),
  );
  const dispatch = useDispatch();
  const toggleDone = () => {
    dispatch(toggleDoneById(id));
  };
  console.log('id rendered: ', id);

  const textStyle = {color: todo?.isDone ? 'red' : 'blue'};
  return {
    todo,
    toggleDone,
    textStyle,
  };
};
