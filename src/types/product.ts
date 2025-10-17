export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  favoriteCount: number;
  ownerId: number;
  ownerNickname: string;
  iamges: string[];
  tags: string[];
  createdAt: string;
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

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
}

export interface CreateProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  favoritCount: number;
  ownerId: number;
  ownerNickname: string;
  images: string[];
  tags: string[];
  createAt: string;
}
