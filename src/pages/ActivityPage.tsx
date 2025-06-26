import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import CategoryCard from '../components/CategoryCard';
import Layout from '../components/Layout';
import { ArrowLeft } from 'lucide-react';

const ActivityPage: React.FC = () => {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const activityCategories = categories.filter(cat => cat.activityId === activityId);

  const handleCategoryClick = (category: any) => {
    if (category.hasSubcategories) {
      navigate(`/category/${category.id}/subcategories`);
    } else {
      navigate(`/category/${category.id}/projects`);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Categorias</h2>
            <p className="text-sm text-gray-600">Selecione uma categoria</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {activityCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ActivityPage;