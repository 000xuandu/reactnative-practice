import React from "react";
import {
  Animated,
  FlatList,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, images, SIZES } from "~constants";

const SWIPE_THRESHOLD = 230;
function clamp(value: number, min: number, max: number) {
  return min < max ? (value < min ? min : value > max ? max : value) : value < max ? max : value > min ? min : value;
}

const data = [
  {
    image: images.headerImage,
    id: 1,
    text: "Image 1",
  },
  {
    image: images.headerImage,
    id: 2,
    text: "Image 2",
  },
  {
    image: images.headerImage,
    id: 3,
    text: "Image 3",
  },
  {
    image: images.headerImage,
    id: 4,
    text: "Image 4",
  },
  {
    image: images.headerImage,
    id: 5,
    text: "Image 5",
  },
];

function KittenCardsAnimation() {
  const [items, setItems] = React.useState(data);
  const animation = React.useRef(new Animated.ValueXY()).current;
  const animationNext = React.useRef(new Animated.Value(0.9)).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: animation.x,
          dy: animation.y,
        },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_e: GestureResponderEvent, { dx, vx, vy }: PanResponderGestureState) => {
      let velocity = 1;
      if (vx >= 0) {
        velocity = clamp(vx, 3, 5);
      } else if (vx < 0) {
        velocity = clamp(Math.abs(vx), 3, 5) * -1;
      }

      if (Math.abs(dx) >= SWIPE_THRESHOLD) {
        Animated.decay(animation, {
          velocity: { x: velocity, y: vy },
          deceleration: 0.98,
          useNativeDriver: false,
        }).start(transactionNext);
      } else {
        Animated.spring(animation, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  React.useEffect(() => {
    animationNext.setValue(0.9);
    animation.setValue({ x: 0, y: 0 });
  }, [animation, animationNext, items]);

  const transactionNext = () => {
    Animated.parallel([
      Animated.spring(animationNext, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start(() => {
      const itemsTemp = [...items];
      itemsTemp.splice(itemsTemp.length - 1, 1);
      setItems(itemsTemp);
    });
  };

  const renderItem = ({ item, index }) => {
    const isLastItem = index === items.length - 1;
    const panHandlers = isLastItem ? panResponder.panHandlers : {};

    const cardAnimationStyle: Animated.AnimatedProps<ViewStyle> | null = isLastItem
      ? {
          opacity: animation.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          }),
          transform: [
            {
              rotate: animation.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ["-15deg", "0deg", "15deg"],
                extrapolate: "clamp",
              }),
            },
            ...animation.getTranslateTransform(),
          ],
        }
      : null;

    const cardNextAnimationStyle: Animated.AnimatedProps<ViewStyle> | {} = isLastItem
      ? {}
      : {
          transform: [{ scale: animationNext }],
        };

    return (
      <Animated.View {...panHandlers} style={[styles.card, cardAnimationStyle, cardNextAnimationStyle]}>
        <Animated.Image source={item.image} resizeMode="cover" style={[styles.image]} />
        <Text style={styles.lowerText}>{item.text}</Text>
      </Animated.View>
    );
  };

  const keyExtractor = (item) => item.id;

  return (
    <SafeAreaView style={styles.fullView}>
      <View style={styles.top}>
        <FlatList scrollEnabled={false} data={items} renderItem={renderItem} keyExtractor={keyExtractor} />
      </View>
      <View style={styles.bottomBar} />
    </SafeAreaView>
  );
}

export default KittenCardsAnimation;

const styles = StyleSheet.create({
  fullView: {
    flex: 1,
  },
  top: {
    flex: 1,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SIZES.spacing_16_vertical,
  },
  card: {
    width: 300,
    height: 300,
    position: "absolute",
    alignSelf: "center",
    borderRadius: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  image: {
    width: "100%",
    height: "100%",
    flex: 3,
    borderRadius: 2,
  },
  lowerText: {
    flex: 1,
    color: COLORS.black,
    backgroundColor: COLORS.white,
    padding: SIZES.spacing_8_horizontal,
  },
});
