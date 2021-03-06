import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabDescriptorMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { createDrawerNavigator, DrawerContentScrollView, useDrawerProgress } from "@react-navigation/drawer";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import * as shape from "d3-shape";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import Animated, { Adaptable, Extrapolate } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { SIZES } from "~constants";
import { BOTTOM_TAB_HEIGHT, ITEM_TAB_HEIGHT, TAB_CONTAINER_HEIGHT, translateY } from "~constants/theme";
import { TodoScreen, PagingScreen, HeaderAnimation } from "~screens";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

interface MyTabProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: any;
}

const getPath = () => {
  const curve = shape
    .line()
    .x((d: any) => d.x)
    .y((d: any) => d.y)
    .curve(shape.curveBasis)(
    isIphoneX()
      ? ([
          { x: SIZES.width / 2 - 60, y: 0 },
          { x: SIZES.width / 2 - 35, y: 0 },
          { x: SIZES.width / 2 - 20, y: BOTTOM_TAB_HEIGHT / 2 - 10 },
          { x: SIZES.width / 2 + 20, y: BOTTOM_TAB_HEIGHT / 2 - 10 },
          { x: SIZES.width / 2 + 35, y: 0 },
          { x: SIZES.width / 2 + 60, y: 0 },
        ] as [number, number][] | Iterable<[number, number]>)
      : ([
          { x: SIZES.width / 2 - 60, y: 0 },
          { x: SIZES.width / 2 - 35, y: 0 },
          { x: SIZES.width / 2 - 20, y: BOTTOM_TAB_HEIGHT / 2 + 5 },
          { x: SIZES.width / 2 + 20, y: BOTTOM_TAB_HEIGHT / 2 + 5 },
          { x: SIZES.width / 2 + 35, y: 0 },
          { x: SIZES.width / 2 + 60, y: 0 },
        ] as [number, number][] | Iterable<[number, number]>)
  );
  const rectangle = shape
    .line()
    .x((d: any) => d.x)
    .y((d: any) => d.y)([
    { x: SIZES.width, y: 0 },
    { x: SIZES.width, y: BOTTOM_TAB_HEIGHT },
    { x: 0, y: BOTTOM_TAB_HEIGHT },
    { x: 0, y: 0 },
  ] as [number, number][] | Iterable<[number, number]>);
  return `${rectangle}${curve}`;
};

const d = getPath();

function MyTabBar({ state, descriptors, navigation }: MyTabProps) {
  return (
    <View style={styles.tabBarContainer}>
      <Svg width="100%" height={BOTTOM_TAB_HEIGHT}>
        <Path d={d} fill="pink" stroke="transparent" />
      </Svg>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              if (index !== 2) {
                navigation.navigate(route.name);
              } else {
                navigation.openDrawer();
              }
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const colorTextLabel = { color: isFocused ? "#673ab7" : "#222" };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.itemTab, index === 2 && styles.itemTabCenter]}
            >
              <Text style={colorTextLabel}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function TabNav({}: any) {
  const progress = useDrawerProgress();
  const scale = Animated.interpolateNode(progress as Adaptable<number>, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
    extrapolate: Extrapolate.CLAMP,
  });
  const borderRadius = Animated.interpolateNode(progress as Adaptable<number>, {
    inputRange: [0, 1],
    outputRange: [1, 20],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedStyle = {
    borderRadius,
    transform: [{ scale }],
  };
  return (
    <Animated.View style={[styles.tabWrapper, animatedStyle]}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tab.Screen name="Paging" component={PagingScreen} />
        <Tab.Screen name="Header" component={HeaderAnimation} />
        <Tab.Screen name="Paging2" component={PagingScreen} />
        <Tab.Screen name="Paging3" component={PagingScreen} />
        <Tab.Screen name="Todo" component={TodoScreen} />
      </Tab.Navigator>
    </Animated.View>
  );
}

function CustomDrawerContent({ navigation }: { navigation: any }) {
  return (
    <DrawerContentScrollView scrollEnabled contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.closeDrawer()} style={styles.btnCloseDrawer}>
        <Text>X</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

function DrawerCustom({}: any) {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            flex: 1,
            width: "60%",
            backgroundColor: "red",
          },
          drawerType: "slide",
          overlayColor: "transparent",
          sceneContainerStyle: {
            backgroundColor: "red",
          },
        }}
      >
        <Drawer.Screen name="TabNav">{(props) => <TabNav {...props} />}</Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabWrapper: {
    flex: 1,
    overflow: "hidden",
  },
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",

    width: "100%",
    height: TAB_CONTAINER_HEIGHT,
  },
  tabBar: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: SIZES.bottomNavSpace,
  },
  itemTab: {
    flex: 1,
    height: ITEM_TAB_HEIGHT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemTabCenter: {
    flex: 0,
    height: 60,
    width: 60,

    borderRadius: 30,
    backgroundColor: "pink",

    transform: [{ translateY: -translateY }],
  },
  btnCloseDrawer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
  },
});

export default DrawerCustom;
