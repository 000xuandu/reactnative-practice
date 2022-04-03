import { useMutation } from "react-query";
import { Comment } from "~models";
import { queryClient } from "~navigations/RootNavigation";
import { COMMENT_LIST_RQ_KEY } from "./useGetCommentList";

const addComment = (newComment: Comment): Promise<any> =>
  fetch("http://localhost:4040/comments", {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export const useAddComment = () =>
  useMutation(addComment, {
    onMutate: async (newComment) => {
      await queryClient.cancelQueries(COMMENT_LIST_RQ_KEY);

      const previousValue = queryClient.getQueryData(COMMENT_LIST_RQ_KEY);
      console.log("prev: ", newComment);

      queryClient.setQueryData<Array<Comment>>(COMMENT_LIST_RQ_KEY, (old) => {
        const newArray = Object.assign([], old);
        newArray.push(newComment);
        return newArray;
      });
      return previousValue;
    },
    onSettled: () => {
      queryClient.invalidateQueries(COMMENT_LIST_RQ_KEY);
    },
  });
