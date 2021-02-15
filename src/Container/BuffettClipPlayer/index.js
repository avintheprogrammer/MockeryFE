import React from 'react';

import styles from './styles.scss';

import ClipVideoHero from '../../components/ClipVideoHero/Buffett';
import DynamicContentFeed from '../../components/DynamicContentFeed';
import BrandPageWrapper from '../BrandPageWrapper';

import { buffettClipVideoHeroMocks } from '../../components/ClipVideoHero/__mocks__/clipVideoHeroMocks';
import { contentBuffettCardMocks } from '../../components/DynamicContentFeed/__mocks__/dynamicContentCardMocks';

/**
 * Buffett Clip Player Component
 * Responsible for rendering out our Buffet Clip Player components
 * Also constructs the base grid elements for our layout.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 */

const BuffettClipPlayer = () => (
  <BrandPageWrapper brand="buffett">
    <div className={styles.pageDark}>
      <ClipVideoHero data={buffettClipVideoHeroMocks} dark />

      <div className={styles.buffettClipPageComponentRecirc}>
        <div className={styles.buffettClipPageComponentWrapper}>
          <div className={styles.buffettClipPageHeader}><span>Buffett</span> Clips</div>

          <div className={styles.buffettClipPagePackage}>
            <div className={styles.buffettClipPagePackageBox}>
              <DynamicContentFeed cards={contentBuffettCardMocks} brand="buffett" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BrandPageWrapper>
);

export default BuffettClipPlayer;
