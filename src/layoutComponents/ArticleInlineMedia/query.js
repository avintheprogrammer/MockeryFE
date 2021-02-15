import videoFields from '../../components/Video/UniversalVideoPlayer/PlaceHolder/videoFieldsObj';

const query = `
  ...on articleInlineMedia {
    id
    brand
    section {
      id
      color
    }
    featuredMedia {
      ... on image {
        id
        type
        caption
        headline
        creatorOverwrite
        copyrightHolder
        url
        datePublished
        isHighTouch
      }
      ... on mockeryvideo {
        ${videoFields}
      }
    }
  }
`;

export default query;
