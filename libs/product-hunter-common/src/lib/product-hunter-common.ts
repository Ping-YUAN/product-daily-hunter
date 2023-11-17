export interface ProductPost {
  name: string;
  id: number;
  slug: string;
  discription: string; //tagline
  topics: string[];
  commentsCount: number;
  votesCount: number;
  url: string;
}
export class ProductDataPaged {
  posts: ProductPost[];
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    totalCount: number;
  };
  constructor() {
    this.posts = [];
    this.pageInfo = {
      endCursor: '',
      hasNextPage: false,
      totalCount: 0,
    };
  }
}

export interface ProductCategory {
  topic: string;
  count: number;
}
