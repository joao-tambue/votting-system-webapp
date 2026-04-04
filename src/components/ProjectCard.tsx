import React from "react";
import { Spinner } from "./Spinner";
import { toast } from "react-toastify";
import { ItemsModel } from "../models/items.model";
import { useQueryClient } from "@tanstack/react-query";
import { useAddUserVote } from "../services/add-vote-api";
import { categoryQueryKeys } from "../constants/query-keys";
import { CategoryTypeModel } from "../models/category.model";
import { API_BASE_URL } from "../constants/constants";
import { Heart, CheckCircle, Lock, GraduationCap, Users, Layers } from "lucide-react";
import { handleApiError } from "../services/errors/handle-errors-api";

interface ProjectCardProps {
  activityId?: number;
  categoryId?: number;
  categoryType: CategoryTypeModel;
  subCategoryId?: number;
  ableToVote?: boolean;
  item: ItemsModel & { type: CategoryTypeModel };
}

type VoteState = "can-vote" | "voted" | "disabled";

const ProjectCard: React.FC<ProjectCardProps> = ({
  activityId,
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
            activityId,
            categoryType!,
            categoryId,
            subCategoryId
          ),
        });
        toast.success("Voto registado com sucesso! Continue votando nas demais categorias.");
      },
    });

  const handleAddVote = async (itemId: number) => {
    await addUserVoteMutateasync({
      item_id: itemId,
      category_id: categoryId,
      category_type: categoryType,
      subcategory_id: subCategoryId,
      activity_id: activityId,
    });
  };

  const voteState: VoteState = item.has_voted
    ? "voted"
    : ableToVote
    ? "can-vote"
    : "disabled";

  const typeLabel =
    item.type === "stand" ? "Stande" :
    item.type === "member" ? "Expositor" :
    "Projecto";

  const typeBadgeStyle =
    item.type === "stand" || item.type === "member"
      ? { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" }
      : { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" };

  const TypeIcon =
    item.type === "stand" ? Layers :
    item.type === "member" ? Users :
    Layers;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col transition-shadow duration-200 hover:shadow-md">
      
      {item.cover && (
        <div className="w-full h-48 overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={`${API_BASE_URL}/${item.cover} || /notfound.png`}
            alt={item.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1 gap-3">

        <span
          className={`inline-flex items-center gap-1.5 self-start text-xs font-semibold px-2.5 py-1 rounded-full border
            ${typeBadgeStyle.bg} ${typeBadgeStyle.text} ${typeBadgeStyle.border}`}
        >
          <TypeIcon size={12} />
          {typeLabel}
        </span>

        <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-2">
          {item.name}
        </h3>

        {(item.course || item.classe) && (
          <div className="flex flex-col gap-1.5 text-sm text-gray-500">
            {item.course && (
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} className="shrink-0 text-gray-400" />
                {item.course}
              </span>
            )}
            {item.classe && (
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
                {item.classe}
              </span>
            )}
          </div>
        )}

        <div className="flex-1" />

        <button
          disabled={voteState !== "can-vote" || loadingVote}
          onClick={() => handleAddVote(Number(item.id))}
          className={`
            w-full flex items-center justify-center gap-2
            py-2.5 px-4 rounded-xl text-sm font-semibold
            transition-all duration-200
            ${voteState === "can-vote"
              ? "bg-orange-500 text-white hover:bg-orange-600 active:scale-95 shadow-sm hover:shadow"
              : voteState === "voted"
              ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }
          `}
        >
          {loadingVote ? (
            <Spinner />
          ) : voteState === "voted" ? (
            <>
              {/* <CheckCircle size={16} /> */}
              <span>Voto registado</span>
            </>
          ) : voteState === "can-vote" ? (
            <>
              <Heart size={16} />
              <span>Votar neste {typeLabel}</span>
            </>
          ) : (
            <>
              <Lock size={16} />
              <span>Votação encerrada</span>
            </>
          )}
        </button>

      </div>
    </div>
  );
};

export default ProjectCard;