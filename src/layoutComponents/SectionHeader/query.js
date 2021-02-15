const query = `
...on sectionHeader {
  id
  brand
  section {
    id
    color
    name
    eyebrow
    headerImage {
      url
      id
    }
    title
    tabLabel
    url
    image {
      id
      url
    }
    logo {
      id
      url
    }
  }
  featuredMedia {
    ... on image {
      id
      type
      caption
      copyrightHolder
      url
      datePublished
      isHighTouch
    }
    ... on mockeryvideo {
      id
      url
      datePublished
    }
  }
}
`;

export default query;
