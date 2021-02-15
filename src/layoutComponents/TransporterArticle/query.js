const query = `
  ...on transporterArticle {
    id
    url
    title
    relatedArticle: relatedContent {
      id
    }
    section {
      id
      color
    }
  }
`;

export default query;
