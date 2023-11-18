export interface GraphqlVariables {
  first: number;
  featured: boolean;
  postedBefore: string; //ios8601 date time ex:
  postedAfter: string; //"2023-11-18 00:00:00.000"
  after: string;
  order: 'VOTES'; // default order for our app
}

export const GraphqlQuery = {
  query: `
  query Post($first: Int, $after: String, $featured: Boolean, $postedBefore: DateTime, $postedAfter: DateTime) {
    posts(
         featured: $featured
         postedBefore: $postedBefore
         postedAfter: $postedAfter
         first: $first
         after: $after
     ) {
         totalCount
         pageInfo {
             endCursor
             hasNextPage
         }
         edges {
             node {
                 id
                 name
                 slug
                 tagline
                 description
                 createdAt
                 featuredAt
                 commentsCount
                 votesCount
                 productLinks {
                     type
                     url
                 }
                 thumbnail {
                     type
                     url
                     videoUrl
                 }
                 topics(first: 4) {
                     edges{
                         node {
                             name
                         }
                     }
                 }
             }
         }
     }
 }`,
};
