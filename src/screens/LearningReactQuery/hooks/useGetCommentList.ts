import {useQuery} from 'react-query';
import {Comment} from '~models';
import {queryClient} from '~navigations/RootNavigation';

export const COMMENT_LIST_RQ_KEY = 'comment-list';

const getComment = async (): Promise<Array<Comment>> => {
  const res = await fetch('http://localhost:4040/comments');
  const data = await res.json();
  return data;
};

export const useGetCommentList = () =>
  useQuery<Comment[]>(COMMENT_LIST_RQ_KEY, getComment);
