import React from 'react';
import {Button, FlatList, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SIZES} from '~constants';
import {Comment} from '~models';
import {queryClient} from '~navigations/RootNavigation';
import {useAddComment} from './hooks/useAddComment';
import {
  COMMENT_LIST_RQ_KEY,
  useGetCommentList,
} from './hooks/useGetCommentList';

const LearningUseMutation = () => {
  const {data: commentList, isFetching} = useGetCommentList();
  const addCommentMutation = useAddComment();

  const handleAddComment = () => {
    console.log('addComment');
    const timestamp = new Date().getTime();
    const newComment: Comment = {
      id: timestamp,
      body: 'new comment ' + timestamp,
    };
    addCommentMutation.mutate(newComment);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>this is LearningUseMutation</Text>
      <TextInput
        style={{
          height: 40,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: '#CCC',
          marginHorizontal: SIZES.spacing_8_horizontal,
          paddingHorizontal: SIZES.spacing_8_horizontal,
        }}
      />
      <Button title={'add comment'} onPress={handleAddComment} />
      <FlatList
        style={{
          flex: 1,
          backgroundColor: 'gray',
        }}
        data={commentList}
        keyExtractor={item =>
          item.id?.toString() || new Date().getTime().toString()
        }
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.body}</Text>
            </View>
          );
        }}
      />
      {isFetching ? <Text>fetching...</Text> : null}
      {addCommentMutation.isLoading ? <Text>loading...</Text> : null}
    </SafeAreaView>
  );
};

export default LearningUseMutation;
