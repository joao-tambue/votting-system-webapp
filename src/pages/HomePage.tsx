import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import { useActivities } from "../services/get-activities-api";
import { useActivityStore } from "../stores/activities-store";
import { ActivityModel } from "../models/activities.model";
import { Calendar, ChevronRight } from "lucide-react";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setActivityData } = useActivityStore();
  const { data: activities, isLoading } = useActivities();

  const handleActivityClick = (activity: ActivityModel) => {
    setActivityData(activity);
    navigate(`/activity/${activity.id}/categories`);
  };

  return (
    <>
      <Layout>
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Atividades
            </h2>
            <p className="text-gray-600">
              Selecione uma atividade para ver as categorias e votar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {activities && activities.length > 0 ? (
              activities.map((activity) => (
                <div
                  key={activity.id}
                  onClick={() => handleActivityClick(activity)}
                  className="bg-white rounded-xl shadow-md p-5 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 border-l-4 border-purple-500"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Calendar size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {activity.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.categories?.length ?? 0} categorias
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400 mt-1" />
                  </div>

                  {activity.description && (
                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                      {activity.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        activity.finished
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {activity.finished ? "Encerrada" : "Em curso"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">Nenhuma atividade encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>

      <LoadingOverlay isVisible={isLoading} />
    </>
  );
};

export default HomePage;
