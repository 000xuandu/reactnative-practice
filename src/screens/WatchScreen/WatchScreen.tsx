import React, {useCallback, useEffect, useRef} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {SIZES} from '~constants';
import {scale} from '~utils/ScalingUtils';

const DATA = Array(100)
  .fill(1)
  .map((_, index) => ({
    id: index + 1,
    uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    ref: React.createRef(),
  }));

const ItemVideo = ({item, index}) => {
  return (
    <View style={styles.itemVideoContainer}>
      <Text style={styles.textItemVideo}>This is header video {index + 1}</Text>
      <Video
        source={{
          uri: item.uri,
        }} // Can be a URL or a local file.
        ref={item.ref} // Store reference
        style={styles.backgroundVideo}
        controls={true}
        paused={true}
      />
      <Text style={styles.textItemVideo}>This is footer video</Text>
    </View>
  );
};

const WatchScreen = () => {
  const setKeyExtractor = item => item.id;

  const renderItem = ({item, index}) => {
    return <ItemVideo item={item} index={index} />;
  };

  const onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    if (!viewableItems || viewableItems.length <= 0) {
      return;
    }
    const lastItemViewable = viewableItems.find(
      ({item}) => item.id === DATA.slice(DATA.length - 1)[0]?.id,
    );
    const firstItemViewable = lastItemViewable?.item || viewableItems[0].item;
    console.log('firstItemViewable: ', firstItemViewable);
    if (firstItemViewable) {
      firstItemViewable.ref?.current.setNativeProps({paused: false});
    }
    DATA.forEach(item => {
      if (item.id !== firstItemViewable?.id) {
        item.ref?.current?.setNativeProps({paused: true});
      }
    });
  }, []);

  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={setKeyExtractor}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 500,
          waitForInteraction: true,
          viewAreaCoveragePercentThreshold: 75,
        }}
        removeClippedSubviews={true}
        windowSize={11}
        initialNumToRender={11}
        // getItemLayout={getItemLayout}
        // viewabilityConfigCallbackPairs={[
        //   {
        //     viewabilityConfig: {
        //       minimumViewTime: 600,
        //       itemVisiblePercentThreshold: 60,
        //     },
        //     onViewableItemsChanged: onViewableItemsChanged,
        //   },
        //   {
        //     viewabilityConfig: {
        //       minimumViewTime: 700,
        //       itemVisiblePercentThreshold: 75,
        //     },
        //     onViewableItemsChanged: onViewableItemsChanged,
        //   },
        // ]}
      />
    </SafeAreaView>
  );
};

export default WatchScreen;

const ITEM_HEIGHT = scale(250);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    width: '100%',
    height: ITEM_HEIGHT,
  },
  itemVideoContainer: {
    width: '100%',
    backgroundColor: 'black',
    marginBottom: scale(16),
  },
  textItemVideo: {
    color: 'white',
  },
});
