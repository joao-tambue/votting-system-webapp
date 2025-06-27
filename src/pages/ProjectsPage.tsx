import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { projects } from '../data/mockData';
import ProjectCard from '../components/ProjectCard';
import Layout from '../components/Layout';
import { ArrowLeft } from 'lucide-react';

const ProjectsPage: React.FC = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState(projects);

  const filteredProjects = projectList.filter(project => {
    if (subcategoryId) {
      return project.subcategoryId === subcategoryId;
    }
    return project.categoryId === categoryId;
  });

  const handleProjectView = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Projetos</h2>
            <p className="text-sm text-gray-600">{filteredProjects.length} projetos encontrados</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onView={() => handleProjectView(project.id)}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            
            <p className="text-gray-500">Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectsPage;