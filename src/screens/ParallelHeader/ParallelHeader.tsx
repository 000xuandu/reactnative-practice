import React, {useRef} from 'react';
import {Image, Platform, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {SIZES} from '~constants';
import {headerImage} from '~constants/images';
import {scale} from '~utils/ScalingUtils';
const HEIGHT_IMAGE = scale(200);
const MIN_HEIGHT_IMAGE = scale(60);
const HEADER_SCROLL_DISTANCE = HEIGHT_IMAGE * 0.7;

export default function ParallelHeader() {
  const scrollRef = useRef<Animated.ScrollView>(null);
  const offsetY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    offsetY.value = event.contentOffset.y;
  });
  const rImageStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        offsetY.value,
        [0, HEADER_SCROLL_DISTANCE],
        [HEIGHT_IMAGE, MIN_HEIGHT_IMAGE],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          scale: interpolate(
            offsetY.value,
            [-SIZES.width * 2, 0],
            [8, 1],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });
  const onScrollEndDrag = () => {
    'worklet';
    if (Platform.OS === 'android') {
      return;
    }
    if (offsetY.value < HEADER_SCROLL_DISTANCE * 0.5) {
      scrollRef.current?.scrollTo({x: 0, y: 0, animated: true});
    } else if (
      offsetY.value >= HEADER_SCROLL_DISTANCE * 0.5 &&
      offsetY.value <= HEADER_SCROLL_DISTANCE
    ) {
      scrollRef.current?.scrollTo({
        x: 0,
        y: HEADER_SCROLL_DISTANCE,
        animated: true,
      });
    }
  };
  return (
    <View style={[styles.container]}>
      <View style={[styles.content]}>
        <Animated.ScrollView
          ref={scrollRef}
          onScroll={scrollHandler}
          onScrollEndDrag={onScrollEndDrag}
          // onMomentumScrollEnd={onScrollEndDrag}
          decelerationRate={Platform.OS === 'android' ? 'normal' : 'fast'}
          scrollEventThrottle={16}
          style={[styles.container]}
          contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              marginTop: HEIGHT_IMAGE,
            }}>
            {new Array(30).fill(0).map((_, index) => {
              return (
                <View style={[styles.item]} key={index}>
                  <Text>{index + 1}</Text>
                </View>
              );
            })}
          </View>
        </Animated.ScrollView>
        <Animated.View style={[styles.imageWrapper, rImageStyle]}>
          <Image source={headerImage} style={[styles.image]} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageWrapper: {
    height: HEIGHT_IMAGE,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  item: {
    backgroundColor: 'white',
    padding: scale(8),
    paddingVertical: scale(16),
    margin: scale(8),
    borderRadius: scale(8),
    alignItems: 'center',
  },
});
