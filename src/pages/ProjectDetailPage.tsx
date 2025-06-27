import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/mockData';
import Layout from '../components/Layout';
import { ArrowLeft, Heart, User, GraduationCap, Building2, Calendar, MapPin } from 'lucide-react';

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState(projects);

  const project = projectList.find(p => p.id === projectId);

  if (!project) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500">Projeto não foi encontrado.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Voltar
          </button>
        </div>
      </Layout>
    );
  }

  const handleVote = () => {
    setProjectList(prev => prev.map(p => 
      p.id === projectId 
        ? { ...p, votes: p.votes + 1, hasVoted: true }
        : p
    ));
  };

  const updatedProject = projectList.find(p => p.id === projectId)!;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Detalhes do Projeto</h2>
            <p className="text-sm text-gray-600">Informações completas</p>
          </div>
        </div>

        {/* Project Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image for stands */}
          {project.type === 'stand' && project.image && (
            <div className="relative">
              <img 
                src={project.image} 
                alt={project.name}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2">
                  <Building2 size={16} />
                  <span>Stand Empresarial</span>
                </span>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Project type badge for expositors */}
            {project.type === 'expositor' && (
              <div className="mb-4">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-2 w-fit">
                  <User size={16} />
                  <span>Expositor</span>
                </span>
              </div>
            )}

            {/* Title and votes */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 md:mb-0">
                {project.name}
              </h1>
              <div className="flex items-center space-x-2 text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                <Heart size={20} className="text-red-500" />
                <span className="font-semibold text-lg">{updatedProject.votes}</span>
                <span className="text-sm">votos</span>
              </div>
            </div>

            {/* Course and class info for expositors */}
            {project.type === 'expositor' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <GraduationCap size={20} className="text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Curso</p>
                    <p className="font-semibold text-gray-800">{project.course}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-5 h-5 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-600">Turma</p>
                    <p className="font-semibold text-gray-800">{project.class}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Descrição</h3>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {project.description}
              </p>
            </div>

            {/* Additional info for stands */}
            {project.type === 'stand' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                  <MapPin size={20} className="text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Localização</p>
                    <p className="font-semibold text-gray-800">Pavilhão Principal</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <Calendar size={20} className="text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Horário</p>
                    <p className="font-semibold text-gray-800">8h às 17h</p>
                  </div>
                </div>
              </div>
            )}

            {/* Vote button */}
            <div className="flex justify-center">
              <button
                onClick={handleVote}
                disabled={updatedProject.hasVoted}
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 transform ${
                  updatedProject.hasVoted
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : project.type === 'stand'
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                      : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                } w-full md:w-auto`}
              >
                {updatedProject.hasVoted ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Heart size={20} />
                    <span>Voto Registrado!</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center space-x-2">
                    <Heart size={20} />
                    <span>Votar neste Projeto</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetailPage;