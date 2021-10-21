import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  NavigationContainer,
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as shape from 'd3-shape';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {HomeScreen, PagingScreen} from '~screens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface MyTabProps {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const NAVIGATION_BOTTOM_TABS_HEIGHT = 50;
const screenWidth = Dimensions.get('window').width;
const height = NAVIGATION_BOTTOM_TABS_HEIGHT;
const translateY = 25;

const getPath = () => {
  const curve = shape
    .line()
    .x((d: any) => d.x)
    .y((d: any) => d.y)
    .curve(shape.curveBasis)([
    {x: screenWidth / 2 - 60, y: 0},
    {x: screenWidth / 2 - 35, y: 0},
    {x: screenWidth / 2 - 20, y: height / 2 + 5},
    {x: screenWidth / 2 + 20, y: height / 2 + 5},
    {x: screenWidth / 2 + 35, y: 0},
    {x: screenWidth / 2 + 60, y: 0},
  ] as [number, number][] | Iterable<[number, number]>);
  const rectangle = shape
    .line()
    .x((d: any) => d.x)
    .y((d: any) => d.y)([
    {x: screenWidth, y: 0},
    {x: screenWidth, y: height},
    {x: 0, y: height},
    {x: 0, y: 0},
  ] as [number, number][] | Iterable<[number, number]>);
  return `${rectangle}${curve}`;
};

const d = getPath();

function MyTabBar({state, descriptors, navigation}: MyTabProps) {
  return (
    <View style={styles.tabBarContainer}>
      <Svg width="100%" height={NAVIGATION_BOTTOM_TABS_HEIGHT}>
        <Path d={d} fill="pink" stroke="transparent" />
      </Svg>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.itemTab, index === 2 && styles.itemTabCenter]}>
              <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const App: React.FC<{}> = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Paging" component={PagingScreen} />
        <Tab.Screen name="Paging1" component={PagingScreen} />
        <Tab.Screen name="Paging2" component={PagingScreen} />
        <Tab.Screen name="Paging3" component={PagingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: NAVIGATION_BOTTOM_TABS_HEIGHT + 10 + translateY,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  tabBar: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  itemTab: {
    flexDirection: 'row',
    flex: 1,
    height: NAVIGATION_BOTTOM_TABS_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTabCenter: {
    height: 60,
    width: 60,
    flex: 0,
    borderRadius: 30,
    backgroundColor: 'pink',
    transform: [{translateY: -translateY}],
  },
});

export default App;
