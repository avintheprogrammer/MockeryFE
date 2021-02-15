import gql from 'graphql-tag';
import videoFields from '../../../components/Video/UniversalVideoPlayer/PlaceHolder/videoFieldsObj';

const query = gql`
  query($id: Int!, $count: Int, $url: String!) {
    videoRecommendations(id: $id, count: $count, url: $url) {
      ${videoFields}
    }
  }
`;

export default query;
