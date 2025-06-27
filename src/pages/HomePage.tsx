import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { CategoryModel } from "../models/category.model";
import LoadingOverlay from "../components/LoadingOverlay";
import { useCategories } from "../services/get-categories-api";
import { useCategoriesStore } from "../stores/categories-store";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { setCategoryData } = useCategoriesStore();
  const { data: categories, isLoading: LoadingCategories } = useCategories();

  const handleContentRender = (category: CategoryModel) => {
    if (category.subcategories.length > 0) {
      setCategoryData(category);
      navigate(`/category/${category.id}/subcategories`);

      return;
    }

    setCategoryData(category);
    navigate(`/category/${category.category_type}/${category.id}/projects`);
  };

  return (
    <>
      <Layout>
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Escolha uma Categoria
            </h2>
            <p className="text-gray-600">
              Selecione uma categoria para ver os projetos e votar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onClick={() => handleContentRender(category)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhuma categoria encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>

      <LoadingOverlay isVisible={LoadingCategories} />
    </>
  );
};

export default HomePage;
