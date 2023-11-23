/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductDataPaged } from '@product-daily-hunter/product-hunter-common';
import { ProductHunterApi } from './product-hunter-api.model';
import { lastValueFrom, of } from 'rxjs';

let requestCount = 1;
const PRODUCT_DATA_PAGED: ProductDataPaged = {
  pageInfo: {
    hasNextPage: false,
    endCursor: 'xx',
    totalCount: 4,
  },
  posts: [],
};
const NEW_PAGED_DATA = {
  pageInfo: {
    hasNextPage: false,
    endCursor: 'xx',
    totalCount: 1,
  },
  edges: [
    {
      node: {
        id: 'id',
        slug: 'slug',
        tagline: 'tagline',
        description: 'description',
        topics: {
          edges: [
            {
              node: {
                name: 'topic name',
              },
            },
          ],
        },
        commentsCount: 2,
        votesCount: 4,
        productLinks: [
          {
            type: 'Website',
            url: 'producthunter.com',
          },
        ],
        thumbnail: {},
      },
    },
  ],
};
const config = {
  api: {
    post: () => {
      if (requestCount > 0) {
        requestCount = 0;
        return lastValueFrom(
          of({
            data: {
              data: {
                posts: {
                  ...NEW_PAGED_DATA,
                  ...{
                    pageInfo: {
                      hasNextPage: true,
                      endCursor: '11',
                    },
                  },
                },
              },
            },
          })
        );
      } else if (requestCount == 0) {
        return lastValueFrom(
          of({
            data: {
              data: { posts: NEW_PAGED_DATA },
            },
          })
        );
      }
    },
  },
};
const originalEnv = process.env;
const productApi = new ProductHunterApi(config as any);
describe('test for product hunter api', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      GRAPHQL: '',
    };
  });

  test('test get product released by date two page', () => {
    const today = new Date();
    productApi
      .getProductReleasedByDate(
        `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
      )
      .then((data) => {
        expect(data.posts.length).toBe(2);
        expect(data.pageInfo.endCursor).toBe(NEW_PAGED_DATA.pageInfo.endCursor);
        expect(data.posts[0].id).toBe(NEW_PAGED_DATA.edges[0].node.id);
      });
  });

  test('test format producted post data', () => {
    const postData = PRODUCT_DATA_PAGED;
    const newPagedData = NEW_PAGED_DATA;

    const result = productApi.formatProductPostData(postData, newPagedData);

    expect(result.posts.length).toBe(1);
    expect(result.pageInfo.endCursor).toBe(NEW_PAGED_DATA.pageInfo.endCursor);
    expect(result.posts[0].id).toBe(NEW_PAGED_DATA.edges[0].node.id);
  });
});
