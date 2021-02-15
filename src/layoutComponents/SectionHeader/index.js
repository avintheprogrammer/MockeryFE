/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Banner from '../../components/Article/Banner';
import ErrorHandler from '../../components/ErrorHandler';

const DEFAULT_COLOR = '#002f6c';

/**
 * Pure React component that acts as a higher-order component to render the proper Section Header with the right props.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 * @param {object} data Object containing information about the article passed down from GraphQL.
 * @param {number} dataId Data id used for testing.
 * @returns {function} A React component that renders out the Article Banner.
 */
const SectionHeader = (props) => {
  const {data: article, logoType, dataId} = props;

  // Don't render if the section is null.
  if (!article || !article.section) {
    return (
      <ErrorHandler
        data={{ error: 'Article query came back as null' }}
        errorSource="SectionHeader"
        errorProps={props}
      />
    );
  }

  // Setting up eyebrow and background type.
  let eyebrowType = 'text';
  let backgroundType = 'color';

  // Setting the section color.
  let sectionColor = DEFAULT_COLOR;

  if (article.section.color !== null) {
    sectionColor = article.section.color;
  }

  if (article.section.logo && article.section.logo.url) {
    eyebrowType = logoType;
  }
  if (article.section.headerImage && article.section.headerImage.url) {
    backgroundType = 'image';
  }

  return (
    <Banner
      data={article}
      eyebrowType={eyebrowType}
      backgroundType={backgroundType}
      sectionColor={sectionColor}
      dataId={dataId}
      brand={article.brand}
    />
  );
};

/**
 * @type {object}
 * Sets up type checking for props.
 * @property {object} data The data received as a response from GraphQL.
 */
SectionHeader.propTypes = {
  data: PropTypes.object.isRequired,
  logoType: PropTypes.string.isRequired,
  dataId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SectionHeader.defaultProps = {
  dataId: 0,
};

export { SectionHeader };

export default SectionHeader;
