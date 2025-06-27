import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ItemScore } from "../models/ranking.model";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";
import { DEFAULT_ACTIVITY_ID } from "../constants/constants";

export async function getRankingApi() {
  const response = await api.get<ItemScore[]>(
    `/api/public-rankings/${DEFAULT_ACTIVITY_ID}`
  );
  return response.data;
}

type QueryFnType = typeof getRankingApi;

export function useTrackVotesRaking() {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getCategories(),
    queryFn: () => getRankingApi(),
  });
}
