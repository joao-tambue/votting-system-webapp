import React, { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [page, setPage] = useState(1);

  const { id: globalCategoryId } = useCategoriesStore();
  const { id: activityId } = useActivityStore();

  const { data, isLoading: loadingItemsFromCategory } = useItemsFromCategories(
    activityId,
    globalCategoryId,
    Number(subcategoryId),
    categoryType as CategoryTypeModel,
    page
  );

  const items = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const hasNext = !!data?.next;
  const hasPrevious = !!data?.previous;
  const totalPages = Math.ceil(totalCount / 10);

  const hasNotVotedYet = items.length > 0 && !items.some((item) => item.has_voted === true);
  const ableToVote = hasNotVotedYet;

  return (
    <>
      <Layout>
        <div className="space-y-6 mt-[70px]">
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
                {totalCount} items encontrados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {items.length > 0 ? (
              items.map((item) => (
                <ProjectCard
                  activityId={activityId}
                  categoryId={globalCategoryId}
                  subCategoryId={Number(subcategoryId)}
                  categoryType={categoryType as CategoryTypeModel}
                  ableToVote={ableToVote}
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

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 py-4">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={!hasPrevious}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>

              <span className="text-sm text-gray-600 font-medium">
                Página {page} de {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!hasNext}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </Layout>

      <LoadingOverlay isVisible={loadingItemsFromCategory} />
    </>
  );
};

export default ProjectsPage;