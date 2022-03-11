import React from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Animated, {
  CurvedTransition,
  EntryExitTransition,
  FadeIn,
  FadeOut,
  FadingTransition,
  JumpingTransition,
  Layout,
  SequencedTransition,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SIZES} from '~constants';

const DATA = Array(10)
  .fill(1)
  .map((_, index) => index + 1);

const LayoutAnimationScreen = () => {
  const [data, setData] = React.useState(DATA);
  const keyExtractor = (item: number) => item.toString();
  const initialMode = React.useRef<boolean>(true);

  React.useEffect(() => {
    initialMode.current = false;
  }, []);

  const renderItem = ({item}: {item: number}) => (
    <Animated.View
      layout={Layout}
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        backgroundColor: 'pink',
        marginVertical: SIZES.spacing_8_vertical,
        marginHorizontal: SIZES.spacing_8_horizontal,
        padding: SIZES.spacing_16_vertical,
      }}>
      <Text>{item}</Text>
    </Animated.View>
  );

  const randomIndex = (): number => Math.floor(Math.random() * data.length);

  const onAdd = () => {
    const index = randomIndex();
    setData(prevData => {
      const newData = [...prevData];
      newData.splice(index, 0, new Date().getTime());
      return newData;
    });
  };

  const onRemove = () => {
    const index = randomIndex();
    setData(prevData => {
      const newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  const onChangeIndex = () => {
    const fromIndex = randomIndex();
    let toIndex = randomIndex();
    while (toIndex === fromIndex) {
      toIndex = randomIndex();
    }
    setData(prevData => {
      const newData = [...prevData];
      const elm = newData[fromIndex];
      newData.splice(fromIndex, 1);
      newData.splice(toIndex, 0, elm);
      return newData;
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <Animated.FlatList
        data={data}
        style={{flex: 1}}
        renderItem={({item}) => (
          <Animated.View
            key={item}
            entering={FadeIn}
            exiting={FadeOut}
            layout={Layout.delay(100)}
            style={styles.listItem}>
            <Text>{item}</Text>
          </Animated.View>
        )}
      /> */}
      <ScrollView style={{flex: 1}}>
        {data.map((item, index) => {
          return (
            <Animated.View
              key={item}
              entering={
                initialMode.current ? FadeIn.delay(100 * index) : FadeIn
              }
              exiting={FadeOut}
              layout={SequencedTransition}
              style={styles.listItem}>
              <Text>{item}</Text>
            </Animated.View>
          );
        })}
      </ScrollView>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={onRemove}
          style={{
            backgroundColor: 'red',
            flex: 1,
            height: 50,
          }}>
          <Text>Remove</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onChangeIndex}
          style={{
            backgroundColor: 'yellow',
            flex: 1,
            height: 50,
          }}>
          <Text>Change Index</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onAdd}
          style={{
            backgroundColor: 'red',
            flex: 1,
            height: 50,
          }}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LayoutAnimationScreen;

const styles = StyleSheet.create({
  listItem: {
    height: 50,
    backgroundColor: 'pink',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
});
