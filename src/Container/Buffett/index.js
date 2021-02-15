import React from 'react';

import Layout from 'components/Layout';
import BorderedContainer from 'components/BorderedContainer/Buffett';
import Search from 'components/Search';
import PlaylistBreaker from 'components/Breakers/PlaylistBreaker';
import BrandPageWrapper from 'containers/BrandPageWrapper';

import { BUFFETT } from 'utilities/Constants';

import {
  buffettNewsCards,
  buffettOnXCards,
} from 'components/Card/__mocks__/cardMocks';

import styles from './styles.scss';

/**
 * Buffett Component
 * Responsible for rendering out our Buffet components
 * Also constructs the base grid elements for our layout.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 */

const Buffett = () => (
  <BrandPageWrapper brand="buffett" page="home">
    <div className={styles.page}>
      <BorderedContainer title={'Search the '} emphasis={'Archive'}>
        <div className={styles.buffettSearchWrapper}>
          <Search brand="buffett" shouldAutoFocus={false} />
        </div>
      </BorderedContainer>

      <div className={styles.buffettComponent}>
        <div className={styles.buffettHeader}>
          Featured on <span>Buffett Archive</span>
        </div>
      </div>

      <BorderedContainer title={'Buffett on '} emphasis={"'X'"}>
        <PlaylistBreaker brand={BUFFETT} cards={buffettOnXCards} />
      </BorderedContainer>

      <div className={styles.buffettComponent}>
        <div className={styles.buffettHeader}>
          <span>Buffett</span> News
        </div>

        <div className={styles.row}>
          <div className={styles.buffettComponentContainer}>
            <div className={styles.buffettComponentGrid}>
              <div className={styles.buffettComponentBox}>
                <Layout
                  cards={buffettNewsCards}
                  layoutType="single-lead"
                  hasPackage="right"
                  packageTitle="package title"
                  brand="buffett"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BrandPageWrapper>
);

export default Buffett;
