import { CategoryModel } from "./category.model";

export type ActivityModel = {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  finished: boolean;
  categories: CategoryModel[];
};
