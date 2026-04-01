import React from "react";
import { ArrowLeft } from "lucide-react";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import { useParams, useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
import { CategoryTypeModel } from "../models/category.model";
import { useCategoriesStore } from "../stores/categories-store";
import { useActivityStore } from "../stores/activities-store";
import { useItemsFromCategories } from "../services/get-category-items-api";

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { categoryType, subcategoryId } = useParams();

  const { id: globalCategoryId } = useCategoriesStore();
  const { id: activityId } = useActivityStore();

  const { data, isLoading: loadingItemsFromCategory } = useItemsFromCategories(
    activityId,
    globalCategoryId,
    Number(subcategoryId),
    categoryType as CategoryTypeModel,
  );

  console.log("Items data:", data);
  

  const canStillVote = Array.isArray(data) && !data.some((item) => item.has_voted === true);

  console.log("canStillVote:", canStillVote);

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
                Items
              </h2>
              <p className="text-sm text-gray-600">
                {data && data.length} items encontrados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data && data.length > 0 ? (
              data.map((item) => (
                <ProjectCard
                  activityId={activityId}
                  categoryId={globalCategoryId}
                  subCategoryId={Number(subcategoryId)}
                  categoryType={categoryType as CategoryTypeModel}
                  ableToVote={canStillVote}
                  key={item.id}
                  item={{
                    ...item,
                    type: categoryType as CategoryTypeModel,
                  }}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500">
                  Nenhum projeto encontrado nesta categoria.
                </p>
              </div>
            )}
          </div>
        </div>
      </Layout>

      <LoadingOverlay isVisible={loadingItemsFromCategory} />
    </>
  );
};

export default ProjectsPage;