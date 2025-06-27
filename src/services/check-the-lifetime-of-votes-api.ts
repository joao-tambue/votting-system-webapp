import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ExtractFnReturnType } from "../lib/react-query";
import { categoryQueryKeys } from "../constants/query-keys";
import { DEFAULT_ACTIVITY_ID } from "../constants/constants";

export async function checkTheLifetimeOfVotesApi() {
  const response = await api.get<{ is_fetched: boolean }>(
    `/api/verify-activity/${DEFAULT_ACTIVITY_ID}`
  );
  return response.data;
}

type QueryFnType = typeof checkTheLifetimeOfVotesApi;

export function useCheckVotesLifetime() {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: categoryQueryKeys.getVotesLifetime(Number(DEFAULT_ACTIVITY_ID)),
    queryFn: () => checkTheLifetimeOfVotesApi(),
    refetchOnWindowFocus: true,
    refetchInterval: 60000,
  });
}
