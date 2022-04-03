import { observer } from "mobx-react";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomIcon } from "~components";
import { COLORS, SIZES } from "~constants";
import { Todo } from "~models/user";
import { observableTodoStore } from "./TodoStore";

const TodoItem = memo(({ todo, onChangeText }: { todo: Todo; onChangeText: (todoItem: Todo) => void }) => {
  console.log("re-render");
  const deleteTodoItem = () => {
    if (!todo?.id) {
      return;
    }
    observableTodoStore.deleteTodoItem(todo.id);
  };

  const toggleComplete = () => {
    if (!todo?.id) {
      return;
    }
    observableTodoStore.toggleCompleted(todo.id);
  };

  return (
    <TouchableOpacity onPress={() => onChangeText(todo)} style={styles.todoItem}>
      <View style={styles.textWrapper}>
        <Text>{todo.title} </Text>
        <TouchableOpacity onPress={toggleComplete}>
          <Text>{todo.completed ? "DONE" : "NOT YET"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.iconGroup}>
        <TouchableOpacity>
          <CustomIcon name="Calendar-1" size={SIZES.spacing_24_horizontal} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteTodoItem}>
          <CustomIcon name="Clear_symbol" size={SIZES.spacing_24_horizontal} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

function TodoMobX() {
  const [temp, setTemp] = useState<number>(1);
  useEffect(() => {
    const fetchTodoList = async () => {
      observableTodoStore.fetchTodoList({ _limit: 30 });
    };
    fetchTodoList();
  }, []);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      // Test re-render of todo item
      console.log("increment");
      setTemp(temp + 1);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const onChangeText = useCallback((todo: Todo) => {
    Alert.alert(todo?.title);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {observableTodoStore.isLoading ? (
          <View>
            <Text>Loading...</Text>
          </View>
        ) : (
          observableTodoStore.todoList?.map((todo) => (
            <TodoItem onChangeText={onChangeText} key={todo.id} todo={todo} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default observer(TodoMobX);
const styles = StyleSheet.create({
  container: { flex: 1 },
  todoItem: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.secondary.gray_3,

    marginHorizontal: SIZES.spacing_8_horizontal,
    marginBottom: SIZES.spacing_8_vertical,
  },
  textWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  iconGroup: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
});
