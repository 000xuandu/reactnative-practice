import React from 'react';
import {
  Animated,
  Image,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel, {
  CarouselProps,
  getInputRangeFromIndexes,
} from 'react-native-snap-carousel';
import {SIZES} from '~constants';

const stories = [
  {
    id: '2',
    source: require('../../assets/images/onboarding-1.png'),
  },
  {
    id: '4',
    source: require('../../assets/images/onboarding-2.png'),
  },
  {
    id: '5',
    source: require('../../assets/images/onboarding-3.png'),
  },
  {
    id: '3',
    source: require('../../assets/images/onboarding-2.png'),
  },
  {
    id: '1',
    source: require('../../assets/images/onboarding-1.png'),
  },
];

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

const POSITION = Platform.OS === 'ios' ? 2 : 1.5;
const ZOOM = Math.sin(toRadians(65));
const MARGIN25 = (SIZES.width - 320) / 31.3 + 7;
const MARGIN50 = (SIZES.width - 320) / 23.5 + 13;
const MARGIN100 = (SIZES.width - 320) / 47 + 5;

const Transition3D = () => {
  const _scrollInterpolator = (
    index: number,
    carouselProps: CarouselProps<any>,
  ) => {
    const range = [1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;

    return {inputRange, outputRange};
  };

  const _animatedStyles = (
    _index: number,
    scrollX: Animated.AnimatedValue,
    _carouselProps: CarouselProps<any>,
  ) => {
    return {
      transform: [
        {
          perspective: 2 * SIZES.width,
        },
        {
          translateX: scrollX.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [SIZES.width / POSITION, 0, -SIZES.width / POSITION],
          }),
        },
        {
          rotateY: scrollX.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: ['-90deg', '0deg', '90deg'],
          }),
        },
        {
          scale: scrollX.interpolate({
            inputRange: [-1, -0.5, 0, 0.5, 1],
            outputRange: [1, ZOOM, 1, ZOOM, 1],
          }),
        },
        {
          translateX: scrollX.interpolate({
            inputRange: [-1, -0.75, -0.5, 0, 0.5, 0.75, 1],
            outputRange: [
              -SIZES.width / POSITION + MARGIN100,
              (-SIZES.width * ZOOM * 0.75) / POSITION + MARGIN25,
              (-SIZES.width * ZOOM * 0.5) / POSITION + MARGIN50,
              0,
              (SIZES.width * ZOOM * 0.5) / POSITION - MARGIN50,
              (SIZES.width * ZOOM * 0.75) / POSITION - MARGIN25,
              SIZES.width / POSITION - MARGIN100,
            ],
          }),
        },
      ],
      opacity: scrollX.interpolate({
        inputRange: [-1, -0.5, 0.5, 1],
        outputRange: [0.4, 1, 1, 0.4],
      }),
    } as unknown as StyleProp<ViewStyle>;
  };

  const renderItem = ({item}: {item: any}) => {
    const style = {
      width: SIZES.width,
      height: '100%',
    };
    return (
      <SafeAreaView>
        <Image style={style} source={item.source} />
      </SafeAreaView>
    );
  };

  const setKeyExtractor = (item: any) => item.id;

  return (
    <View style={styles.container}>
      <Carousel
        firstItem={0}
        containerCustomStyle={{width: SIZES.width}}
        data={stories}
        useScrollView={true}
        bounces={false}
        renderItem={renderItem}
        sliderWidth={SIZES.width}
        itemWidth={SIZES.width}
        keyExtractor={setKeyExtractor}
        scrollInterpolator={_scrollInterpolator}
        slideInterpolatedStyle={_animatedStyles}
      />
      {/* <Animated.FlatList
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        keyExtractor={setKeyExtractor}
        data={stories}
        renderItem={renderItem}
        decelerationRate={0.99}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'black'},
});

export default Transition3D;
