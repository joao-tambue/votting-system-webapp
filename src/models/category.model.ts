export interface Subcategory {
  id: number;
  name: string;
}

export type CategoryModel = {
  id: number;
  name: string;
  category_type: string;
  subcategories?: Subcategory[];
};

export type CategoryTypeModel = "stand" | "member" | "project";