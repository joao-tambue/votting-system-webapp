// CategoryPage.tsx
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

const EmptyState: React.FC = () => (
  <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-4">
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-300"
    >
      <rect
        x="8"
        y="16"
        width="36"
        height="28"
        rx="6"
        fill="currentColor"
        opacity="0.35"
      />
      <rect
        x="52"
        y="16"
        width="36"
        height="28"
        rx="6"
        fill="currentColor"
        opacity="0.25"
      />
      <rect
        x="8"
        y="52"
        width="36"
        height="28"
        rx="6"
        fill="currentColor"
        opacity="0.2"
      />
      <rect
        x="52"
        y="52"
        width="36"
        height="28"
        rx="6"
        fill="currentColor"
        opacity="0.15"
      />
      <rect
        x="16"
        y="24"
        width="20"
        height="3"
        rx="1.5"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="16"
        y="30"
        width="14"
        height="3"
        rx="1.5"
        fill="currentColor"
        opacity="0.35"
      />
      <rect
        x="60"
        y="24"
        width="20"
        height="3"
        rx="1.5"
        fill="currentColor"
        opacity="0.4"
      />
      <rect
        x="60"
        y="30"
        width="14"
        height="3"
        rx="1.5"
        fill="currentColor"
        opacity="0.25"
      />
    </svg>
    <div className="text-center">
      <p className="text-gray-700 font-semibold text-base">
        Nenhuma categoria disponível
      </p>
      <p className="text-gray-400 text-sm mt-1">
        Esta atividade ainda não tem categorias configuradas.
      </p>
    </div>
  </div>
);

const CategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: activityId, name: activityName } = useActivityStore();
  const { setCategoryData } = useCategoriesStore();

  const { data: categories, isLoading } = useCategories(activityId);

  const handleCategoryClick = (category: CategoryModel) => {
    setCategoryData(category);
    navigate(`/category/${category.id}/subcategories`);
  };

  const hasCategories = categories && categories.length > 0;

  return (
    <>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors
                flex items-center justify-center shrink-0"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-gray-900 truncate">
                {activityName}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Selecione uma categoria para votar
              </p>
            </div>
          </div>

          {/* Count */}
          {hasCategories && (
            <p className="text-xs text-gray-400 font-medium">
              {categories.length}{" "}
              {categories.length === 1 ? "categoria" : "categorias"}
            </p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {hasCategories
              ? categories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => handleCategoryClick(category)}
                  />
                ))
              : !isLoading && <EmptyState />}
          </div>
        </div>
      </Layout>

      <LoadingOverlay isVisible={isLoading} />
    </>
  );
};

export default CategoryPage;
