import gql from 'graphql-tag';
import videoFields from '../../../components/Video/UniversalVideoPlayer/PlaceHolder/videoFieldsObj';

const query = gql`
  query($ids: [Int!]!){
    videos(ids: $ids) {
      ${videoFields}
    }
  }
`;

export default query;
