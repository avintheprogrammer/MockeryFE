import navStatus from '../navStatus';
import {
  SET_NAV_PAGE_TYPE,
  SET_NAV_ARTICLE_TITLE,
  SET_NAV_ARTICLE_SETTINGS,
  SET_INTRA_NAVIGATION_FLAG,
} from '../../actions/navStatus';

describe('navStatus reducer', () => {
  it('should return the initial state', () => {
    expect(navStatus(undefined, {})).toEqual({
      pageType: 'page',
      articleTitle: '',
      hasNewsAlert: false,
      hasLiveAlert: false,
      hasCountDownClock: false,
      articleSettings: {},
      isExpanded: false,
      megaMenuToggleFlag: false,    
      isIntraSiteLink: false,
    });
  });

  it('should handle SET_NAV_PAGE_TYPE', () => {
    expect(
      navStatus(undefined, {
        type: SET_NAV_PAGE_TYPE,
        pageType: 'article',
      }),
    ).toEqual({
      pageType: 'article',
      articleTitle: '',
      hasNewsAlert: false,
      hasLiveAlert: false,
      hasCountDownClock: false,
      articleSettings: {},
      isExpanded: false,
      megaMenuToggleFlag: false,          
      isIntraSiteLink: false,
    });
  });

  it('should handle SET_NAV_ARTICLE_TITLE', () => {
    expect(
      navStatus(undefined, {
        type: SET_NAV_ARTICLE_TITLE,
        articleTitle: 'test article',
      }),
    ).toEqual({
      pageType: 'page',
      articleTitle: 'test article',
      hasNewsAlert: false,
      hasLiveAlert: false,
      hasCountDownClock: false,
      articleSettings: {},
      isExpanded: false,
      megaMenuToggleFlag: false,                
      isIntraSiteLink: false,
    });
  });

  it('should handle SET_NAV_ARTICLE_SETTINGS', () => {
    const socialtoolsEnabled = 'Yes';
    expect(
      navStatus(undefined, {
        type: SET_NAV_ARTICLE_SETTINGS,
        articleSettings: { socialtoolsEnabled },
      }),
    ).toEqual({
      pageType: 'page',
      articleTitle: '',
      hasNewsAlert: false,
      hasLiveAlert: false,
      hasCountDownClock: false,
      articleSettings: { socialtoolsEnabled },
      isExpanded: false,
      megaMenuToggleFlag: false,              
      isIntraSiteLink: false,
    });
  });

  it('should handle SET_INBOUND_NAVIGATION_FLAG', () => {
    const isIntraSiteLink = true;
    expect(
      navStatus(undefined, {
        type: SET_INTRA_NAVIGATION_FLAG,
        isIntraSiteLink,
      }),
    ).toEqual({
      pageType: 'page',
      articleTitle: '',
      hasNewsAlert: false,
      hasLiveAlert: false,
      hasCountDownClock: false,
      articleSettings: {},
      isExpanded: false,
      megaMenuToggleFlag: false,              
      isIntraSiteLink: true,
    });
  });
});
