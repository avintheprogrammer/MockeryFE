/* eslint-disable no-restricted-syntax */
import React from 'react';
import TweetEmbed from 'react-tweet-embed-in-span';

// MOCKERY Components
import ArticleTable from '../components/Article/ArticleTable';
import SmallStockQuote from '../components/SmallStockQuote';
import Pullquote from '../components/Article/Pullquote';
import InlineImage from '../components/Article/InlineImage';
import WildcardEmbed from '../components/Article/WildcardEmbed';
import WebService from '../components/Article/WebService';
import WebResource from '../components/Article/WebResource';
import MarketMovers from '../components/MarketsModule/MarketMovers';
import MOCKERYLink from '../utilities/MOCKERYLink';

// Buffett Components
import { Pullquote as BuffettPullquote } from '../components/Article/Pullquote/Buffett';

import possibleStandardNames from './PossibleStandardNames';
import { isString } from './Strings';
import { containsValue } from './Objects';
import Placeholder from '../components/Video/UniversalVideoPlayer/PlaceHolder';

// MPS Components
import MidResponsive from '../components/Mps/AdUnits/MidResponsive';
import BoxInline from '../components/Mps/AdUnits/BoxInline';
/**
 * @type {function}
 * React requires some attributes to be cased differently. Maps over the attributes and references a mapping file to
 * change the properties to correct casing.
 * @param {object} attrs Object of attributes as provided by graphQL body response from article query.
 * @returns {object} Re-mapped object with proper object keys.
 */

function standardizeAttributes(attrs = {}) {
  return Object.entries(attrs).reduce((resolved, item) => {
    const [key, value] = item;
    const match =
      possibleStandardNames[key] || containsValue({ obj: possibleStandardNames, value: key });

    resolved[match || key.toLowerCase()] = value; // eslint-disable-line

    return resolved;
  }, {});
}

export default function toJSX({
  json = [],
  themeColor,
  styles,
  type,
  isKeyPoints = false,
  dataId,
  brand,
}) {
  /* regex for twitter embed */
  const TWITTER_ID_REGEX = /(\/+|[0-9]*)(?=\?|$)/g;
  return json.map((item, key) => {
    if (isString(item)) return item;

    const { tagName, children = [], attributes = {}, data = {} } = item;

    if (!tagName) return null;

    if (
      isKeyPoints &&
      (tagName === 'chart' ||
        tagName === 'mockeryvideo' ||
        tagName === 'security' ||
        tagName === 'company' ||
        tagName === 'image' ||
        tagName === 'wildcard')
    ) {
      return null;
    }

    if (tagName === 'subtitle' && children.length) {
      return (
        <div
          className={type === 'slideshow' ? styles.slideshowSubtitle : styles.subtitle}
          key={key}
        >
          { toJSX({ json: children, themeColor, styles, type, isKeyPoints, dataId, brand }) }
        </div>
      );
    }

    if (tagName === 'midResponsive') {
      return <MidResponsive dataId={`MidResponsive-${dataId}`} key={key} brand={brand} />
    }

    if (tagName === 'boxInline') {
      return <BoxInline dataId={`BoxInline-${dataId}`} key={key} brand={brand} />
    }

    if (tagName === 'pullquote' &&
      Array.isArray(children) &&
      children.length) {
      // Pull in the proper data and make sure it exists.
      let theQuote = children.filter(child => child.tagName === 'pullquote_quote');
      let theTitle = children.filter(child => child.tagName === 'pullquote_title');
      let theAttribution = children.filter(child => child.tagName === 'pullquote_attribution');
      theQuote = theQuote.length ? theQuote[0].children[0] : '';
      theTitle = theTitle.length ? theTitle[0].children[0] : '';
      theAttribution = theAttribution.length ? theAttribution[0].children[0] : '';
      const buffettData = { text: theQuote, label: theAttribution }

      switch (brand) {
        case 'buffett':
          return (
            <BuffettPullquote
              themeColor={themeColor}
              key={key}
              dataId={dataId}
              pageType='article'
              data={buffettData}
            />
          );
        default:
          return (
            <Pullquote
              themeColor={themeColor}
              key={key}
              quote={theQuote}
              title={theTitle}
              attribution={theAttribution}
              dataId={dataId}
              brand={brand}
            />
          );
      }
    }

    if (
      tagName === 'chart' &&
      attributes &&
      attributes.chartType === 'csv'
    ) {
      return <ArticleTable key={key} data={attributes} themeColor={themeColor} dataId={dataId} brand={brand} />;
    }

    if (tagName === 'mockeryvideo') {
      return (
        <Placeholder
          key={key}
          isPro={false}
          isLive={false}
          isPackage={false}
          cardType={'featured-rectangle-media'}
          brand={brand}
          packageTitle={''}
          videoData={data}
          videoAttributes={attributes}
          inlineVideoPlayback
          inlineVideoComponent
          id={`ArticleBody-Video-${data.id}`}
          dataId={`ArticleBody-Video-${data.id}`}
        />
      );
    }

    if (
      tagName === 'chart' &&
      attributes &&
      attributes.chartType === 'stock'
    ) {
      return (
        <ArticleTable
          key={key}
          isMarketTable
          issueIds={attributes.tickerIssueDetails}
          hasIssueIds={
            attributes.tickerIssueDetails &&
            attributes.tickerIssueDetails.length &&
            attributes.tickerIssueDetails.length > 0
          }
          themeColor={themeColor}
          headline={attributes.headline}
          headers={attributes.headers}
          brand={brand}
          dataId={dataId}
        />
      );
    }

    if (tagName === 'security' || tagName === 'company') {
      return (
        (attributes.symbol) && (
          <SmallStockQuote
            issueId={attributes.issueId}
            symbol={attributes.symbol}
            key={key}
            dataId={dataId}
            parentType={'article'}
            url={attributes.url ? attributes.url : ''}
          />
        )
      );
    }

    if (
      tagName === 'chart' &&
      attributes &&
      attributes.chartType === 'image'
    ) {
      const { image = {}, headline = '' } = attributes;
      const imageData = {
        featuredMedia: {
          url: image.url,
          headline,
        },
      };

      return (
        <InlineImage
          brand={brand}
          key={key}
          data={imageData}
          dataId={`ArticleBody-ChartImage-${attributes.id}`}
          shouldCrop={false}
        />
      );
    }

    if (tagName === 'blockquote'&& children.length) {
      return (
        <div
          className={styles.blockquote}
          key={key}
        >
          { toJSX({ json: children, themeColor, styles, type, isKeyPoints, dataId, brand }) }
        </div>
      );
    }

    if (tagName === 'image') {
      const imageData = { featuredMedia: attributes };
      return (
        <InlineImage
          brand={brand}
          key={key}
          data={imageData}
          dataId={`ArticleBody-InlineImage-${attributes.id}`}
        />
      );
    }

    if (tagName === 'wildcard') {
      return <WildcardEmbed key={key} id={attributes.id} dataId={dataId} />;
    }

    if (tagName === 'webservice') {
      if (attributes.widgetName === 'market_movers_mockery') {
        return <MarketMovers key={key} id={attributes.id} dataId={dataId} />
      }
      return <WebService key={key} id={attributes.id} dataId={dataId} />;
    }

    if (tagName === 'webresource') {
      return (
        <WebResource key={key} href={attributes.href} title={attributes.headline} dataId={dataId} />
      );
    }

    if (
      tagName === 'a' &&
      attributes.href &&
      isString(attributes.href) &&
      attributes.href.indexOf('https://twitter.com') >= 0
    ) {
      const txt = attributes.href;
      const match = TWITTER_ID_REGEX.exec(txt);
      if (match && match.length > 0) {
        return <TweetEmbed key={key} id={match[0]} />;
      }
    }

    if (tagName === 'a') {
      return (
        <MOCKERYLink
          to={attributes.href}
          pageID={Number(attributes.id) || 0}
          assetType={attributes.type}
          premium={attributes.premium}
          brand={attributes.brand}
          sectionSubType={attributes.section && attributes.section.subType}
          native={attributes.native}
        >
          { toJSX({ json: children, themeColor, styles, type, isKeyPoints, dataId, brand }) }
        </MOCKERYLink>
      )
    }

    const options = Object.assign({ key }, standardizeAttributes(attributes));
    if ('href' in options) {
      options.href = options.href ? options.href : '#';
    }
    const childMap = children.length
      ? toJSX({ json: children, themeColor, styles, type, isKeyPoints, dataId, brand })
      : undefined;

    return React.createElement(tagName === 'group' ? 'div' : tagName, options, childMap);
  });
}
