import React from "react";
import { ChevronRight, Layers } from "lucide-react";
import { CategoryModel } from "../models/category.model";

interface CategoryCardProps {
  category: CategoryModel;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-4 cursor-pointer transform transition-all duration-200 hover:scale-102 hover:shadow-lg active:scale-98 border-l-4 border-green-500"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <Layers size={20} className="text-green-600" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">{category.name}</h3>
            {category.subcategories && (
              <p className="text-xs text-gray-500">
                {category.subcategories?.length} subcategorias
              </p>
            )}
          </div>
        </div>

        <ChevronRight size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default CategoryCard;
