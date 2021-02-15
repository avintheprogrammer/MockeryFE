import React from 'react';

import styles from './styles.scss';

import Header from '../../components/Slideshow/SlideshowHeader/Buffett';
import FullImage from '../../components/Article/FullImage';
import Pullquote from '../../components/Article/Pullquote/Buffett';
import Card from '../../components/Card';
import InlineImage from '../../components/Article/InlineImage';
import Layout from '../../components/Layout';
import BrandPageWrapper from '../BrandPageWrapper';

import {
  buffettSlideshow1Mocks,
  buffettSlideshow2Mocks,
} from '../../components/Slideshow/__mocks__/slideshowMocks';
import { buffettFeaturedCards } from '../../components/Card/__mocks__/cardMocks';
import { buffettInlineImageLocalMock } from '../../components/Article/InlineImage/__mocks__/inlineimage';
import fullImageMock from '../../components/Article/FullImage/__mocks__/fullimage';

/**
 * Buffett Article Component
 * Responsible for rendering out our Buffet Article components
 * Also constructs the base grid elements for our layout.
 * @type {Function<Object>:React.Component}
 * @constructor
 * @augments {React.Component}
 */

const BuffettArticle = () => (
  <BrandPageWrapper brand="buffett">
    <div className={styles.page}>
      <div className={styles.pageWrapper}>
        <Header
          image={buffettSlideshow2Mocks.header.image}
          eyebrow={buffettSlideshow2Mocks.header.eyebrow}
          title={buffettSlideshow2Mocks.header.title}
          timestamp={buffettSlideshow2Mocks.header.timestamp}
          description={buffettSlideshow2Mocks.header.description}
          authors={buffettSlideshow2Mocks.header.authors}
          dark={buffettSlideshow2Mocks.dark}
        />

        <div className={styles.bodyWrapper}>
          <p>As much as the letters are about the numbers and how portfolio companies are doing, a lot of text is dedicated to the people behind the numbers. Warren Buffett (and Charlie Munger) have perfected the art of empowering the right people to achieve phenomenal outcomes. Its unsurprising, its the foundation of the relationship between these long term friends.</p>

          <div className={styles.buffettArticleEmbedWrapper}>
            <Card
              key={buffettSlideshow1Mocks.slides[0].card.timestamp}
              title={buffettSlideshow1Mocks.slides[0].card.title}
              isPro={false}
              isLive={false}
              image={buffettSlideshow1Mocks.slides[0].card.image}
              byline={buffettSlideshow1Mocks.slides[0].card.byline}
              timestamp={buffettSlideshow1Mocks.slides[0].card.date}
              videoTime={buffettSlideshow1Mocks.slides[0].card.videoTime}
              mediaType={buffettSlideshow1Mocks.slides[0].card.mediaType}
              isPackage={false}
              cardType={'featured-rectangle-media'}
              packageTitle={''}
              brand={'buffett'}
              dark
              isSlideshow
            />
          </div>

          <p>This plays out again and again in the selection of the companies in the BRK portfolio. The fundamentals have to be sound, the leadership has to have integrity and the numbers have to make sense. In that order.</p>

          <p>In almost all of the letters is the statement, As much as Charlie and I talk about intrinsic business value, we cannot tell you precisely what that number is for Berkshire shares (nor, in fact, for any other stock), in talking about Intrinsic Business Value. For men who are as successful as Warren Buffet and Charlie Munger (if unconstrained by regulations) they could get away with throwing out numbers but it seems to always come back to what they believe.</p>

          <p>This level of attention is obviously paid to BRK culture. When I first wrote the earlier version of this post in 2015, I wondered what Warren Buffetts views were on Uber and the issues with company culture that the company had back then. Unfortunately, nothing much has changed. The 2010 letter quoted Churchill saying, You shape your houses and then they shape you.</p>

          <p>Whether you choose to pay attention to it or not, your company has a culture.</p>

          <FullImage
            {...fullImageMock}
            brand="buffett"
          />

          <p>Until Warren Buffett met Charlie Munger he was making money (lots of it) buying fair businesses at wonderful prices, but Charlie got him to change his mind and focus on buying wonderful businesses at fair prices.</p>

          <p>Ponder that. When was the last time you changed your mind and stopped doing something that seemed to be working for you because someone gave you better advice? Might be time to change some things.</p>

          <p>The foundation will receive 5% of the total each July, beginning in 2006. (The pledge is conditional upon the foundations giving away each year, beginning in 2009, an amount that is at least equal to the value of the entire previous years gift from Buffett, in addition to 5% of the foundations net assets.) Buffett joined the Gates Foundations board, but did not plan to be actively involved in the foundations investments.</p>

          <p>Warren Buffett is a man of high aspiration, despite all hes achieved. You can still sense this in the light hearted tone the annual letters take. Quoting: With the acquisition of Van Tuyl, BRK now owns 91⁄2 companies that would be listed on the Fortune 500 were they independent (Heinz is the 1⁄2). That leaves 4901⁄2 fish in the sea. Our lines are out.</p>

          <div className={styles.buffettArticleEmbedWrapper}>
            <Pullquote page="article" attribution="Warren Buffett, American Business Magnate" />
          </div>

          <p>The foundation will receive 5% of the total each July, beginning in 2006. (The pledge is conditional upon the foundations giving away each year, beginning in 2009, an amount that is at least equal to the value of the entire previous years gift from Buffett, in addition to 5% of the foundations net assets.) Buffett joined the Gates Foundations board, but did not plan to be actively involved in the foundations investments.</p>

          <p>The letters are written in simple plain language. But the simplicity belies the complex nature of the concepts being discussed. It speaks to understanding the businesses at a level higher than most experts out there.</p>

          <div className={styles.buffettArticleEmbedWrapper}>
            <InlineImage data={buffettInlineImageLocalMock} brand="buffett" />
          </div>

          <p>The foundation will receive 5% of the total each July, beginning in 2006. (The pledge is conditional upon the foundations giving away each year, beginning in 2009, an amount that is at least equal to the value of the entire previous years gift from Buffett, in addition to 5% of the foundations net assets.) Buffett joined the Gates Foundations board, but did not plan to be actively involved in the foundations investments.</p>

          <p>The letters are written in simple plain language. But the simplicity belies the complex nature of the concepts being discussed. It speaks to understanding the businesses at a level higher than most experts out there.</p>

          <p>We are ego-driven animals but in all the letters Buffett talks about successes as well as failure with the same depth and lightness. In the 2014 letter Warren Buffett writes, A few, however, have very poor returns, the result of some serious mistakes I made in my job of capital allocation.</p>

          <h3>Ethereum high-profile corporate backers</h3>

          <ul>
            <li>Microsoft</li>
            <li>JPMorgan Chase & Co</li>
            <li>ING</li>
            <li>UBS</li>
            <li>Thomson Reuters</li>
          </ul>

          <p>We are ego-driven animals but in all the letters Buffett talks about successes as well as failure with the same depth and lightness. In the 2014 letter Warren Buffett writes, A few, however, have very poor returns, the result of some serious mistakes I made in my job of capital allocation.</p>

          <h3>Millarworld Franchises</h3>

          <ol>
            <li>Wanted ― $134m Total Gross</li>
            <li>Kingsman: The Secret Service of Men Who Hunt Treasures ― $128m Total Gross</li>
            <li>Kickass ― $48m Total Gross</li>
            <li>Reborn ― $34m Total Gross</li>
          </ol>

          <h2>New Legacy</h2>

          <p>The foundation will receive 5% of the total each July, beginning in 2006. (The pledge is conditional upon the foundations giving away each year, beginning in 2009, an amount that is at least equal to the value of the entire previous years gift from Buffett, in addition to 5% of the foundations net assets.) Buffett joined the Gates Foundations board, but did not plan to be actively involved in the foundations investments.</p>

          <p>The letters are written in simple plain language. But the simplicity belies the complex nature of the concepts being discussed. It speaks to understanding the businesses at a level higher than most experts out there.</p>

          <p>We are ego-driven animals but in all the letters Buffett talks about successes as well as failure with the same depth and lightness. In the 2014 letter Warren Buffett writes, A few, however, have very poor returns, the result of some serious mistakes I made in my job of capital allocation.</p>
        </div>
      </div>

      <div className={`${styles.buffettSlideshowComponentDark} ${styles.buffettSlideshowComponentRecirc}`}>
        <div className={styles.buffettSlideshowComponentWrapper}>
          <div className={styles.buffettSlideshowHeaderDark}>More from <span>Buffett Archive</span></div>

          <div className={styles.buffettSlideshowPackage}>
            <div className={styles.buffettSlideshowPackageBox}>
              <Layout cards={buffettFeaturedCards} layoutType="square-lead" brand="buffett" isBuffettRecirc />
            </div>
          </div>
        </div>
      </div>
    </div>
  </BrandPageWrapper>
);

export default BuffettArticle;
