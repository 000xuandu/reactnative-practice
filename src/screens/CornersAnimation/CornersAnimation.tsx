import React from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SQUARE_SIZE = 100;

interface LayoutValueProps {
  width: number | null;
  height: number | null;
}

const CornersAnimation = () => {
  const animation = React.useRef(new Animated.ValueXY()).current;
  const layoutValue = React.useRef<LayoutValueProps>({
    width: null,
    height: null,
  }).current;

  const onPress = () => {
    if (layoutValue.width && layoutValue.height) {
      Animated.sequence([
        Animated.spring(animation.y, {
          toValue: layoutValue.height - SQUARE_SIZE,
          useNativeDriver: true,
        }),
        Animated.spring(animation.x, {
          toValue: layoutValue.width - SQUARE_SIZE,
          useNativeDriver: true,
        }),
        Animated.spring(animation.y, {
          toValue: 0,
          useNativeDriver: true,
        }),
        Animated.spring(animation.x, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const squareAnimatedStyle: Animated.AnimatedProps<ViewStyle> = {
    transform: animation.getTranslateTransform(),
  };

  const onLayoutTouchable = (e: LayoutChangeEvent) => {
    layoutValue.height = e.nativeEvent.layout.height;
    layoutValue.width = e.nativeEvent.layout.width;
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      <TouchableOpacity
        onLayout={onLayoutTouchable}
        onPress={onPress}
        style={[styles.fullScreen]}>
        <Animated.View style={[styles.redSquare, squareAnimatedStyle]} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CornersAnimation;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  redSquare: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    backgroundColor: 'red',
  },
});
