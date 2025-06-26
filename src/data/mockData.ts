import { Activity, Category, Project } from '../types';

export const activities: Activity[] = [
  {
    id: '1',
    name: 'Feira de Ciências',
    description: 'Projetos científicos e experimentos',
    icon: 'flask',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Mostra Cultural',
    description: 'Apresentações artísticas e culturais',
    icon: 'palette',
    color: 'bg-purple-500'
  },
  {
    id: '3',
    name: 'Feira Tecnológica',
    description: 'Inovações e projetos tecnológicos',
    icon: 'cpu',
    color: 'bg-green-500'
  },
  {
    id: '4',
    name: 'Stands Empresariais',
    description: 'Apresentações de empresas parceiras',
    icon: 'building',
    color: 'bg-orange-500'
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Biologia',
    activityId: '1',
    hasSubcategories: true,
    subcategories: [
      { id: '1', name: 'Botânica', categoryId: '1' },
      { id: '2', name: 'Zoologia', categoryId: '1' },
      { id: '3', name: 'Genética', categoryId: '1' }
    ]
  },
  {
    id: '2',
    name: 'Física',
    activityId: '1',
    hasSubcategories: false
  },
  {
    id: '3',
    name: 'Química',
    activityId: '1',
    hasSubcategories: false
  },
  {
    id: '4',
    name: 'Dança',
    activityId: '2',
    hasSubcategories: true,
    subcategories: [
      { id: '4', name: 'Folclórica', categoryId: '4' },
      { id: '5', name: 'Contemporânea', categoryId: '4' },
      { id: '6', name: 'Hip Hop', categoryId: '4' }
    ]
  },
  {
    id: '5',
    name: 'Música',
    activityId: '2',
    hasSubcategories: false
  },
  {
    id: '6',
    name: 'Programação',
    activityId: '3',
    hasSubcategories: true,
    subcategories: [
      { id: '7', name: 'Web Development', categoryId: '6' },
      { id: '8', name: 'Mobile Apps', categoryId: '6' },
      { id: '9', name: 'Games', categoryId: '6' }
    ]
  },
  {
    id: '7',
    name: 'Robótica',
    activityId: '3',
    hasSubcategories: false
  },
  {
    id: '8',
    name: 'Stands',
    activityId: '4',
    hasSubcategories: false
  }
];

export const projects: Project[] = [
  // Biologia - Botânica
  {
    id: '1',
    name: 'Jardim Vertical Inteligente',
    description: 'Sistema automatizado de irrigação para plantas',
    subcategoryId: '1',
    type: 'expositor',
    course: 'Ensino Médio',
    class: '3º A',
    votes: 45
  },
  {
    id: '2',
    name: 'Plantas Medicinais do Cerrado',
    description: 'Catalogação e propriedades das plantas nativas',
    subcategoryId: '1',
    type: 'expositor',
    course: 'Ensino Médio',
    class: '2º B',
    votes: 38
  },
  
  // Física
  {
    id: '3',
    name: 'Gerador Eólico Caseiro',
    description: 'Energia renovável em pequena escala',
    categoryId: '2',
    type: 'expositor',
    course: 'Ensino Médio',
    class: '3º C',
    votes: 52
  },
  
  // Programação - Web Development
  {
    id: '4',
    name: 'App de Gestão Escolar',
    description: 'Plataforma para comunicação escola-família',
    subcategoryId: '7',
    type: 'expositor',
    course: 'Técnico em Informática',
    class: '3º INFO',
    votes: 67
  },
  
  // Stands
  {
    id: '5',
    name: 'TechCorp Solutions',
    description: 'Empresa de desenvolvimento de software especializada em soluções educacionais',
    categoryId: '8',
    type: 'stand',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    votes: 29
  },
  {
    id: '6',
    name: 'EcoVerde Sustentabilidade',
    description: 'Consultoria em projetos sustentáveis e energia renovável',
    categoryId: '8',
    type: 'stand',
    image: 'https://images.pexels.com/photos/9800029/pexels-photo-9800029.jpeg',
    votes: 41
  },
  
  // Mais projetos para ranking
  {
    id: '7',
    name: 'Robô Assistente',
    description: 'Robô para auxiliar pessoas com mobilidade reduzida',
    categoryId: '7',
    type: 'expositor',
    course: 'Técnico em Mecatrônica',
    class: '2º MEC',
    votes: 73
  },
  {
    id: '8',
    name: 'Coral Juvenil',
    description: 'Apresentação de música clássica e popular',
    categoryId: '5',
    type: 'expositor',
    course: 'Ensino Fundamental',
    class: '9º A',
    votes: 31
  }
];