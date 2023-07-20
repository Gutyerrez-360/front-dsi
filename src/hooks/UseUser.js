import { useInfiniteQuery } from '@tanstack/react-query';
import { User } from '../api/User.api';

const userController = new User();

export function useUser({ accessToken }) {
  const result = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await userController.getAllUsers(accessToken, pageParam);
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return;

      return lastPage.nextPage;
    },
  });

  const users =
    result.data?.pages.reduce((prevUsers, page) => {
      return prevUsers.concat(page.data);
    }, []) ?? [];

  return {
    ...result,
    users,
  };
}