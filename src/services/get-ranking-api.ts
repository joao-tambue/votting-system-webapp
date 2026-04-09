import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ItemScore, SubcategoryProject } from "../models/ranking.model";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";

export async function getRankingApi(activityId: number) {
  const response = await api.get<ItemScore[]>(
    `/api/public-rankings/${activityId}`
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

export function useTrackVotesRaking(activityId?: number) {
  return useQuery<ExtractFnReturnType<RankingQueryFnType>>({
    queryKey: categoryQueryKeys.getPublicRankings(activityId),
    queryFn: () => getRankingApi(activityId!),
    enabled: activityId != null && !isNaN(activityId),
  });
}

export function useSubcategoryProjectsRanking(subcategoryId: number | null) {
  return useQuery<ExtractFnReturnType<SubcategoryQueryFnType>>({
    queryKey: categoryQueryKeys.getSubcategoryProjects(subcategoryId!),
    queryFn: () => getSubcategoryProjectsRanking(subcategoryId!),
    enabled: subcategoryId != null && !isNaN(subcategoryId),
  });
}