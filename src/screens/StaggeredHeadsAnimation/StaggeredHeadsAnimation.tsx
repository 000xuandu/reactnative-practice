import React from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '~constants';

export default function StaggeredHeadsAnimation() {
  const heads = React.useRef([
    {
      image: images.Logo,
      animation: new Animated.ValueXY(),
      text: 'Drag Me',
    },
    {
      image: images.Logo,
      animation: new Animated.ValueXY(),
      text: 'Drag Me',
    },
    {
      image: images.Logo,
      animation: new Animated.ValueXY(),
      text: 'Drag Me',
    },
    {
      image: images.Logo,
      animation: new Animated.ValueXY(),
      text: 'Drag Me',
    },
  ]).current;

  const layoutValue = React.useRef<{
    y: number;
    x: number;
    height: number;
    width: number;
  }>({y: -1, height: -1, x: -1, width: -1}).current;

  const onLayoutView = (e: LayoutChangeEvent) => {
    layoutValue.y = e.nativeEvent.layout.y;
    layoutValue.height = e.nativeEvent.layout.height;
    layoutValue.width = e.nativeEvent.layout.width;
    layoutValue.x = e.nativeEvent.layout.x;
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        heads.map(({animation}) => {
          animation.extractOffset();
          animation.setValue({
            x: 0,
            y: 0,
          });
        });
      },
      onPanResponderMove: (
        evt: GestureResponderEvent,
        {dx, dy}: PanResponderGestureState,
      ) => {
        heads[0].animation.setValue({
          x: dx,
          y: dy,
        });
        heads.slice(1).map(({animation}, index) => {
          return Animated.sequence([
            Animated.delay(index * 10),
            Animated.spring(animation, {
              toValue: {x: dx, y: dy},
              useNativeDriver: false,
            }),
          ]).start();
        });
      },
      onPanResponderRelease: (e: GestureResponderEvent) => {
        const limitTop = layoutValue.y + 60;
        const limitBottom = layoutValue.height;

        if (e.nativeEvent.pageY <= limitTop) {
          backToSafeArea(0);
          return;
        }
        if (e.nativeEvent.pageY >= limitBottom) {
          backToSafeArea(limitBottom - 60);
          return;
        }
      },
    }),
  ).current;

  const backToSafeArea = (offset: number) => {
    heads.map(({animation}) => {
      return animation.y.flattenOffset();
    });
    Animated.spring(heads[0].animation.y, {
      toValue: offset,
      useNativeDriver: false,
    }).start();
    heads.slice(1).map(({animation}, index) => {
      animation.y.setValue(offset);
      return Animated.sequence([
        Animated.delay(index * 10),
        Animated.spring(animation.y, {
          toValue: offset,
          useNativeDriver: false,
        }),
      ]).start();
    });
  };

  return (
    <SafeAreaView style={styles.fullView}>
      <View onLayout={onLayoutView} style={[styles.fullView]}>
        {heads
          .slice(0)
          .reverse()
          .map((item, index, items) => {
            const pan =
              index === items.length - 1 ? panResponder.panHandlers : {};
            return (
              <Animated.Image
                {...pan}
                key={index}
                source={item.image}
                resizeMode="cover"
                style={[
                  styles.head,
                  {
                    transform: item.animation.getTranslateTransform(),
                  },
                ]}
              />
            );
          })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
  },
  head: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
  },
});
