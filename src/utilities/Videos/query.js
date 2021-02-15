import gql from 'graphql-tag';
import videoFields from '../../components/Video/UniversalVideoPlayer/PlaceHolder/videoFieldsObj';

const query = gql`
  query($videoId: Int!){
    video(id: $videoId) {
      ${videoFields}
    }
  }
`;

export default query;
