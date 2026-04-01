import { ItemScore, SubcategoryProject } from "../../models/ranking.model";

export type ProjectMemberNormalized = {
  name: string;
  classe: string;
  turma: string;
};

export type NormalizedProject = {
  id: number;
  name: string;
  cover?: string | null;
  profileImage?: string | null;
  description?: string;
  class?: string | null;
  group?: string | null;
  course?: string | null;
  votes: number;
  type: "stand" | "member" | "project";
  category: string;
  subcategory?: string | null;
  members?: ProjectMemberNormalized[]; // novo campo
};

export function normalizeRankingData(data: ItemScore[]): NormalizedProject[] {
  return data.flatMap((entry) =>
    entry?.ranking?.map((item) => ({
      id: item.id,
      name: item.name,
      cover: item.cover,
      profileImage: item.profile_image,
      description: "",
      class:
        item.grade !== undefined && item.grade !== null
          ? String(item.grade)
          : undefined,
      group:
        item.group !== undefined && item.group !== null
          ? String(item.group)
          : undefined,
      course: item.course,
      votes: item.total_votes,
      type: entry.category_type as "stand" | "member" | "project",
      category: entry.category,
      subcategory: entry.subcategory,
    }))
  );
}

// Nova função para o 2º endpoint
export function normalizeSubcategoryProjects(
  data: SubcategoryProject[]
): NormalizedProject[] {
  return data.map((item) => ({
    id: item.project_id,
    name: item.name,
    description: item.description,
    votes: item.votes,
    type: "project" as const,
    category: item.category_name,
    subcategory: item.subcategory_name,
    members: item.members,
  }));
}