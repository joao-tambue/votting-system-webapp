import React from 'react';
import { projects } from '../data/mockData';
import RankingCard from '../components/RankingCard';
import Layout from '../components/Layout';
import { Trophy, Medal, Award } from 'lucide-react';

const RankingPage: React.FC = () => {
  const sortedProjects = [...projects].sort((a, b) => b.votes - a.votes);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Trophy size={24} className="text-yellow-500" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Ranking</h2>
          </div>
          <p className="text-gray-600">Projetos mais votados</p>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg md:text-xl font-bold text-center mb-4">🏆 Pódio dos Vencedores 🏆</h3>
          
          <div className="grid grid-cols-3 gap-2 md:gap-4 text-center">
            {/* Second Place */}
            <div className="order-1">
              <div className="bg-white bg-opacity-20 rounded-xl p-2 md:p-3">
                <Medal size={20} className="mx-auto mb-1" />
                <p className="text-xs font-medium">2º Lugar</p>
                <p className="text-xs truncate">{sortedProjects[1]?.name}</p>
                <p className="text-xs">{sortedProjects[1]?.votes} votos</p>
              </div>
            </div>
            
            {/* First Place */}
            <div className="order-2">
              <div className="bg-white bg-opacity-30 rounded-xl p-2 md:p-3 transform scale-110">
                <Trophy size={24} className="mx-auto mb-1" />
                <p className="text-xs font-bold">1º Lugar</p>
                <p className="text-xs truncate font-medium">{sortedProjects[0]?.name}</p>
                <p className="text-xs font-bold">{sortedProjects[0]?.votes} votos</p>
              </div>
            </div>
            
            {/* Third Place */}
            <div className="order-3">
              <div className="bg-white bg-opacity-20 rounded-xl p-2 md:p-3">
                <Award size={20} className="mx-auto mb-1" />
                <p className="text-xs font-medium">3º Lugar</p>
                <p className="text-xs truncate">{sortedProjects[2]?.name}</p>
                <p className="text-xs">{sortedProjects[2]?.votes} votos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Full Ranking */}
        <div className="space-y-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Classificação Completa</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {sortedProjects.map((project, index) => (
              <RankingCard
                key={project.id}
                project={project}
                position={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RankingPage;