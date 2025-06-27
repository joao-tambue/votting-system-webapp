import { CategoryModel } from "./category.model";

export type ActivityModel = {
  id: number;
  name: string;
  description: string;
  categories: CategoryModel[];
};
