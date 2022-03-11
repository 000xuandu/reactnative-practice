import React from 'react';
import {Alert, StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import { SIZES } from '~constants';

const NUMBER_BALLS = 3;
const ARRAY_COLORS = ['blue', 'green', 'red'];

interface AnimatedPosition {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
}

const useFollowAnimatedPosition = ({x, y}: AnimatedPosition) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: followX.value}, {translateY: followY.value}],
    };
  });

  return {followX, followY, rStyle};
};
const DragBallAnimation = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const context = useSharedValue({x: 0, y: 0});

  const gesture = Gesture.Pan()
    .onBegin(() => {
      context.value = {
        x: translateX.value,
        y: translateY.value,
      };
    })
    .onUpdate(e => {
      translateX.value = e.translationX + context.value.x;
      translateY.value = e.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value >= SIZES.width / 2) {
        translateX.value = SIZES.width - 70;
      }
      if (translateX.value < SIZES.width / 2) {
        translateX.value = 0;
      }
      if (translateY.value < SIZES.statusBarSpace + 70) {
        translateY.value = SIZES.statusBarSpace;
      }
      if (translateY.value >= SIZES.height - SIZES.bottomNavSpace - 70) {
        translateY.value = SIZES.height - 70 - SIZES.bottomNavSpace;
      }
    });

  const {
    followX: blueFollowX,
    followY: blueFollowY,
    rStyle: rBlueCircleStyle,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });

  const {
    followX: redFollowX,
    followY: redFollowY,
    rStyle: rRedCircleStyle,
  } = useFollowAnimatedPosition({
    x: blueFollowX,
    y: blueFollowY,
  });

  const {rStyle: rGreenCircleStyle} = useFollowAnimatedPosition({
    x: redFollowX,
    y: redFollowY,
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            backgroundColor: ARRAY_COLORS[1],
          },
          rGreenCircleStyle,
        ]}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: 70,
            height: 70,
            borderRadius: 70 / 2,
            backgroundColor: ARRAY_COLORS[2],
          },
          rRedCircleStyle,
        ]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              width: 70,
              height: 70,
              borderRadius: 70 / 2,
              backgroundColor: ARRAY_COLORS[0],
            },
            rBlueCircleStyle,
          ]}
        />
      </GestureDetector>
    </SafeAreaView>
  );
};

export default DragBallAnimation;

const styles = StyleSheet.create({});
