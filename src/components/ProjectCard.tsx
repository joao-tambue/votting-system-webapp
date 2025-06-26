import React from 'react';
import { Project } from '../types';
import { Heart, User, GraduationCap, Building2, Eye } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onView: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView }) => {
  if (project.type === 'stand') {
    return (
      <div 
        onClick={onView}
        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
      >
        {project.image && (
          <img 
            src={project.image} 
            alt={project.name}
            className="w-full h-48 object-cover"
          />
        )}
        
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Building2 size={20} className="text-orange-500" />
            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              Stand Empresarial
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{project.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-500">
              <Heart size={16} />
              <span className="text-sm font-medium">{project.votes} votos</span>
            </div>
            
            <div className="flex items-center space-x-2 text-blue-600">
              <Eye size={16} />
              <span className="text-sm font-medium">Ver detalhes</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onView}
      className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
    >
      <div className="flex items-center space-x-2 mb-3">
        <User size={20} className="text-blue-500" />
        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          Expositor
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{project.description}</p>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <GraduationCap size={16} />
          <span>{project.course}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span className="w-4 h-4 bg-green-500 rounded-full"></span>
          <span>{project.class}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-500">
          <Heart size={16} />
          <span className="text-sm font-medium">{project.votes} votos</span>
        </div>
        
        <div className="flex items-center space-x-2 text-blue-600">
          <Eye size={16} />
          <span className="text-sm font-medium">Ver detalhes</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;