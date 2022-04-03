import React, { useRef, useState } from "react";
import { View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SPACE_BOTTOM_AREA } from "~constants/theme";

const clamp = (value, lowerBound, upperBound) => {
  "worklet";

  return Math.min(Math.max(lowerBound, value), upperBound);
};

export default function HeaderAnimation() {
  const offsetY = useSharedValue(0);
  const translateY = useSharedValue(0);
  const height = useSharedValue(60);
  const scrollRef = useRef().current;
  const [snapIntervalValue, setSnapIntervalValue] = useState<number | undefined>(60);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx) => {
      const diff = event.contentOffset.y - ctx.prevY;
      offsetY.value = clamp(offsetY.value + diff, 0, 60);
      // console.log(offsetY.value);
      console.log(height.value);
    },
    onBeginDrag: (e, ctx) => {
      ctx.prevY = e.contentOffset.y;
      console.log("begin");
    },
    onEndDrag: (e) => {
      console.log("end1: ", offsetY.value);
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: interpolate(offsetY.value, [0, 30, 60], [60, 30, 0], Extrapolate.CLAMP),
    opacity: interpolate(offsetY.value, [0, 60], [1, 0], Extrapolate.CLAMP),
    backgroundColor: "red",
    transform: [
      {
        translateY: interpolate(offsetY.value, [0, 30, 60], [0, -30, -60], Extrapolate.CLAMP),
      },
    ],
  }));

  const scrollViewStyle = useAnimatedStyle(() => ({
    paddingTop: interpolate(offsetY.value, [0, 30, 60], [60, 15, 0], Extrapolate.CLAMP),
  }));
  return (
    <SafeAreaProvider
      style={{
        flex: 1,
        marginBottom: SPACE_BOTTOM_AREA,
      }}
    >
      <Animated.ScrollView
        ref={scrollRef}
        style={{}}
        bounces={false}
        onScroll={scrollHandler}
        snapToInterval={snapIntervalValue}
        onMomentumScrollEnd={() => {
          console.log("123123", offsetY.value);
          if (offsetY.value >= 60) {
            setSnapIntervalValue(undefined);
          } else if (offsetY.value === 0) {
            setSnapIntervalValue(60);
          }
          // setPagingEnable(false);
        }}
        scrollEventThrottle={16}
      >
        <Animated.View
          style={{
            height: 60,
            width: "100%",
            backgroundColor: "red",
          }}
        />
        {Array(30)
          .fill(1)
          .map((_, index) => (
            <View
              key={index}
              style={{
                width: "100%",
                height: 200,
                backgroundColor: "gray",
                marginVertical: 4,
              }}
            />
          ))}
      </Animated.ScrollView>
      {/* <Animated.View style={rStyle} /> */}
    </SafeAreaProvider>
  );
}
