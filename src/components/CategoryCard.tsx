// CategoryCard.tsx
import React from "react";
import { ChevronRight, Tag } from "lucide-react";
import { CategoryModel } from "../models/category.model";

interface CategoryCardProps {
  category: CategoryModel;
  onClick: () => void;
}

// Gera uma cor de destaque consistente baseada no id da categoria
const ACCENT_COLORS = [
  { bg: "bg-orange-50", icon: "text-orange-500", border: "border-orange-100" },
  { bg: "bg-blue-50", icon: "text-blue-500", border: "border-blue-100" },
  { bg: "bg-purple-50", icon: "text-purple-500", border: "border-purple-100" },
  { bg: "bg-teal-50", icon: "text-teal-600", border: "border-teal-100" },
  { bg: "bg-pink-50", icon: "text-pink-500", border: "border-pink-100" },
];

const getAccent = (id?: number) =>
  ACCENT_COLORS[(id ?? 0) % ACCENT_COLORS.length];

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const accent = getAccent(category.id);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer
        flex items-start gap-4 transition-shadow duration-200 hover:shadow-md group"
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0
          ${accent.bg} border ${accent.border}`}
      >
        <Tag size={18} className={accent.icon} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">
          {category.name}
        </h3>

        {/* {category.description && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )} */}

        <span
          className="inline-block mt-1 text-xs font-semibold text-gray-500 group-hover:text-gray-700"
        >
          vote no seu {category.name.toLowerCase()}
        </span>
      </div>

      <ChevronRight
        size={16}
        className="text-gray-300 shrink-0 mt-0.5 group-hover:text-gray-400 transition-colors"
      />
    </div>
  );
};

export default CategoryCard;
