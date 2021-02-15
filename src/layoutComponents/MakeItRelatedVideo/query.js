const query = `
  ...on makeItRelatedVideo {
    id
    url
    relatedVideo: relatedContent {
      id
      type
    }
  }
`;

export default query;
