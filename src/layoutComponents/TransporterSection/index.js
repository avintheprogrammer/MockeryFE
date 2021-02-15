import React from 'react';
import PropTypes from 'prop-types';

import ErrorHandler from '../../components/ErrorHandler';

import Layout from '../../components/Layout';
import SectionWrapper from '../../components/SectionWrapper';
import TimeConversion from '../../utilities/TimeConversion';
import missingImage from '../../assets/images/MOCKERY-missing-img.jpg';
import Button from '../../components/Button';
import { MOCKERY } from '../../utilities/Constants';

const styles = require('./styles.mockery.scss');

/**
 * Pure React component that acts as a higher-order component to render the proper Transporter Section with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {number} dataId Tracking ID used for testing.
 * @returns {function} A React component that renders out the Article Banner.
 */
const TransporterSection = props => {
  const { data: assetList, title, url, articleId, dataId, type, brand, attributes = {} } = props;

  if (!assetList) {
    return (
      <ErrorHandler
        data={{ error: 'AssetList query came back as null' }}
        errorSource="TransporterSection"
        errorProps={props}
      />
    );
  }

  if (!Array.isArray(assetList.assets) || assetList.assets.length < 3) return null;

  // Organize the cards to fit data expectations.
  let theCards = assetList.assets.map(asset => {
    const byline = asset.author && asset.author.length ? asset.author[0].name : '';
    const bylineUrl = asset.author && asset.author.length > 0 ? asset.author[0].url : '';
    return {
    id: asset.id,
    title: asset.title || '',
    type: asset.type || '',
    isLive: false,
    isPro: false,
    image: asset.promoImage ? asset.promoImage.url : missingImage,
    byline: asset.creatorOverwrite ? asset.creatorOverwrite : byline,
    bylineUrl: asset.creatorOverwrite ? '#' : bylineUrl,
    datePublished: asset.datePublished,
    dateModified: asset.dateModified,
    url: asset.url ? asset.url : '#',
    formattedTimeStamp: asset.dateLastPublishedSixHr,
    videoTime: TimeConversion.secondsToFormattedTime(asset.duration) || '00:00',
    mediaType: asset.type === 'mockeryvideo' ? 'video' : '',
    brand: asset.brand,
    section: asset.section,
    native: asset.native || false,
  }});
  // Filter any duplicates.
  theCards = theCards.filter(card => card.id !== articleId);
  if (theCards.length === 0) return null;

  if(attributes.makeit){
    return (
      <div>
        <SectionWrapper
          brand={brand}
          title={title ? `More In ${title}` : 'More'}
          dataId={dataId}
          titleLink={url}
          assetType={type}
          attributes={attributes}>
          <Layout cards={theCards} layoutType="square-lead" dataId={`transporterSection-${dataId}`} brand={brand} />
          {url && ( <Button buttonName='Read More' url={url} brand={brand} /> )}
        </SectionWrapper>
      </div>
    );
	}
  return (
    <div>
      <SectionWrapper title={title ? `More In ${title}` : 'More'} dataId={dataId} titleLink={url} assetType={type} brand={brand}>
        <Layout brand={assetList.brand} cards={theCards} layoutType="square-lead" dataId={`transporterSection-${dataId}`} />
        {url && (
          <div className={styles.buttonContainer}>
            <a className={styles.loadMoreButton} href={url || '#'}>
              Read More <span className={'icon-arrow-down-readmore'} />
            </a>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 * @property {string} title The title of the section.
 * @property {string} url The url of the section.
 * @property {string} type The type of the section which will go as assetType fo SPA module.
 * @property {number} articleId The id of the current article. Used to de-dupe if necessary.
 */
TransporterSection.propTypes = {
  data: PropTypes.object.isRequired,
  attributes: PropTypes.object,
  articleId: PropTypes.number.isRequired,
  title: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  brand: PropTypes.string,
};

TransporterSection.defaultProps = {
  title: null,
  url: null,
  type:'',
  dataId: 0,
  brand: MOCKERY,
  attributes: {},
};

export { TransporterSection };

export default TransporterSection;
