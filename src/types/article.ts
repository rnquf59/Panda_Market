// 게시글 작성자 타입
export interface ArticleWriter {
  id: number;
  nickname: string;
}

// 게시글 카드 타입 (목록에서 사용)
export interface ArticleCard {
  id: number;
  title: string;
  content: string;
  image: string;
  writer: ArticleWriter;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
}

// 베스트 게시글 타입 (베스트 게시글 섹션에서 사용)
export type BestArticle = ArticleCard;

// 게시글 상세 타입 (추후 API 연동 시 확장)
export interface ArticleDetail {
  id: number;
  title: string;
  content: string;
  image?: string;
  images?: string[];
  writer: ArticleWriter;
  likeCount: number;
  createdAt: string;
  updatedAt?: string;
}

// 게시글 목록 응답 타입
export interface ArticleListResponse {
  totalCount: number;
  list: ArticleCard[];
}

// 게시글 검색 파라미터 타입
export interface ArticleSearchParams {
  keyword?: string;
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
}
