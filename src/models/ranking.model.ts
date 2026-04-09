export interface ItemScore {
  category: string;
  subcategory?: string;
  subcategory_id?: number;
  category_type: string;
  ranking: RankingModel[];
}

export interface RankingModel {
  id: number;
  name: string;
  cover: string;
  profile_image?: string;
  grade?: number;
  group?: number;
  course?: string;
  total_votes: number;
}

export interface SubcategoryProject {
  project_id: number;
  name: string;
  description: string;
  subcategory_name: string;
  category_name: string;
  votes: number;
  members: ProjectMember[];
}

export interface ProjectMember {
  name: string;
  classe: string;
  turma: string;
}