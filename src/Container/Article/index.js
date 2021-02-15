import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from '../../components/Article/Sidebar';
import FullImage from '../../components/Article/FullImage';
import Body from '../../components/Article/Body';
import Header from '../../components/Article/ArticleHeader';
import AdTopBanner from '../../components/Mps/AdUnits/TopBanner';
import ArticleAd from '../../components/ArticleAd';

// Importing the named export and mock to manually add an unintegrated component.
import { Banner } from '../../components/Article/Banner';
import bannerMock from '../../components/Article/Banner/__mocks__/banner';
import { KeyPoints } from '../../components/Article/KeyPoints';
import keyPointsMock from '../../components/Article/KeyPoints/__mocks__/keyPoints';
import fullImageMock from '../../components/Article/FullImage/__mocks__/fullimage';

const styles = require('../PageBuilder/styles.mockery.scss');

const Article = props => {
  const { data } = props;

  const { article } = data;

  return (
    <div className={styles.page}>
      <div className={styles.pageGrid}>
        <div className={styles.pageWrapper}>
          <div className={styles.pageRow}>
            <div className={styles['col-12']}>
              <AdTopBanner />
            </div>
          </div>

          <div className={styles.pageRow}>
            <div className={styles['col-12']}>
              {/* To render an unintegrated component, provide a data prop instead of an id prop */}
              <Banner data={bannerMock} />
            </div>
          </div>

          <div className={styles.pageRow}>
            <div className={styles['col-12']}>
              <Header id={104314759} />
            </div>
          </div>

          <div className={styles.pageRow}>
            <div className={styles['col-8']}>
              <KeyPoints data={keyPointsMock} />
              <Body content={article.body} themeColor={article.section.color} />
              <FullImage {...fullImageMock} />
            </div>
            <div className={styles['col-4']}>
              <Sidebar>
                <ArticleAd />
              </Sidebar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Article.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Article;
