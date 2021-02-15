import React from 'react';

import fpo from 'assets/images/fpo/buffethub_bg.jpg';
import MeetingCard from 'components/Breakers/PlaylistBreaker/MeetingCard';
import BuffettClips from 'components/BuffettClips';
import CollectionHubHeader from 'components/CollectionHub/CollectionHubHeader/Buffett';
import { BUFFETT } from 'utilities/Constants';

import {
  buffettAnnualMeetingsCards1,
  buffettAnnualMeetingsCards2,
} from 'components/Card/__mocks__/cardMocks';

import BrandPageWrapper from '../BrandPageWrapper';

import styles from './styles.scss';

/**
 * Buffett Annual Meetings Component
 * Responsible for rendering out our Buffet components
 * Also constructs the base grid elements for our layout.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 */

const BuffettAnnualMeetings = () => {
  const backgroundImage = {
    backgroundImage: `url(${fpo})`,
  };

  return (
    <BrandPageWrapper brand="buffett">
      <div className={styles.page} style={backgroundImage}>
        <CollectionHubHeader
          title="Annual Meetings"
          copy="Berkshire Hathaway’s annual meetings are a financial pilgrimage, drawing throngs of Warren Buffett’s admirers from around the globe to witness him and his vice chairman, Charlie Munger, take questions from journalists, analysts, and shareholders for seven hours in Omaha, Nebraska."
        />

        <div className={styles.grid}>
          <div className={styles.gridSelectWrapper}>
            <select className={styles.gridSelect}>
              <option value="Decade: 2000s">Decade: 2000&apos;s</option>
              <option value="Decade: 1990s">Decade: 1990&apos;s</option>
              <option value="Decade: 1980s">Decade: 1980&apos;s</option>
              <option value="Decade: 1970s">Decade: 1970&apos;s</option>
            </select>
            <span className={`${styles.gridSelectIcon} icon-buffett-chevron-down`} />
          </div>

          <div className={styles.container}>
            {buffettAnnualMeetingsCards1.map(card => (
              <div className={styles.gridItem}>
                <MeetingCard
                  brand={BUFFETT}
                  year={card.year}
                  eyebrow={card.eyebrow}
                  description={card.description}
                />
              </div>
            ))}
          </div>
        </div>

        <BuffettClips id={104847528} />

        <div className={styles.grid}>
          <div className={styles.container}>
            {buffettAnnualMeetingsCards2.map(card => (
              <div className={styles.gridItem}>
                <MeetingCard
                  year={card.year}
                  eyebrow={card.eyebrow}
                  description={card.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrandPageWrapper>
  );
};

export default BuffettAnnualMeetings;
