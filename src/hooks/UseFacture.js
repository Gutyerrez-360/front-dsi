
import { useInfiniteQuery } from '@tanstack/react-query';
import { Facture } from "../api/facture.api"

const factureController = new Facture();

export function useFacture({ accessToken }) {
  let totalFacture = 0;
  const result = useInfiniteQuery({
    queryKey: ['facture'],
    queryFn: async ({ pageParam = 1 }) => {
      const data = await factureController.getAllFacture(
        accessToken,
        pageParam,
      );
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNextPage) return;

      return lastPage.nextPage;
    },
  });

  const facture =
    result.data?.pages.reduce((prevFacture, page) => {
       totalFacture = page.totalItems;
      return prevFacture.concat(page.data);
    }, []) ?? [];

  return {
    ...result,
    facture,
    totalFacture,
  };
}