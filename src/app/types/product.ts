export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface ProductCard {
  id: number;
  title: string;
  price: string;
  likes: number;
  image: string;
  description?: string;
  tags?: string[];
  ownerNickname?: string;
  createdAt?: string;
}

export interface ProductListResponse {
  totalCount: number;
  list: Product[];
}

export interface SearchParams {
  keyward?: string;
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "favorite";
}
