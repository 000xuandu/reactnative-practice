import React, { useRef } from "react";
import { Animated, Platform, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import { Header, NavBar, NavBarTitle, CustomIcon } from "~components";
import { SIZES } from "~constants";
import { scale } from "~utils/ScalingUtils";

const DATA = Array(40)
  .fill(0)
  .map((_, index) => ({ name: `Title ${index + 1}` }));
const CBTabViewOffset = Platform.OS === "ios" ? -80 : 0;
const HEIGHT_TAB = 80;

export default function TabBarHeaderAnimation() {
  const scrollY = useRef(new Animated.Value(CBTabViewOffset)).current;
  const scrollViewRef = useRef(null);
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  const renderTabView = () => (
    <Animated.ScrollView
      contentInset={Platform.select({ ios: { top: 80 } })}
      contentOffset={Platform.select({
        ios: {
          x: 0,
          y: CBTabViewOffset,
        },
      })}
      contentContainerStyle={Platform.select({
        ios: {},
        android: {
          paddingTop: 80,
        },
      })}
      refreshControl={<RefreshControl refreshing={false} onRefresh={() => null} />}
      ref={scrollViewRef}
      removeClippedSubviews
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
        useNativeDriver: true,
      })}
      scrollEventThrottle={16}
    >
      <View>
        {DATA.map((item, idx) => (
          <View
            key={item.name}
            style={{
              paddingVertical: scale(16),
              paddingHorizontal: scale(20),
            }}
          >
            <Text>{item.name}</Text>
          </View>
        ))}
      </View>
    </Animated.ScrollView>
  );

  function FirstRoute() {
    return <Animated.View style={[{ flex: 1 }]}>{renderTabView()}</Animated.View>;
  }

  function SecondRoute() {
    return <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;
  }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: insets.bottom,
        },
      ]}
    >
      {/* CBAnimatedNavBar */}
      <NavBar>
        <Animated.View
          style={{
            opacity: Platform.select({
              ios: scrollY.interpolate({
                inputRange: [0, HEIGHT_TAB],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }),
              android: scrollY.interpolate({
                inputRange: [0, HEIGHT_TAB - 10, HEIGHT_TAB],
                outputRange: [0, 0, 1],
                extrapolate: "clamp",
              }),
            }),
            flexDirection: "row",
          }}
        >
          <NavBarTitle />
          <CustomIcon name="Left" size={scale(18)} />
        </Animated.View>
      </NavBar>

      <View style={styles.container}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            {
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange: [CBTabViewOffset, CBTabViewOffset + HEIGHT_TAB],
                    outputRange: [0, -HEIGHT_TAB],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <Header />
        </Animated.View>

        {/* TabView */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={() => {
            const translateY = scrollY.interpolate({
              inputRange: [CBTabViewOffset, CBTabViewOffset + HEIGHT_TAB],
              outputRange: [HEIGHT_TAB, 0],
              extrapolate: "clamp",
            });
            const opacity = scrollY.interpolate({
              inputRange: [CBTabViewOffset + HEIGHT_TAB, CBTabViewOffset + HEIGHT_TAB + 20],
              outputRange: [0, 1],
              extrapolateRight: "clamp",
            });
            return (
              // TabBar
              <Animated.View style={[styles.tabBarWrapper, { transform: [{ translateY }] }]}>
                <Animated.View style={[styles.tabBar]}>
                  <View style={styles.itemTabBar}>
                    <Text>Tabbar</Text>
                  </View>
                </Animated.View>
                <Animated.View style={{ opacity }}>
                  <View style={styles.border} />
                </Animated.View>
              </Animated.View>
            );
          }}
          onIndexChange={setIndex}
          initialLayout={{ width: SIZES.width }}
          swipeEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: scale(20),
    flex: 1,
    alignItems: "center",
  },
  tabBarWrapper: {
    height: 50,
    width: "100%",
    zIndex: 10,
    backgroundColor: "white",
  },
  header: {
    top: 0,
    width: "100%",
    backgroundColor: "yellow",
    position: "absolute",
    zIndex: 2,
    justifyContent: "center",
    height: HEIGHT_TAB,
    paddingHorizontal: scale(20),
  },
  border: {
    height: Platform.OS === "ios" ? 1 : 1.5,
    backgroundColor: "#eee",
  },
  itemTabBar: {
    backgroundColor: "#eee",
    borderRadius: scale(16),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
  },
});
