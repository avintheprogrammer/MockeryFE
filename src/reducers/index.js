import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { dataByMarketBanner, selectedMarketBanner } from './marketsBanner';
import { dataByMarketMover } from './marketMovers';
import videoDataWithPositionReducer from '../components/Video/UniversalVideoPlayer/reducers/reducer-position';
import videoIsPreloaderReducer from '../components/Video/UniversalVideoPlayer/reducers/reducer-preloader';
import setPlayerInfo from '../components/Video/UniversalVideoPlayer/reducers/reducer-player-information';
import setEventsInfo from '../components/Video/UniversalVideoPlayer/reducers/reducer-events-information';
import setTranscriptInfo from '../components/Video/UniversalVideoPlayer/reducers/reducer-transcript-information';
import setPlaceholderInfo from '../components/Video/UniversalVideoPlayer/reducers/reducer-placeholder-information';
import setVideoRecommendationInfo from '../components/Video/UniversalVideoPlayer/reducers/reducer-recommendation-information';
import setVideoEndCardInfo from '../components/Video/UniversalVideoPlayer/reducers/reducer-videoEndCard-Information';
import setContinuousPlayInfo from '../components/Video/UniversalVideoPlayer/reducers/reducer-continuousPlay-information';
import setVideoPlayBackInitiative from '../components/Video/UniversalVideoPlayer/reducers/reducer-playBackInitiative-information';
import dataByMarketTable from './marketTable';
import dataByQuote from './quotes';
import quoteSearches from './quoteSearches';
import navStatus from './navStatus';
import xfinity from './xfinity';
import authentication from './authentication';
import metaTags from './metaTags';
import dataByGDSMarketTable from './gdsMarketTable';
import page from './page';
import menu from './menu';
import request from './request';
import sailthru from './sailthru';
import viewMode from './viewMode';
import relatedVideos from './relatedVideos';
import videoPlaceholders from './videoPlaceholders';

module.exports = combineReducers({
  routing: routerReducer,
  navStatus,
  dataByMarketBanner,
  selectedMarketBanner,
  dataByMarketMover,
  videoDataWithPosition: videoDataWithPositionReducer,
  videoIsPreloader: videoIsPreloaderReducer,
  videoPlayerInfo: setPlayerInfo,
  videoEventsInfo: setEventsInfo,
  videoTranscriptInfo: setTranscriptInfo,
  placeholderInfo: setPlaceholderInfo,
  videoRecommendationInfo: setVideoRecommendationInfo,
  videoEndCardInfo: setVideoEndCardInfo,
  continuousPlayInfo: setContinuousPlayInfo,
  playBackInitiativeInfo: setVideoPlayBackInitiative,
  dataByMarketTable,
  dataByQuote,
  quoteSearches,
  xfinity,
  authentication,
  metaTags,
  dataByGDSMarketTable,
  page,
  menu,
  request,
  sailthru,
  viewMode,
  relatedVideos,
  videoPlaceholders,
});
