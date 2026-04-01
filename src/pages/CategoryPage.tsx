import React from "react";
import Layout from "../components/Layout";
import CategoryCard from "../components/CategoryCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useActivityStore } from "../stores/activities-store";
import { useCategoriesStore } from "../stores/categories-store";
import { useCategories } from "../services/get-categories-api";
import { CategoryModel } from "../models/category.model";
import LoadingOverlay from "../components/LoadingOverlay";

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: activityId, name: activityName } = useActivityStore();
  const { setCategoryData } = useCategoriesStore();

  const { data: categories, isLoading } = useCategories(activityId);

  const handleCategoryClick = (category: CategoryModel) => {
    setCategoryData(category);

    if (category.subcategories && category.subcategories.length > 0) {
      navigate(`/category/${category.id}/subcategories`);
    } else {
      navigate(`/category/${category.category_type}/${category.id}/projects`);
    }
  };

  return (
    <>
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
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {activityName}
              </h2>
              <p className="text-sm text-gray-600">Selecione uma categoria</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleCategoryClick(category)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">Nenhuma categoria encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>

      <LoadingOverlay isVisible={isLoading} />
    </>
  );
};

export default CategoryPage;