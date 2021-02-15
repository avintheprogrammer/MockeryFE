const query = `
  ...on keyPoints {
    id
    keyPoints
    section {
      id
      color
    }
  }
`;

export default query;
