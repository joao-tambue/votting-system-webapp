import React from "react";
import { Crown, Medal, Award, Heart, User, Building2, Users } from "lucide-react";
import { NormalizedProject } from "../services/normalization/normalize-ranking-data";

interface RankingCardProps {
  ranking: NormalizedProject;
  position: number;
}

const RankingCard: React.FC<RankingCardProps> = ({ ranking, position }) => {
  const getRankIcon = () => {
    switch (position) {
      case 1: return <Crown size={24} className="text-yellow-500" />;
      case 2: return <Medal size={24} className="text-gray-400" />;
      case 3: return <Award size={24} className="text-amber-600" />;
      default: return <span className="text-lg font-bold text-gray-600">#{position}</span>;
    }
  };

  const getRankStyle = () => {
    switch (position) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-xl scale-105";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-lg";
      case 3: return "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg";
      default: return "bg-white border-2 border-gray-200";
    }
  };

  const isTop3 = position <= 3;

  const typeLabel =
    ranking.type === "stand" ? "Stand" :
    ranking.type === "project" ? "Projeto" : "Expositor";

  return (
    <div className={`rounded-2xl p-6 transform transition-all duration-200 ${getRankStyle()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getRankIcon()}
          <div className="flex items-center space-x-2">
            {ranking.type === "stand" ? (
              <Building2 size={16} className={isTop3 ? "text-white" : "text-orange-500"} />
            ) : ranking.type === "project" ? (
              <Users size={16} className={isTop3 ? "text-white" : "text-green-500"} />
            ) : (
              <User size={16} className={isTop3 ? "text-white" : "text-blue-500"} />
            )}
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isTop3
                ? "bg-white bg-opacity-20 text-white"
                : ranking.type === "stand"
                ? "bg-orange-100 text-orange-600"
                : ranking.type === "project"
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600"
            }`}>
              {typeLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Heart size={16} className={isTop3 ? "text-white" : "text-red-500"} />
          <span className={`font-bold ${isTop3 ? "text-white" : "text-gray-700"}`}>
            {ranking.votes}
          </span>
        </div>
      </div>

      <h3 className={`text-lg font-bold mb-2 ${isTop3 ? "text-white" : "text-gray-800"}`}>
        {ranking.name}
      </h3>

      {ranking.description && (
        <p className={`text-sm mb-3 ${isTop3 ? "text-white text-opacity-90" : "text-gray-600"}`}>
          {ranking.description}
        </p>
      )}

      {/* Dados de membro individual */}
      {ranking.type === "member" && (
        <div className="space-y-1">
          {ranking.course && (
            <p className={`text-xs ${isTop3 ? "text-white text-opacity-80" : "text-gray-500"}`}>
              {ranking.course}
            </p>
          )}
          {ranking.class && (
            <p className={`text-xs ${isTop3 ? "text-white text-opacity-80" : "text-gray-500"}`}>
              {ranking.class}
            </p>
          )}
        </div>
      )}

      {/* Membros do projeto (dados do 2º endpoint) */}
      {ranking.type === "project" && ranking.members && ranking.members.length > 0 && (
        <div className={`mt-3 pt-3 border-t ${isTop3 ? "border-white border-opacity-30" : "border-gray-200"}`}>
          <p className={`text-xs font-semibold mb-2 ${isTop3 ? "text-white text-opacity-80" : "text-gray-500"}`}>
            Membros
          </p>
          <div className="space-y-1">
            {ranking.members.map((member, i) => (
              <div key={i} className="flex items-center justify-between">
                <p className={`text-xs ${isTop3 ? "text-white" : "text-gray-700"}`}>
                  {member.name}
                </p>
                <p className={`text-xs ${isTop3 ? "text-white text-opacity-70" : "text-gray-400"}`}>
                  {member.classe} · {member.turma}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RankingCard;
