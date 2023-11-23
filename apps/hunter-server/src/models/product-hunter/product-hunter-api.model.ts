import { GraphqlQuery, GraphqlVariables } from './product-hunter.query-builder';
import { ProductDataPaged } from '@product-daily-hunter/product-hunter-common';
import { HunterApiConfiguration } from './product-hunter-config.model';

export class ProductHunterApi {
  private configuration: HunterApiConfiguration;

  constructor(configuration: HunterApiConfiguration) {
    this.configuration = configuration;
  }

  getProductReleasedByDate(dateStr: string): Promise<ProductDataPaged> {
    return new Promise((resolve, reject) => {
      this.getAllProductByDate(dateStr, null, '')
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
    allData: ProductDataPaged,
    cursor: string
  ): Promise<ProductDataPaged> {
    const date = new Date(dateStr);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const variables: GraphqlVariables = {
      first: 20,
      featured: true,
      order: 'VOTES',
      after: cursor,
      postedAfter: date.toISOString(),
      postedBefore: nextDay.toISOString(),
    };

    return this.configuration.api
      .post(process.env.GRAPHQL, {
        query: GraphqlQuery.query,
        variables: variables,
      })
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
      })
      .catch((err) => {
        throw new Error(err);
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
          tagline: item.tagline,
          description: item.description,
          topics: item.topics.edges.map((topicNode) => topicNode.node.name),
          commentsCount: item.commentsCount,
          votesCount: item.votesCount,
          url: item.productLinks.find((productItem) => {
            return productItem.type.toLowerCase() === 'website';
          })?.url,
          thumbnail: item.thumbnail,
        };
      })
    );

    postData.pageInfo.totalCount = postData.posts.length;
    return postData;
  }
}
