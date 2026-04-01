import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ItemScore, SubcategoryProject } from "../models/ranking.model";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";
import { DEFAULT_ACTIVITY_ID } from "../constants/constants";

export async function getRankingApi() {
  const response = await api.get<ItemScore[]>(
    `/api/public-rankings/${DEFAULT_ACTIVITY_ID}`
  );
  return response.data;
}

export async function getSubcategoryProjectsRanking(subcategoryId: number) {
  const response = await api.get<SubcategoryProject[]>(
    `/api/subcategoryProjectsRanking/${subcategoryId}/`
  );
  return response.data;
}

type RankingQueryFnType = typeof getRankingApi;
type SubcategoryQueryFnType = typeof getSubcategoryProjectsRanking;

export function useTrackVotesRaking() {
  return useQuery<ExtractFnReturnType<RankingQueryFnType>>({
    queryKey: categoryQueryKeys.getCategories(),
    queryFn: () => getRankingApi(),
  });
}

export function useSubcategoryProjectsRanking(subcategoryId: number | null) {
  return useQuery<ExtractFnReturnType<SubcategoryQueryFnType>>({
    queryKey: categoryQueryKeys.getSubcategoryProjects(subcategoryId!),
    queryFn: () => getSubcategoryProjectsRanking(subcategoryId!),
    enabled: subcategoryId !== null,
  });
}