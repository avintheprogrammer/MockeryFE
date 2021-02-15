const query = `
  ...on articleTicker {
    assets {
      shorterHeadline
      id
      type
      headline
      description
      url
      brand
      promoImage {
        id
        url
      }
      section {
        id
        title
        url
        subType
      }
      native
      premium
      title
    }
  }
`;

export default query;
