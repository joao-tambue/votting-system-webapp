import React, { useState, useMemo } from "react";
import Layout from "../components/Layout";
import RankingCard from "../components/RankingCard";
import { useParams } from "react-router-dom";
import {
  Trophy,
  Medal,
  Award,
  AlertCircle,
} from "lucide-react";
import {
  NormalizedProject,
  normalizeRankingData,
} from "../services/normalization/normalize-ranking-data";
import { useTrackVotesRaking } from "../services/get-ranking-api";
import LoadingOverlay from "../components/LoadingOverlay";

const Podium: React.FC<{ projects: NormalizedProject[] }> = ({ projects }) => (
  <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
    <h3 className="text-lg font-bold text-center mb-4">🏆 Pódio</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
      {projects[1] && (
        <div className="order-1">
          <div className="bg-white bg-opacity-20 p-3 rounded-xl">
            <Medal size={20} className="mx-auto mb-1" />
            <p className="font-medium text-sm">2º Lugar</p>
            <p className="text-xs truncate max-w-[200px] mx-auto" title={projects[1].name}>
              {projects[1].name}
            </p>
            <p className="text-xs">{projects[1].votes} votos</p>
          </div>
        </div>
      )}
      <div className="order-2">
        <div className="bg-white bg-opacity-30 p-3 rounded-xl transform scale-110">
          <Trophy size={24} className="mx-auto mb-1" />
          <p className="font-bold text-sm">1º Lugar</p>
          <p className="text-xs truncate max-w-[200px] mx-auto" title={projects[0].name}>
            {projects[0].name}
          </p>
          <p className="text-xs font-bold">{projects[0].votes} votos</p>
        </div>
      </div>
      {projects[2] && (
        <div className="order-3">
          <div className="bg-white bg-opacity-20 p-3 rounded-xl">
            <Award size={20} className="mx-auto mb-1" />
            <p className="font-medium text-sm">3º Lugar</p>
            <p className="text-xs truncate max-w-[200px] mx-auto" title={projects[2].name}>
              {projects[2].name}
            </p>
            <p className="text-xs">{projects[2].votes} votos</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

const RankingPage: React.FC = () => {
  const { activityId: activityIdParam } = useParams<{ activityId: string }>();
  const activityId = activityIdParam ? Number(activityIdParam) : undefined;

  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("");

  const { data: rawRankingData, isLoading } = useTrackVotesRaking(activityId);

  const normalizedProjects = useMemo<NormalizedProject[]>(
    () => normalizeRankingData(rawRankingData || []),
    [rawRankingData]
  );

  const categorizedProjectsMap = useMemo(() => {
    const map = new Map<string, NormalizedProject[]>();
    normalizedProjects.forEach((project) => {
      const key = project?.subcategory
        ? `${project.category} - ${project.subcategory}`
        : project.category;
      if (!map.has(key)) map.set(key, []);
      map.get(key)?.push(project);
    });
    return map;
  }, [normalizedProjects]);

  const categoryKeys = useMemo(
    () => Array.from(categorizedProjectsMap.keys()),
    [categorizedProjectsMap]
  );

  const resolvedCategoryKey = activeCategoryKey || categoryKeys[0] || "";

  const activeProjects = useMemo<NormalizedProject[]>(() => {
    const projects = categorizedProjectsMap.get(resolvedCategoryKey) || [];
    return [...projects].sort((a, b) => b.votes - a.votes);
  }, [categorizedProjectsMap, resolvedCategoryKey]);

  if (!activityId || isNaN(activityId)) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 mt-[70px]">
          <AlertCircle size={40} className="text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-800">Atividade inválida</h2>
          <p className="text-gray-500 text-sm text-center max-w-xs">
            Acede a uma atividade a partir da página inicial para ver o seu ranking.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="space-y-12 mt-[70px]">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2">
              <Trophy size={24} className="text-yellow-500" />
              <h1 className="text-2xl font-bold">Ranking de Projetos</h1>
            </div>
            <p className="text-gray-500 text-sm">
              Veja os mais votados por categoria
            </p>
          </div>

          {/* Category tabs */}
          {categoryKeys.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {categoryKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveCategoryKey(key)}
                  className={`px-4 py-2 rounded-full font-semibold transition ${
                    resolvedCategoryKey === key
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-6">
            {resolvedCategoryKey && (
              <h2 className="text-xl font-bold text-gray-800">
                {resolvedCategoryKey}
              </h2>
            )}

            {activeProjects.length > 0 && <Podium projects={activeProjects} />}

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800">
                Classificação Completa
              </h3>
              {activeProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeProjects.map((ranking, idx) => (
                    <RankingCard
                      key={`${ranking.id}-${idx}`}
                      ranking={ranking}
                      position={idx + 1}
                    />
                  ))}
                </div>
              ) : (
                !isLoading && (
                  <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                    <Trophy size={28} className="mx-auto text-gray-400 mb-2" />
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Nada por aqui
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Nenhum projeto encontrado nesta categoria.
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </Layout>

      <LoadingOverlay isVisible={isLoading} />
    </>
  );
};

export default RankingPage;