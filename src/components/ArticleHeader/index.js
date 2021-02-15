/* eslint-disable react/jsx-indent, consistent-return, no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { setNavArticleTitle, setNavArticleSettings } from '../../../actions/navStatus';
import Breakpoints from '../../../utilities/Breakpoints';

import LazyLoader from '../../LazyLoader';
import BigTimeEventBus from '../../../utilities/EventBus';
import TimeConversion from '../../../utilities/TimeConversion';
import { MOCKERY, DEAL_OR_NO_DEAL, MAKE_IT } from '../../../utilities/Constants'
import MOCKERYLink from '../../../utilities/MOCKERYLink';
import Author from '../Author';
import Share from '../Share';
import ErrorHandler from '../../ErrorHandler';
import SocialIcons from '../../SocialIcons';

import MakeItPattern from '../../MakeItPattern';

let styles;
const brandStyles = {};
brandStyles[MOCKERY] = require('./styles.mockery.scss');
brandStyles[DEAL_OR_NO_DEAL] = require('./styles.dealornodeal.scss');
brandStyles[MAKE_IT] = require('./styles.makeit.scss');

/**
 * @constant
 * @type {number}
 * A static offset that is set to set the range within which this animation will map.
 */
const VERTICAL_SCROLL_OFFSET = 500;

/**
 * @constant
 * @type {number}
 * A multiplier that maps the speed of the parallax animation to the scroll range.
 */
const VALUE_MULTIPLIER = -0.25;

/**
 * @constant
 * @type {number}
 * The initial offset used to calculate when to start the animation.
 */
const INITIAL_OFFSET = 115;

/**
 * Stateful React component function for rendering the article header with basics inforamtion about a given article and a parallax image component.
 * Implements lifecycle methods to attach and detach scroll handlers through the global <code>BigTimeEventBus</code> utility.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} publisher Object containing information about the publisher.
 * @param {string} headline String with the title of the article.
 * @param {string} datePublished String representation of the publish date.
 * @param {string} dateModified String representation of the modified date.
 * @param {string} description The main description for the article.
 * @param {object} section The section information for the article.
 * @param {bool} isSpecialReport Flag to indicate special report article. Hides eyebrow if true.
 * @returns {function} React component that renders out the Article Header.
 */
class ArticleHeader extends React.Component {
  /**
   * @type {object}
   * @property {string} bgSize The css property to set for the background size. Changes depending on the scroll,
   * thus creating the desired parallax effect.
   */
  state = {
    bgSize: `100%`,
  };

  /**
   * @type {object}
   * Sets up type checking for props.
   * @property {object} data The data received as a response from GraphQL.
   * @property {string} articleTitle The article title as part of the global redux state.
   * @property {func} setNavArticleTitle The action to dispatch to change the article title in the redux state.
   * @param {bool} isSpecialReport Flag to indicate special report article. Hides eyebrow if true.
   * @property {bool} isTransporter Boolean representing whether or not this header is rendered as part of the
   * transporter.
   * @static
   */
  static propTypes = {
    data: PropTypes.object.isRequired,
    mobileImage: PropTypes.element,
    articleTitle: PropTypes.string,
    setNavArticleTitle: PropTypes.func,
    setNavArticleSettings: PropTypes.func,
    isSpecialReport: PropTypes.bool,
    isTransporter: PropTypes.bool,
    hasBackground: PropTypes.bool,
    dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    brand: PropTypes.string,
  };

  /**
   * @type {object}
   * Sets up default props.
   * @property {bool} isTransporter Boolean representing whether or not this header is rendered as part of the
   * transporter.
   * @property {string} articleTitle Default in case component doesn't receive an article title, as from mocks or tests.
   * @property {function} setNavArticleTitle Action dispatcher, set default in case there is none set, as from mocks or
   * tests.
   * @static
   */
  static defaultProps = {
    isTransporter: false,
    articleTitle: '',
    setNavArticleTitle: () => { },
    setNavArticleSettings: () => { },
    isSpecialReport: false,
    hasBackground: false,
    dataId: 0,
    mobileImage: null,
    brand: 'mockery',
  };

  /**
   * @type {function}
   * Attaches a scroll listener through the global scroll handling utility.
   */
  componentDidMount() {
    if (this.props.hasBackground && this.props.brand !== 'mockery') {
      BigTimeEventBus.on('scroll', this.handleScroll);
    }

    BigTimeEventBus.on('breakpointChange', this.handleBreakpointChange);
    Breakpoints.monitorBreakpoints();
    this.getInitialContainerSize();
    this.setArticleTitleIfNeeded();
  }

  /**
   * @type {function}
   * Dispatches action to change article title if necessary.
   */

  setArticleTitleIfNeeded = () => {
    // If data is not undefined, not part of a transporter, and the title is different from what exists in the global
    // store.
    if (
      typeof this.props.data !== 'undefined' &&
      this.props.articleTitle !== this.props.data.title &&
      !this.props.isTransporter
    ) {
      this.props.setNavArticleTitle(this.props.data.title);
      this.props.setNavArticleSettings({
        settings: { socialtoolsEnabled: this.props.data.socialtoolsEnabled },
      });
    }
  };

  /**
   * @type {function}
   * Detaches the breakpoint change listener with the global event handling utility.
   * @see BigTimeEventBus.remove
   */
  componentWillUnmount() {
    BigTimeEventBus.remove('breakpointChange', this.handleBreakpointChange);
  }

  /**
   * @type {function}
   * Called on breakpoint change to update the local state to the current breakpoint.
   * Also looks at the current breakpoint to turn on or off the arrows as necessary.
   */
  handleBreakpointChange = () => {
    let sizeString;
    if (Breakpoints.current() === "mobile") {
      sizeString = `w=700&h=305`;
    }
    else if (Breakpoints.current() === "tablet") {
      sizeString = `w=760&h=405`;
    }
    else if (Breakpoints.isDesktop()) {
      sizeString = `w=1340&h=500`
    }
    this.setState({ sizeString });
  };

  /**
   * Scroll handler that sets the parallax animation based on scroll percentage.
   */
  handleScroll = () => {
    const backgroundSizeValue = this.calculateParallaxValues();
    this.setState({ bgSize: `${backgroundSizeValue}%` });
  };

  /**
   * Calculates the values to set on the background element based on the scroll.
   * Returns a background size in percent, calculated by how closethe component is to the top of the page.
   * @returns {number} The value in percent to set for the image background size.
   */
  calculateParallaxValues = () => {
    if (typeof this.img === 'undefined' && this.img === null) {
      return 0;
    }
    const imgTop = this.img.getBoundingClientRect().top;
    const windowTop = window.innerHeight;
    const area = VERTICAL_SCROLL_OFFSET + windowTop;
    const backgroundSizeValue =
      VALUE_MULTIPLIER * (100 * ((imgTop + VERTICAL_SCROLL_OFFSET) / area)) + INITIAL_OFFSET;

    return backgroundSizeValue;
  };

  /**
   * @type {function}
   * @param {boolean} socialtoolsEnabled boolean that determines whether to render <Share />
   * @returns {function} A React component that renders social sharing buttons.
   */
  renderShare = ({ socialtoolsEnabled }) => {
    if(this.props.brand === DEAL_OR_NO_DEAL) {
      const socialLinks = this.props.data.socialMediaInfo || [];
      return socialLinks.length ? this.getSocialFollowLinks(socialLinks) : null;
    }

    if (!socialtoolsEnabled) return null;

    const { isTransporter, brand, data } = this.props;

    return (
      <Share
        shareType={isTransporter ? 'transporter' : ''}
        brand={brand}
        title={data.title}
        url={data.url}
      />
    );
  };

  getInitialContainerSize = () => {
    let initialSize;
    const containerWidth = document
      && document.querySelector(`.PageBuilder-article`)
      && document.querySelector(`.PageBuilder-article`).clientWidth;
    if (parseInt(containerWidth, 10) < 760) {
      initialSize = `w=700&h=305`;
    }
    else if (parseInt(containerWidth, 10) < 1020) {
      initialSize = `w=760&h=405`;
    }
    else {
      initialSize = `w=1340&h=500`;
    }
    this.setState({ initialSize });
  }

  renderEyebrow = (article) => {
    const { brand } = this.props;

    if(brand === DEAL_OR_NO_DEAL) {
      const eyebrow = article.shortestHeadline || '';
      return <span className={styles.eyebrow}>{ eyebrow }</span>
    }

    if(!this.props.isSpecialReport &&
    !article.premium &&
    article.section &&
    article.section.url &&
    article.section.eyebrow) {

     return (
      <MOCKERYLink
        to={article.section.url}
        brand={article.section.brand}
        assetType={article.section.type}
        sectionSubType={article.section.section && article.section.section.subType}
        className={styles.eyebrow}
        native={article.native}
      >
        {article.section.eyebrow}
      </MOCKERYLink>);
    }

    return null;
  };

  getSocialFollowLinks = (data) => {
    const icons = (data || []).map(icon => {
      const { type, displayText } = icon;

      let name = type;

      if (type === 'googlePlus') {
        name = 'instagram';
      }

      return {
        name,
        host: "",
        path: displayText,
      };
    });

    return (
      <SocialIcons
        className={styles.socialIcons}
        listLabel={'follow'}
        labelClassName={styles.label}
        icons={icons} />)
  };

  getBackgroundStyles = (qsAppend, featuredMedia, sizeString) => {
    const { hasBackground, brand } = this.props;

    if(brand === DEAL_OR_NO_DEAL) {
      return {
        backgroundImage: `url(${featuredMedia.url})`
      }
    }

    if(brand === MAKE_IT) {
      return {
        backgroundImage: hasBackground
          ? `url(${featuredMedia.url}${qsAppend}${sizeString})`
          : 'none',
        backgroundSize: this.state.bgSize,
        backgroundRepeat: 'no-repeat',
      };
    }

    return {
      backgroundImage: hasBackground
        ? `url(${featuredMedia.url}${qsAppend}${sizeString})`
        : 'none',
      backgroundSize: this.state.bgSize,
    };
  };

  render() {
    const { data: article, hasBackground, dataId, brand } = this.props;

    if (brandStyles[brand]) {
      styles = brandStyles[brand];
    } else {
      styles = brandStyles[MOCKERY];
    }

    const { socialtoolsEnabled = true } = article || {};
    const isMobile = Breakpoints.isSmallMobile();
    const sizeString = typeof (this.state.sizeString) === "undefined" ? this.state.initialSize : this.state.sizeString;
    if (!article) {
      return (
        <ErrorHandler
          data={{ error: 'Article query came back as null' }}
          errorSource="ArticleHeader"
          errorProps={this.props}
        />
      );
    }

    const qsAppend =
      article.featuredMedia && typeof article.featuredMedia.url === 'string'
        ? article.featuredMedia.url.includes('?') ? '&' : '?'
        : '';

    const imgStyles = this.getBackgroundStyles(qsAppend, article.featuredMedia, sizeString);

    // Counting authors in case we need to hide images.
    let authorCount = 0;

    if (article.author && article.author.length) {
      authorCount = article.author.length;

      if (
        !article.native &&
        Array.isArray(article.sourceOrganization) &&
        article.sourceOrganization[0] &&
        article.sourceOrganization[0].name &&
        article.sourceOrganization[0].name !== 'MOCKERY.com'
      ) {
        authorCount += 1;
      }
    }

    const updatedSeparator = brand === 'makeit' ? <span className={styles.separator}>•</span> : '|';
    let lazyLoaderHeight = '100%';

    if(brand === DEAL_OR_NO_DEAL) {
      lazyLoaderHeight = '0%';
    }

    const brandedText = brand === 'makeit' ? 'Paid Post presented by ' : 'Created for ';

    return (
      <div>
        <header
          className={classnames({
            [styles.articleHeader]: true,
            [styles.makeit]: brand === 'makeit',
          })}
          id={!this.props.isTransporter ? 'main-article-header' : 'transporter-article-header'}
          ref={img => {
            this.img = img;
          }}
        >
          {/* If Full Width Featured Video (makeit only) */}
          {brand === 'makeit' &&
            article.featuredMedia &&
            article.featuredMedia.isHighTouch &&
            article.featuredMedia.type === 'video' && (
              <div
                className={styles.fullWidthVideo}
                style={{ backgroundImage: `url(${article.featuredMedia.url})` }}
              >
                <div className={styles.videoContent}>
                  <div className={styles.videoTitle}>{article.featuredMedia.headline}</div>
                  <div className={styles.videoTime}>
                    <span className="icon-makeit-play" />
                    {TimeConversion.secondsToFormattedTime(article.featuredMedia.duration)}
                  </div>
                  <span className={styles.videoButton}>
                    <span className="icon-makeit-play" />
                  </span>
                </div>
              </div>
            )}

          { (hasBackground || brand === DEAL_OR_NO_DEAL)  ? (
            <LazyLoader height={lazyLoaderHeight}>
              <div className={styles.imageHero} style={imgStyles} />
            </LazyLoader>
          ) : null}
          {hasBackground &&
            article.featuredMedia && (
              <div className={styles.heroDescriptionWrapper}>
                <div className={styles.heroDescription}>
                  <div className={styles.heroDescriptionCaption}>
                    {article.featuredMedia.caption}
                  </div>
                  <div className={styles.heroDescriptionCredit}>
                    {article.featuredMedia.copyrightHolder}
                  </div>
                  {brand === 'makeit' && (
                    <div className={styles.squiggle}>
                      <MakeItPattern
                        type="wavyLine"
                        color={'#68ebca'}
                        height={'4'}
                        width={'40'}
                        patternID={`articleHeader`}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          <div className={hasBackground ? styles.wrapperHero : styles.wrapperHeroNoImage}>
            {article.premium && (
              <div className={styles.proBug}>
                <span className="icon-probug" />
              </div>
            )}
            {/* If native and there is sourceOrganization information */}
            {article.native
              ? article.sourceOrganization &&
              article.sourceOrganization.length &&
              article.sourceOrganization.length > 0 && (
                <div className={styles.brandedTreatment}>
                  {brandedText}
                  {article.sourceOrganization[0].logo ? (
                    <MOCKERYLink
                      to={article.sourceOrganization[0].url}
                      assetType={article.sourceOrganization[0].type}
                    >
                      <LazyLoader>
                        <img
                          src={article.sourceOrganization[0].logo}
                          alt={article.sourceOrganization[0].name}
                        />
                      </LazyLoader>
                    </MOCKERYLink>
                  ) : (
                      <MOCKERYLink
                        to={article.sourceOrganization[0].url}
                        assetType={article.sourceOrganization[0].type}
                      >
                        {article.sourceOrganization[0].name}
                      </MOCKERYLink>
                    )}
                </div>
              )
              : // If not native, if it's not pro article, and there is section info
               this.renderEyebrow(article)
              }

            {this.props.isTransporter ? (
              <MOCKERYLink
                to={article.url}
                assetType={article.type}
                brand={article.brand}
                sectionSubType={article.section && article.section.subType}
                native={article.native}
              >
                <h1 className={styles.headline}>{article.title || article.headline}</h1>
              </MOCKERYLink>
            ) : (
                <h1 className={styles.headline}>{article.title || article.headline}</h1>
              )}

            <div className={styles.time}>
              {article.datePublishedFormatted && (
                <time>{article.datePublishedFormatted}</time>
              )}

              {article.dateLastPublishedFormatted && (
                <span>
                  {' '}
                  <span className={styles.mockeryDivider}>{updatedSeparator}</span>{' '}
                  <time> {article.dateLastPublishedFormatted}</time>
                </span>
              )}
            </div>
            {isMobile && <span>{this.props.mobileImage}</span>}
          </div>

          <div
            className={
              brand === 'makeit' && (!article.featuredMedia || hasBackground)
                ? styles.authorAndShareInline
                : styles.authorAndShare
            }
          >
            {/* If there is a creator overwrite, show that */}
            {article.creatorOverwrite && (
              <div className={styles.authorOverWrite}>
                <Author
                  publisher={
                    !article.native && article.sourceOrganization
                      ? article.sourceOrganization[0]
                      : null
                  }
                  data={{ name: article.creatorOverwrite }}
                  dataId={dataId}
                  brand={brand}
                  authorCount={authorCount}
                />
              </div>
            )}

            {/* Otherwise, show the author if info exists. */}
            {!article.creatorOverwrite && article.author && article.author.length ? (
              <div className={styles.authorContainer}>
                {(article.author || []).map((authorData, i) => (
                  <div className={styles.author} key={i}>
                    {brand === 'makeit' &&
                      article.author.length > 1 &&
                      i > 0 && (
                        <div className={styles.verticalSquiggle}>
                          <MakeItPattern
                            type="wavyLine"
                            color={'#68ebca'}
                            height={'4'}
                            width={'40'}
                            patternID={`articleHeader`}
                          />
                        </div>
                      )}
                    <Author
                      publisher={
                        !article.native && i === 0 && article.sourceOrganization
                          ? article.sourceOrganization[0]
                          : null
                      }
                      data={authorData}
                      hideAuthorImages={authorCount > 2}
                      dataId={dataId}
                      brand={brand}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            {/* If no creatoroverwrite, not native, and no author but a sponsor exists. */}
            {!article.creatorOverwrite &&
              !article.native &&
              Array.isArray(article.author) &&
              !article.author.length &&
              Array.isArray(article.sourceOrganization) &&
              article.sourceOrganization.length &&
              article.sourceOrganization[0].name !== 'MOCKERY.com' && (
                <div className={styles.authorContainer}>
                  <div className={styles.author}>
                    <Author
                      publisher={article.sourceOrganization[0]}
                      data={{}}
                      dataId={dataId}
                      brand={brand}
                      authorCount={authorCount}
                    />
                  </div>
                </div>
              )}
            {this.renderShare({ socialtoolsEnabled })}
          </div>
        </header>
      </div>
    );
  }
}

export { ArticleHeader };

/**
 * @type {function}
 * Maps articleTitle global state property as a prop on this component.
 */
function mapStateToProps(state) {
  return {
    articleTitle: state.navStatus.articleTitle,
  };
}

/**
 * @type {object}
 * Maps setNavArticleTitle action dispatcher as a prop on this component.
 */
const mapDispatchToProps = {
  setNavArticleTitle,
  setNavArticleSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleHeader);
