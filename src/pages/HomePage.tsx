import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import { useActivities } from "../services/get-activities-api";
import { useActivityStore } from "../stores/activities-store";
import { ActivityModel } from "../models/activities.model";
import ActivityCard from "../components/ActivityCard";
import EmptyState from "../components/ActivitieEmptyState";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setActivityData } = useActivityStore();
  const { data: activities, isLoading } = useActivities();

  const handleActivityClick = (activity: ActivityModel) => {
    setActivityData(activity);
    navigate(`/activity/${activity.id}/categories`);
  };

  const hasActivities = activities && activities.length > 0;

  return (
    <>
      <Layout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Atividades</h2>
            <p className="text-sm text-gray-500 mt-1">
              Selecione uma atividade para ver as categorias e votar
            </p>
          </div>

          {hasActivities && (
            <p className="text-xs text-gray-400 font-medium">
              {activities.length}{" "}
              {activities.length === 1
                ? "atividade encontrada"
                : "atividades encontradas"}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {hasActivities
              ? activities.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    onClick={() => handleActivityClick(activity)}
                  />
                ))
              : !isLoading && <EmptyState />}
          </div>
        </div>
      </Layout>

      <LoadingOverlay isVisible={isLoading} />
    </>
  );
};

export default HomePage;
