import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Config from "react-native-config";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { images, SIZES } from "~constants";

const DATA = [
  {
    image: images.onboarding1,
  },
  {
    image: images.onboarding2,
  },
  {
    image: images.onboarding3,
  },
];

function DotItem({ index, progress }: { index: number; progress: Animated.SharedValue<number> }) {
  // const clamp = (value: number, lowerBound: number, upperBound: number) => {
  //   'worklet';
  //   return Math.min(Math.max(lowerBound, value), upperBound);
  // };

  // const multiplier = 1 / DATA.length;

  // const animatedStyles = useAnimatedStyle(() => {
  //   const opacity = interpolate(
  //     clamp(progress.value, 0, 1 - multiplier),
  //     [
  //       index * multiplier - multiplier,
  //       index * multiplier,
  //       index * multiplier + multiplier,
  //     ],
  //     [0.25, 1, 0.25],
  //     Extrapolate.CLAMP,
  //   );
  //   const width = interpolate(
  //     clamp(progress.value, 0, 1 - multiplier),
  //     [
  //       index * multiplier - multiplier,
  //       index * multiplier,
  //       index * multiplier + multiplier,
  //     ],
  //     [DOT_SIZE, DOT_SIZE * 2, DOT_SIZE],
  //     Extrapolate.CLAMP,
  //   );
  //   return {
  //     opacity,
  //     // width,
  //   };
  // });

  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.value,
      [(index - 1) * SIZES.width, index * SIZES.width, (index + 1) * SIZES.width],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );
    const width = interpolate(
      progress.value,
      [(index - 1) * SIZES.width, index * SIZES.width, (index + 1) * SIZES.width],
      [DOT_SIZE, DOT_SIZE * 2, DOT_SIZE],
      Extrapolate.CLAMP
    );
    return {
      opacity,
      width,
    };
  });

  return <Animated.View style={[styles.dot, animatedStyles]} />;
}

function PagingScreen() {
  const progress = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const derived = useDerivedValue(() => progress.value / SIZES.width, [currentIndex]);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    // progress.value = event.contentOffset.x / event.contentSize.width;
    progress.value = event.contentOffset.x;
  });

  const rDotIndicator = useAnimatedStyle(() => {
    const tranX = interpolate(derived.value, [0, 1], [0, DOT_INDICATOR_SIZE]);
    return {
      transform: [
        {
          translateX: tranX,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text
        style={{
          backgroundColor: "red",
          color: "white",
        }}
      >
        {Config.API_DOMAIN}123
      </Text>
      <Animated.ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        onScroll={scrollHandler}
        onMomentumScrollEnd={(event) => {
          console.log(Math.round(event.nativeEvent.contentOffset.x / SIZES.width));
          setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / SIZES.width));
        }}
        scrollEventThrottle={16}
      >
        {DATA.map((item, index) => (
          <View key={index} style={styles.imgWrapper}>
            <Image source={item.image} style={styles.img} resizeMode="cover" />
          </View>
        ))}
      </Animated.ScrollView>
      {/* paginate dot */}
      <View style={styles.dotWrapper}>
        {DATA.map((_, index) => (
          <DotItem key={index} index={index} progress={progress} />
        ))}
        <Animated.View style={[styles.dotIndicator, rDotIndicator]} />
      </View>
    </View>
  );
}
const DOT_SIZE = 8;
const DOT_SPACING = 8;
const DOT_INDICATOR_SIZE = DOT_SIZE + DOT_SPACING;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imgWrapper: {
    width: SIZES.width,
    height: SIZES.height,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  dotWrapper: {
    position: "absolute",
    bottom: "18%",

    alignSelf: "center",
    flexDirection: "row",
  },
  dot: {
    height: DOT_SIZE,
    width: DOT_SIZE,

    backgroundColor: "blue",
    borderRadius: DOT_SPACING / 2,
    marginHorizontal: DOT_SPACING / 2,
  },
  dotIndicator: {
    position: "absolute",
    top: -DOT_SIZE / 2,

    height: DOT_INDICATOR_SIZE,
    width: DOT_INDICATOR_SIZE,

    backgroundColor: "transparent",
    borderRadius: DOT_INDICATOR_SIZE / 2,
    borderWidth: 1,
    borderColor: "red",
  },
});

export default PagingScreen;
