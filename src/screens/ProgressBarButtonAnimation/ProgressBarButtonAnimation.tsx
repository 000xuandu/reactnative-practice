import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '~constants';

export default function ProgressBarButtonAnimation() {
  const animation = React.useRef(new Animated.Value(0)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

  const onPress = () => {
    animation.setValue(0);
    opacity.setValue(1);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    });
  };

  const animatedProgressBar: Animated.AnimatedProps<ViewStyle> = {
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    }),
    backgroundColor: animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgb(71, 255, 99)', 'rgb(99,71,255)'],
      extrapolate: 'clamp',
    }),
    opacity: opacity,
  };

  return (
    <SafeAreaView style={styles.fullView}>
      <View style={[styles.fullView, styles.centerView]}>
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <View style={[styles.textWrapper, styles.centerView]}>
            <Animated.View style={[styles.progressBar, animatedProgressBar]} />
            <Text>SignIn</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centerView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width: 150,
    height: 50,
    backgroundColor: 'yellow',
  },
  progressBar: {
    position: 'absolute',
    backgroundColor: 'red',
    bottom: 0,
    left: 0,
    height: 5,
  },
});
