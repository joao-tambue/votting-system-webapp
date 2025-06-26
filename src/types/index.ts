export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  activityId: string;
  hasSubcategories: boolean;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  categoryId?: string;
  subcategoryId?: string;
  type: 'stand' | 'expositor';
  image?: string;
  course?: string;
  class?: string;
  votes: number;
  hasVoted?: boolean;
}

export interface Vote {
  id: string;
  userId: string;
  projectId: string;
  timestamp: Date;
}