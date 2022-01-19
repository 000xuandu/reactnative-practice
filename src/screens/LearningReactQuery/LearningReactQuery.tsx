import React from 'react';
import {Button, FlatList, RefreshControl, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetPost} from './hooks/useGetPost';

const LearningReactQuery = ({navigation}) => {
  const {
    status,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    hasPreviousPage,
    fetchPreviousPage,
    data: posts,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useGetPost();

  const onEndReached = () => {
    if (!hasNextPage) {
      return;
    }
    console.log('nextPage');
    fetchNextPage();
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button
        title="Go to useMutation screen"
        onPress={() => {
          navigation.navigate('LearningUseMutation');
        }}
      />
      <FlatList
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts?.pages.flatMap(dataPage => {
          return dataPage.data;
        })}
        keyExtractor={item => item._id.toString()}
        renderItem={({item, index}) => (
          <View
            style={{
              marginVertical: 32,
              backgroundColor: 'red',
            }}>
            <Text>{index}</Text>
            <Text>{item._id}</Text>
            <Text>{item.name}</Text>
          </View>
        )}
        scrollEventThrottle={16}
        onEndReachedThreshold={2}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

export default LearningReactQuery;
