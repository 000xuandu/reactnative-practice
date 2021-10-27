import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {toggleDoneById} from '~stores/count/countAction';
export const TodoItem = ({id}: {id: number}) => {
  const {todo, toggleDone, textStyle} = useTodoItemLogic(id);
  return (
    <View style={styles.container}>
      <Button title="Toggle Done" onPress={toggleDone} />
      <Text style={textStyle}>{todo.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', padding: 4, marginHorizontal: 4},
});

const useTodoItemLogic = (id: number) => {
  const todo = useSelector((state: any) =>
    state.countReducer.list.find((item: any) => item.id === id),
  );
  const dispatch = useDispatch();
  const toggleDone = () => {
    dispatch(toggleDoneById(id));
  };
  console.log('id rendered: ', id);

  const textStyle = {color: todo.isDone ? 'red' : 'blue'};
  return {
    todo,
    toggleDone,
    textStyle,
  };
};
