import { api } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ActivityModel } from "../models/activities.model";
import { ExtractFnReturnType } from "../lib/react-query";

const activityQueryKeys = {
  getActivities: () => ["activities"],
};

export async function getActivitiesApi(): Promise<ActivityModel[]> {
  const response = await api.get<ActivityModel[]>("/api/get-activities");

  console.log("RESPOSTAS DA api", response.data);

  return response.data;
}

type QueryFnType = typeof getActivitiesApi;

export function useActivities() {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: activityQueryKeys.getActivities(),
    queryFn: getActivitiesApi,
  });
}
