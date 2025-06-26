import React from "react";
import Layout from "../components/Layout";
import { activities } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import ActivityCard from "../components/ActivityCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleActivityClick = (activityId: string) => {
    navigate(`/activity/${activityId}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Escolha uma Atividade
          </h2>
          <p className="text-gray-600">
            Selecione uma atividade para ver os projetos e votar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => handleActivityClick(activity.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
