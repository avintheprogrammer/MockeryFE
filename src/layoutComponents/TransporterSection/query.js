const query = `
  ...on transporterSection {
    id
    brand
    assets {
      id
      brand
      headline
      slug
      url
      native
      datePublished
      dateModified
      dateLastPublishedSixHr
      type
      promoImage {
        id
        url
      }
      section {
        subType
      }
      ... on mockeryvideo {
        duration
        brand
      }
      creatorOverwrite
      author {
        id
        name
        url
      }
      title
    }
  }
`;

export default query;
