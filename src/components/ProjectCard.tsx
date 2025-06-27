import React from "react";
import When from "./When";
import { Spinner } from "./Spinner";
import { toast } from "react-toastify";
import { ItemsModel } from "../models/items.model";
import { useQueryClient } from "@tanstack/react-query";
import { useAddUserVote } from "../services/add-vote-api";
import { categoryQueryKeys } from "../constants/query-keys";
import { CategoryTypeModel } from "../models/category.model";
import { API_BASE_URL, DEFAULT_ACTIVITY_ID } from "../constants/constants";
import { Heart, User, GraduationCap, Building2 } from "lucide-react";
import { handleApiError } from "../services/errors/handle-errors-api";

interface ProjectCardProps {
  categoryId?: number;
  categoryType: CategoryTypeModel;
  subCategoryId?: number;
  ableToVote?: boolean;
  item: ItemsModel & {
    type: CategoryTypeModel;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  categoryId,
  subCategoryId,
  categoryType,
  ableToVote,
  item,
}) => {
  const queryClient = useQueryClient();

  const { mutateAsync: addUserVoteMutateasync, isPending: loadingVote } =
    useAddUserVote({
      onError: (error) => handleApiError(error, "Voto"),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: categoryQueryKeys.getItemsFromCategories(
            categoryType!,
            categoryId,
            subCategoryId
          ),
        });

        toast.success(
          "Voto adicionado com sucesso!, continue votando nas demais categorias"
        );
      },
    });

  const handleAddVote = async (itemId: number) => {
    await addUserVoteMutateasync({
      item_id: itemId,
      category_id: categoryId,
      category_type: categoryType,
      subcategory_id: subCategoryId,
      activity_id: DEFAULT_ACTIVITY_ID,
    });
  };

  if (item.type === "stand" || item.type == "member") {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
        {item.cover && (
          <img
            src={`${API_BASE_URL}/${item.cover}`}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
        )}

        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <Building2 size={20} className="text-orange-500" />
            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
              {item.type == "stand" && "Stande"}
              {item.type == "member" && "Expositor"}
            </span>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>

          <div className="space-y-2 mb-4">
            {item.course && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <GraduationCap size={16} />
                <span>{item.course}</span>
              </div>
            )}

            {item.classe && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <span>{item.classe}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              disabled={ableToVote || loadingVote}
              onClick={() => handleAddVote(Number(item.id))}
              className={`px-4 py-2 rounded-2xl font-bold text-lg transition-all duration-200 transform ${
                ableToVote
                  ? item.has_voted
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : item.type === "stand"
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              } w-full md:w-auto`}
            >
              <When expr={ableToVote}>
                <When expr={item.has_voted}>
                  <span className="flex items-center justify-center space-x-2">
                    <Heart size={20} />
                    <span>Meu voto</span>
                  </span>

                  <When.Else>
                    <span className="flex items-center justify-center space-x-2">
                      <Heart size={20} />
                      <span>Voto Registrado!</span>
                    </span>
                  </When.Else>
                </When>

                <When.Else>
                  <When expr={loadingVote}>
                    <Spinner />
                    <When.Else>
                      <span className="flex items-center justify-center space-x-2">
                        <Heart size={20} />
                        <span>Votar neste Projeto</span>
                      </span>
                    </When.Else>
                  </When>
                </When.Else>
              </When>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95">
      <div className="flex items-center space-x-2 mb-3">
        <User size={20} className="text-blue-500" />
        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
          Projecto
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
      {/* <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
        {item.description}
      </p> */}

      <div className="flex items-center justify-between">
        <button
          disabled={ableToVote || loadingVote}
          onClick={() => handleAddVote(Number(item.id))}
          className={`px-4 py-2 rounded-2xl font-bold text-lg transition-all duration-200 transform ${
            ableToVote
              ? item.has_voted
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          } w-full md:w-auto`}
        >
          <When expr={ableToVote}>
            <When expr={item.has_voted}>
              <span className="flex items-center justify-center space-x-2">
                <Heart size={20} />
                <span>Meu voto</span>
              </span>

              <When.Else>
                <span className="flex items-center justify-center space-x-2">
                  <Heart size={20} />
                  <span>Voto Registrado!</span>
                </span>
              </When.Else>
            </When>
            <When.Else>
              <When expr={loadingVote}>
                <Spinner />
                <When.Else>
                  <span className="flex items-center justify-center space-x-2">
                    <Heart size={20} />
                    <span>Votar neste Projeto</span>
                  </span>
                </When.Else>
              </When>
            </When.Else>
          </When>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
