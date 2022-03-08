import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from 'react-query';

interface SuperHeroProps {
  id: number | string;
  name: string;
  alterEgo: string;
}

const fetchSuperHeroes = async () => {
  try {
    const res = await fetch('http://localhost:40001/superheroes');
    const dataJson = await res.json();
    return dataJson;
  } catch (e: any) {
    console.log('error: ', e);
    throw new Error(e.message);
  }
};

const LearningReactQuery = () => {
  const onSuccess = (data: SuperHeroProps[]) => {
    console.log('the query is fetched: ', data);
  };

  const onError = (error: any) => {
    console.log('the query is error', error);
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<SuperHeroProps[]>('super-heroes', fetchSuperHeroes, {
    // enabled: false,
    onSuccess,
    onError,
  });

  console.log(JSON.stringify({isLoading, isFetching}));

  if (isError) {
    return (
      <SafeAreaView>
        <Text>{error.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <TouchableOpacity
        onPress={() => refetch()}
        style={{
          backgroundColor: 'blue',
          width: 150,
          height: 50,
        }}>
        <Text>Fetch</Text>
      </TouchableOpacity>
      {isLoading ? (
        <Text
          style={{
            fontSize: 50,
          }}>
          Loading...
        </Text>
      ) : (
        <View>
          {posts?.map(item => (
            <View
              key={item.id}
              style={{
                backgroundColor: 'red',
                height: 50,
                marginVertical: 8,
              }}>
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default LearningReactQuery;

const styles = StyleSheet.create({});
