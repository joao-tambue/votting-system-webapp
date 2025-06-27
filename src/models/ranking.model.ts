export interface ItemScore {
  category: string;
  subcategory?: string;
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
