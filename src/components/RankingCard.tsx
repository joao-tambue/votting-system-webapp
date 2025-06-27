import React from "react";
import { Crown, Medal, Award, Heart, User, Building2 } from "lucide-react";
import { NormalizedProject } from "../services/normalization/normalize-ranking-data";

interface RankingCardProps {
  ranking: NormalizedProject;
  position: number;
}

const RankingCard: React.FC<RankingCardProps> = ({ ranking, position }) => {
  const getRankIcon = () => {
    switch (position) {
      case 1:
        return <Crown size={24} className="text-yellow-500" />;
      case 2:
        return <Medal size={24} className="text-gray-400" />;
      case 3:
        return <Award size={24} className="text-amber-600" />;
      default:
        return (
          <span className="text-lg font-bold text-gray-600">#{position}</span>
        );
    }
  };

  const getRankStyle = () => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-xl scale-105";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white shadow-lg";
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg";
      default:
        return "bg-white border-2 border-gray-200";
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 transform transition-all duration-200 ${getRankStyle()}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getRankIcon()}
          <div className="flex items-center space-x-2">
            {ranking.type === "stand" ? (
              <Building2
                size={16}
                className={position <= 3 ? "text-white" : "text-orange-500"}
              />
            ) : (
              <User
                size={16}
                className={position <= 3 ? "text-white" : "text-blue-500"}
              />
            )}
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                position <= 3
                  ? "bg-white bg-opacity-20 text-white"
                  : ranking.type === "stand"
                  ? "bg-orange-100 text-orange-600"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              {ranking.type === "stand" ? "Stand" : "Expositor"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Heart
            size={16}
            className={position <= 3 ? "text-white" : "text-red-500"}
          />
          <span
            className={`font-bold ${
              position <= 3 ? "text-white" : "text-gray-700"
            }`}
          >
            {ranking.votes}
          </span>
        </div>
      </div>

      <h3
        className={`text-lg font-bold mb-2 ${
          position <= 3 ? "text-white" : "text-gray-800"
        }`}
      >
        {ranking.name}
      </h3>

      {/* <p
        className={`text-sm mb-3 ${
          position <= 3 ? "text-white text-opacity-90" : "text-gray-600"
        }`}
      >
        {ranking.description}
      </p> */}

      {ranking.type === "member" && (
        <div className="space-y-1">
          <p
            className={`text-xs ${
              position <= 3 ? "text-white text-opacity-80" : "text-gray-500"
            }`}
          >
            {ranking.course}
          </p>
          <p
            className={`text-xs ${
              position <= 3 ? "text-white text-opacity-80" : "text-gray-500"
            }`}
          >
            {ranking.class}
          </p>
        </div>
      )}
    </div>
  );
};

export default RankingCard;
