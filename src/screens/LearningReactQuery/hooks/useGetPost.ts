import { useInfiniteQuery } from "react-query";

const fetchPosts = async (pageParam: number) => {
  console.log("fetchPosts page: ", pageParam);
  const result = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${pageParam}&size=10`);
  const results = await result.json();
  return {
    data: results.data,
    nextPage: pageParam + 1,
    totalPages: 5,
  };
};

export const useGetPost = () =>
  useInfiniteQuery("posts", async ({ pageParam = 1 }) => fetchPosts(pageParam), {
    getNextPageParam: (lastPage) => (lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : false),
    keepPreviousData: true,
  });
