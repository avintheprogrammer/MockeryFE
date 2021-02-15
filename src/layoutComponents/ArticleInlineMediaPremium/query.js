import gql from 'graphql-tag';
import videoFields from '../../components/Video/UniversalVideoPlayer/PlaceHolder/videoFieldsObj';

const query = gql`
  query getArticleFeaturedData($id: Int, $uid: String, $sessionToken: String) {
    article(id: $id) {
      id
      section {
        id
        color
      }
      featuredMedia(uid: $uid, sessionToken: $sessionToken) {
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
  }
`;

export default query;
