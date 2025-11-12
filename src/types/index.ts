// Re-exporta todos os tipos de produtos
export * from './product';

// Tipos adicionais que não são específicos de produtos
export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface Pagination<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  pagination?: Pagination<T>;
}

export interface FilterOption {
  id: string;
  name: string;
  value: string;
  count: number;
  selected?: boolean;
}

export interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
  type: 'checkbox' | 'radio' | 'range';
}
