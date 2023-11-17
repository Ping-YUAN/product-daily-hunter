export const Graphiql_Query = {
  operationName: 'ArchivePage',
  variables: {
    year: 2023,
    month: 9,
    day: 2,
    order: 'DAILY_RANK',
    cursor: null,
  },
  query:
    'query ArchivePage($year:Int$month:Int$day:Int$cursor:String$order:PostsOrder){posts(first:20 year:$year month:$month day:$day order:$order after:$cursor){edges{node{id ...PostItemFragment __typename}__typename}pageInfo{endCursor hasNextPage __typename}__typename}}fragment PostItemFragment on Post{id commentsCount name shortenedUrl slug tagline updatedAt topics(first:4){edges{node{id slug __typename}__typename}__typename}redirectToProduct{id slug __typename}launchTypesInfo{id soloMaker __typename}fundingSurvey{id bootstrapped __typename}...ProductLinkFragment ...PostThumbnail ...PostVoteButtonFragment __typename}fragment PostThumbnail on Post{id name thumbnailImageUuid ...PostStatusIcons __typename}fragment PostStatusIcons on Post{id name productState __typename}fragment PostVoteButtonFragment on Post{id featuredAt updatedAt createdAt product{id isSubscribed __typename}disabledWhenScheduled hasVoted ...on Votable{id votesCount __typename}__typename}fragment ProductLinkFragment on Post{product{id slug name postsCount __typename}__typename}',
};
