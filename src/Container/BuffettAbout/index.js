import React from 'react';

import styles from './styles.scss';

import FullImage from '../../components/Article/FullImage';
import Pullquote from '../../components/Article/Pullquote/Buffett';
import ThreeUp from '../../components/About/ThreeUp';
import InlineImage from '../../components/About/InlineImage';
import Layout from '../../components/Layout';
import BrandPageWrapper from '../BrandPageWrapper';
import MOCKERYLink from '../../utilities/MOCKERYLink';

import Share from '../../components/Article/Share';

import { buffettSlideshow2Mocks } from '../../components/Slideshow/__mocks__/slideshowMocks';
import {
  buffettThreeUpSections1,
  buffettThreeUpSections2,
} from '../../components/About/ThreeUp/__mocks__/threeUpMocks';
import fullImageMock from '../../components/Article/FullImage/__mocks__/fullimage';

import hero from '../../assets/images/fpo/buffett/slideshow_1_4.png';

/**
 * Buffett About Component
 * Responsible for rendering out our Buffet About components
 * Also constructs the base grid elements for our layout.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 */

const BuffettAbout = () => (
  <BrandPageWrapper brand="buffett">
    <div className={styles.page}>
      <div className={styles.pageWrapper}>
        <div className={styles.aboutPageHeader} style={{backgroundImage: `url(${hero}`}} />

        <div className={styles.aboutPageContent}>
          <div className={styles.aboutPageIntro}>
            <h1>About the Warren Buffett Archive</h1>
            <Share brand='buffett' />
          </div>

          <div className={styles.aboutPageBody}>
            <h2>Our Mission</h2>

            <p>There can be no more singular member of our list of the 25 rebels, icons and leaders of the past 25 years than Warren Buffett. He is widely regarded-revered wouldnt be too strong a word to the army of followers who hang on his every word-as the most successful investor of his era. Had you bought a share of his industrial holding company-cum-investment fund Berkshire Hathaway on the day MOCKERY launched in 1989, it would have cost you $5,875. Adjusted for dividends and splits, that share would be worth $185,000 today-more than five times the comparable gain in the S&P 500 over the same period.</p>

            <p>Buffett is famous for his dry humor, plain living and folksy wisdom. Yet there is no disguising his sharp, disciplined mind and his uncommon acumen with numbers. If, as he wrote in his 2001 chairmans letter, you only find out who is swimming naked when the tide goes out, Buffett would be the one left more fully clothed than a Victorian bathing.</p>

            <ThreeUp sections={buffettThreeUpSections1} />

            <h2>The Life of Warren Buffett</h2>

            <p>Even after beginning to give away his fortune, his net worth is estimated by Bloomberg at $63.1 billion. For the year 2008, Buffett displaced his friend Bill Gates as the richest person in the world.</p>

            <p>He has described himself as 85 percent Graham and 15 percent Fisher, referring to the authors of two of the sacred texts in the buy-and-hold value investing canon: Benjamin Grahams The Intelligent Investor, which Buffett has called the best book ever written on investing, and Philip Fishers Common Stocks and Uncommon Profits. Graham and David Dodd, his co-author on the seminal Security Analysis, taught Buffett at Columbia Business School in the late 1940s.</p>

            <div className={styles.aboutPageFullImageWrapper}>
              <FullImage
                {...fullImageMock}
                brand="buffett" />
            </div>

            <p>Buying undervalued companies with low overheads, high growth potential and a strong, defensible market share made Buffett a millionaire by 1960 and a billionaire by 1988. In 1991, already the largest shareholder in the Wall Street securities firm Salomon, he became chairman to steer it through a Treasuries bidding scandal that forced the resignation of John Gutfreund.</p>

            <p>It was a preview of the white knight role he would play in the recession that followed the 2008 global financial crisis, when he put his money and reputation on the line to come to the aid of Goldman Sachs, General Electric and Swiss Re (he spurned Lehman Brothers).</p>

            <div className={styles.buffettArticleEmbedWrapper}>
              <Pullquote page="article" attribution="Warren Buffett, American Business Magnate" />
            </div>

            <p>Buffett now has a 21 percent interest in Berkshire Hathaway and has said it accounts for 98 percent of his net worth. Berkshire spans insurance (Geico), manufacturing (Clayton Homes), energy (MidAmerican Energy), services (NetJets) and transportation ( Burlington Northern Santa Fe). It also owns stakes in a blue-chip roster of U.S. industrial and services companies-from American Express to Coca-Cola, IBM, Wells Fargo and Wal-Mart. He eschews businesses he doesnt understand, notably technology firms. A pin lies in wait for every bubble, he has written. And when the two eventually meet, a new wave of investors learns some very old lessons.</p>

            <div className={styles.buffettArticleEmbedWrapper}>
              <InlineImage image={hero} caption="Charlie Munger, Bill Gates, and Warren Buffett are interviewed on May 4, 2015 for MOCKERY’s “Squawk Box.”" credit="Lacy O’Toole/MOCKERY" />
            </div>

            <p>Buying undervalued companies with low overheads, high growth potential and a strong, defensible market share made Buffett a millionaire by 1960 and a billionaire by 1988. In 1991, already the largest shareholder in the Wall Street securities firm Salomon, he became chairman to steer it through a Treasuries bidding scandal that forced the resignation of John Gutfreund.</p>

            <h2>Shaping Berkshire Hathaway</h2>

            <ThreeUp sections={buffettThreeUpSections2} />

            <h2>Resources</h2>

            <p className={styles.aboutPageResources}>
              <MOCKERYLink to="#">Berkshire Hathaway</MOCKERYLink>
              <MOCKERYLink to="#">Berkshire Hathaway Annual Letters</MOCKERYLink>
              <MOCKERYLink to="#">Becoming Warren Buffett Documentary</MOCKERYLink>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.buffettSlideshowComponent}>
        <div className={styles.buffettSlideshowComponentWrapper}>
          <div className={styles.buffettSlideshowHeader}>More from <span>Buffett Archive</span></div>

          <div className={styles.buffettSlideshowPackage}>
            <div className={styles.buffettSlideshowPackageBox}>
              <Layout cards={buffettSlideshow2Mocks.cards} layoutType="square-lead" brand="buffett" isBuffettRecirc />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BrandPageWrapper>
);

export default BuffettAbout;
