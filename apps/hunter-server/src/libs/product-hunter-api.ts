import axios from 'axios';
import { Graphiql_Query } from './query-builder';
import { ProductDataPaged } from '@product-daily-hunter/product-hunter-common';
import { HunterApiConfiguration, ShortBaseUrl } from './model';

export class ProductHunterApi {
  private configuration: HunterApiConfiguration; // not used as for now
  private url: string;

  constructor(configuration: HunterApiConfiguration, url: string) {
    this.configuration = configuration;
    this.url = url;
  }

  getProductReleasedByDate(dateStr: string): Promise<ProductDataPaged> {
    return new Promise((resolve, reject) => {
      this.getAllProductByDate(dateStr, null, null)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllProductByDate(
    dateStr: string,
    allData,
    cursor
  ): Promise<ProductDataPaged> {
    const date = new Date(dateStr);
    return axios
      .post(
        this.url,
        {
          ...Graphiql_Query,
          ...{
            variables: {
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
              cursor: cursor,
            },
          },
        },
        {
          headers: { 'content-type': 'application/json' },
        }
      )
      .then((response) => {
        allData = this.formatProductPostData(allData, response.data.data.posts);
        if (!allData.pageInfo.hasNextPage) {
          return allData;
        } else {
          return this.getAllProductByDate(
            dateStr,
            allData,
            allData.pageInfo.endCursor
          );
        }
      });
  }

  formatProductPostData(
    postData: ProductDataPaged,
    newPagedData
  ): ProductDataPaged {
    if (!postData) {
      postData = new ProductDataPaged();
    }

    postData.pageInfo.hasNextPage = newPagedData.pageInfo.hasNextPage;
    postData.pageInfo.endCursor = newPagedData.pageInfo.endCursor;
    postData.posts = postData.posts.concat(
      newPagedData.edges.map((itemNode) => {
        const item = itemNode.node;
        return {
          id: item.id,
          name: item.name,
          slug: item.slug,
          discription: item.tagline,
          topics: item.topics.edges.map((topicNode) => topicNode.node.slug),
          commentsCount: item.commentsCount,
          votesCount: item.votesCount,
          url: ShortBaseUrl + item.shortenedUrl,
        };
      })
    );
    postData.pageInfo.totalCount = postData.posts.length;
    return postData;
  }
}
