import gql from 'graphql-tag';

const query = gql`
  query getAssetList($id: Int!) {
    assetList(id: $id, page: 1, pageSize: 4) {
      id
      assets {
        ... on mockerynewsstory {
          id
          headline
          slug
          url
          datePublished
          type
          promoImage {
            id
            url
          }
          author {
            id
            name
          }
          title
        }
        ... on partnerstory {
          id
          headline
          slug
          url
          datePublished
          type
          promoImage {
            id
            url
          }
          author {
            id
            name
          }
          title
        }
        ... on blogpost {
          id
          headline
          slug
          url
          datePublished
          type
          promoImage {
            id
            url
          }
          author {
            id
            name
          }
          title
        }
      }
    }
  }
`;

export default query;
