import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/mockData';
import Layout from '../components/Layout';
import { ArrowLeft, Layers } from 'lucide-react';

const SubcategoriesPage: React.FC = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = categories.find(cat => cat.id === categoryId);
  const subcategories = category?.subcategories || [];

  const handleSubcategoryClick = (subcategoryId: string) => {
    navigate(`/subcategory/${subcategoryId}/projects`);
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
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">{category?.name}</h2>
            <p className="text-sm text-gray-600">Selecione uma subcategoria</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {subcategories.map((subcategory) => (
            <div
              key={subcategory.id}
              onClick={() => handleSubcategoryClick(subcategory.id)}
              className="bg-white rounded-xl shadow-md p-4 cursor-pointer transform transition-all duration-200 hover:scale-102 hover:shadow-lg active:scale-98 border-l-4 border-blue-500"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Layers size={20} className="text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-800">{subcategory.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SubcategoriesPage;