/* eslint-disable import/prefer-default-export, class-methods-use-this */

import React from 'react';
import Loadable from 'react-loadable';

import { BUFFETT, DEAL_OR_NO_DEAL } from 'utilities/Constants';

import ModuleWrapper from '../containers/ModuleWrapper';
import DynamicLoadingIndicator from '../components/DynamicLoadingIndicator';

const ArticleBody = Loadable({
  loader: () => import('components/ArticleBody'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ArticleBodyPremium = Loadable({
  loader: () => import('components/ArticleBodyPremium'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BoxRail = Loadable({
  loader: () => import('components/Mps/AdUnits/BoxRail'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const AdTopBanner = Loadable({
  loader: () => import('components/Mps/AdUnits/TopBanner'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettArticleBody = Loadable({
  loader: () => import('components/BuffettArticleBody'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettAbout = Loadable({
  loader: () => import('components/BuffettAbout'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettArticleHeader = Loadable({
  loader: () => import('components/BuffettArticleHeader'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettArticleHeaderEyebrow = Loadable({
  loader: () => import('components/BuffettArticleHeaderEyebrow'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettClipPlayer = Loadable({
  loader: () => import('components/BuffettClipPlayer'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettClips = Loadable({
  loader: () => import('components/BuffettClips'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettClipsDark = Loadable({
  loader: () => import('components/BuffettClipsDark'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettDynamicContentFeedContainer = Loadable({
  loader: () => import('components/BuffettDynamicContentFeedContainer'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettSearch = Loadable({
  loader: () => import('components/BuffettSearch'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettThreeUp = Loadable({
  loader: () => import('components/ThreeUp'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettTimeline = Loadable({
  loader: () => import('containers/BuffettTimeline'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettVideoIntro = Loadable({
  loader: () => import('components/BuffettVideoIntro'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const RelatedVideos = Loadable({
  loader: () => import('components/RelatedVideos'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ClipPlayer = Loadable({
  loader: () => import('components/ClipPlayer'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const CardCollection = Loadable({
  loader: () => import('components/CardCollection'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const Carousel = Loadable({
  loader: () => import('components/Carousel'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const DynamicContentFeedContainer = Loadable({
  loader: () => import('components/DynamicContentFeedContainer'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const FeaturedBreaker = Loadable({
  loader: () => import('components/Breakers/FeaturedBreaker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ForYouBreaker = Loadable({
  loader: () => import('components/Breakers/RelatedBreaker/ForYouBreaker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const FourUp = Loadable({
  loader: () => import('components/FourUp'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const HalfAndHalfBreaker = Loadable({
  loader: () => import('components/Breakers/HalfAndHalfBreaker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const Header = Loadable({
  loader: () => import('components/Header'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const HeroLedePlusThree = Loadable({
  loader: () => import('components/HeroLedePlusThree'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ImageDense = Loadable({
  loader: () => import('components/ImageDense'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const LegacyPlayerContainer = Loadable({
  loader: () => import('containers/LegacyPlayerContainer'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const LongFormFeaturedVideos = Loadable({
  loader: () => import('components/LongFormFeaturedVideos'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const LongFormSectionIntro = Loadable({
  loader: () => import('components/LongFormSectionIntro'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const MakeItRelatedVideo = Loadable({
  loader: () => import('layoutComponents/MakeItRelatedVideo'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const MakeItFeaturedStories = Loadable({
  loader: () => import('components/MakeItFeaturedStories'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const MakeItFeaturedVideo = Loadable({
  loader: () => import('components/FeaturedVideoModule/MakeItFeaturedVideo'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const MakeItSquareLead = Loadable({
  loader: () => import('components/MakeItSquareLead'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const MakeItForYouBreaker = Loadable({
  loader: () => import('components/Breakers/MakeIt/MakeItForYouBreaker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const MakeItNewsletterBreaker = Loadable({
  loader: () => import('components/Breakers/MakeIt/MakeItNewsletterBreaker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const MakeItTwoColumn = Loadable({
  loader: () => import('components/MakeItTwoColumn'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const MarketsBanner = Loadable({
  loader: () => import('components/MarketsBanner'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const MarketSummary = Loadable({
  loader: () => import('components/MarketSummary'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const MarketsModule = Loadable({
  loader: () => import('components/MarketsModule'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const MarketMovers = Loadable({
  loader: () => import('components/MarketsModule/MarketMovers'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const MarketTopicTown = Loadable({
  loader: () => import('components/MarketModules/MarketTopicTown'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const MarketSectionTable = Loadable({
  loader: () => import('components/MarketModules/MarketSectionTable'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const MostPopular = Loadable({
  loader: () => import('components/Article/MostPopular'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const MidResponsive = Loadable({
  loader: () => import('components/Mps/AdUnits/MidResponsive'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const OptInOverlay = Loadable({
  loader: () => import('components/OptInOverlay'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const PromoBreaker = Loadable({
  loader: () => import('components/Mps/MpsComponents/PromoBreaker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const PromoBreakerDOND = Loadable({
  loader: () => import('components/Mps/MpsComponents/PromoBreakerDOND'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const PromoBreakerMOCKERY = Loadable({
  loader: () => import('components/Mps/MpsComponents/PromoBreakerMOCKERY'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const Pullquote = Loadable({
  loader: () => import('components/Article/Pullquote/Buffett'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const QuoteFinder = Loadable({
  loader: () => import('components/QuoteFinder'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const RelatedTags = Loadable({
  loader: () => import('components/Article/RelatedTags'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const RelatedSpecialsBreaker = Loadable({
  loader: () => import('components/Breakers/MakeIt/RelatedSpecialsBreaker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
})

const RegionalMarketsModule = Loadable({
  loader: () => import('components/MarketModules/RegionalMarketsModule'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const SectionIntro = Loadable({
  loader: () => import('components/SectionIntro'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const SectionTiles = Loadable({
  loader: () => import('components/SectionTiles'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const SingleStoryHeroWithTopStoriesTitle = Loadable({
  loader: () => import('components/SingleStoryHeroWithTopStoriesTitle'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const SecuritiesModule = Loadable({
  loader: () => import('components/MarketModules/SecuritiesModule'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const SlideshowGrid = Loadable({
  loader: () => import('components/SlideshowGrid'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const SlideshowHighlight = Loadable({
  loader: () => import('components/SlideshowHighlight'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const SlideshowIntro = Loadable({
  loader: () => import('components/Slideshow/SlideshowIntro/Buffett'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const StoriesTwoThird = Loadable({
  loader: () => import('components/StoriesTwoThird'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const Taboola = Loadable({
  loader: () => import('components/Taboola'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const Transcript = Loadable({
  loader: () => import('components/ClipVideoHero/Transcript'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const TwoColumnImageDense = Loadable({
  loader: () => import('components/TwoColumnImageDense'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ThreeUpStack = Loadable({
  loader: () => import('components/ThreeUpStack'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const TrendingNowBreaker = Loadable({
  loader: () => import('components/TrendingNowBreaker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const UltraDense = Loadable({
  loader: () => import('components/UltraDense'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const VideoBreakerFeatured = Loadable({
  loader: () => import('components/VideoBreakerFeatured'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const BuffettVideoHero = Loadable({
  loader: () => import('components/VideoHero/Buffett'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const DondVideoHero = Loadable({
  loader: () => import('components/VideoHero/dealornodeal'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const VideoGrid = Loadable({
  loader: () => import('components/VideoGrid'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const VideoGridDate = Loadable({
  loader: () => import('components/VideoGridDate'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const Wildcard = Loadable({
  loader: () => import('components/Wildcard'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const SectionHeader = Loadable({
  loader: () => import('layoutComponents/SectionHeader'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ArticleHeader = Loadable({
  loader: () => import('layoutComponents/ArticleHeader'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const KeyPoints = Loadable({
  loader: () => import('layoutComponents/KeyPoints'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ArticleInlineMedia = Loadable({
  loader: () => import('layoutComponents/ArticleInlineMedia'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ArticleInlineMediaPremium = Loadable({
  loader: () => import('layoutComponents/ArticleInlineMediaPremium'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const TransporterArticle = Loadable({
  loader: () => import('layoutComponents/TransporterArticle'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const TransporterSection = Loadable({
  loader: () => import('layoutComponents/TransporterSection'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const ArticleTicker = Loadable({
  loader: () => import('layoutComponents/ArticleTicker'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const DenseCoverage = Loadable({
  loader: () => import('layoutComponents/DenseCoverage'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});


const MakeItAbout = Loadable({
  loader: () => import('components/MakeItAbout'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const FeaturedPerson = Loadable({
  loader: () => import('components/FeaturedPerson'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});

const PageTitle = Loadable({
  loader: () => import('components/PageTitle'),
  loading() {
    return <DynamicLoadingIndicator />
  }
});


// Mapping class to render all the modules in the layout and maintain counters and offsets for each component.
export default class ModuleMapper {
  constructor() {
    this.dataCounter = 0;
    this.offsetCounter = 0;
    this.boxrailCounter = 0;
  }

  getModuleOffset(moduleName) {
    let theOffset = 0;

    if (moduleName === 'videoGrid') theOffset = VideoGrid.itemCount;

    return theOffset;
  }

  mapModules(modules, id, sectionId, sectionTitle, sectionUrl, brand, template, premium, isProUser, hasMounted = false, type) {
    const isSpecialReport = template === "Special Report Article";
    let titleOverride = premium ? "More In Pro" : "Trending Now";
    titleOverride = isSpecialReport ? "Related" : titleOverride;


    return modules.map((module, moduleIndex) => {
      let moduleOffset = 0;

      this.dataCounter += 1;

      // If source is self, calculate the offset.
      if (module.source === 'self') {
        moduleOffset = this.offsetCounter;
        this.offsetCounter += this.getModuleOffset(module.name);
      }
      if (module.name === 'adBoxRail' || 'adFlexBox') {
        this.boxrailCounter += 1;
      }

      const { dataCounter } = this;
      return (
        <ModuleWrapper key={`module-${moduleIndex}`} moduleName={module.name}>
          {module.name === 'adHomepageTopBanner' && !isProUser && (
            <AdTopBanner dataId={`AdTopBanner-${dataCounter}`} brand={brand} />
          )}
          {module.name === 'adTopBanner' && !isProUser &&
            <AdTopBanner dataId={`AdTopBanner-${dataCounter}`} brand={brand} />
          }
          {module.name === 'marketsBanner' && (
            <MarketsBanner data={module.data} dataId={`MarketsBanner-${dataCounter}`} />
          )}
          {module.name === 'marketsModule' && (
            <MarketsModule
              data={module.data}
              dataId={`MarketsModule-${dataCounter}`}
              pollRate={10000}
              hasHeader
            />
          )}

          {module.name === 'MarketMovers' && (
            <MarketMovers
              webserviceId={module.source}
              dataId={`MarketMovers-${dataCounter}`}
              isFullWidth
            />
          )}

          {module.name === 'LegacyPlayerContainer' && <LegacyPlayerContainer id={module.source} />}

          {module.name === 'articleTicker' && (
            <ArticleTicker
              data={module.data}
              dataId={`ArticleTicker-${dataCounter}`}
              truncate={module.attributes.truncate}
            />
          )}
          {module.name === 'sectionHeader' && (
            <SectionHeader
              data={module.data}
              logoType={module.attributes.logoType}
              dataId={`SectionHeader-${dataCounter}`}
            />
          )}
          {module.name === 'articleHeader' && (
            <ArticleHeader
              brand={brand}
              data={module.data}
              isSpecialReport={module.attributes.isSpecialReport}
              dataId={`ArticleHeader-${dataCounter}`}
            />
          )}
          {module.name === 'keyPoints' && <KeyPoints data={module.data} dataId={`KeyPoints-${dataCounter}`} />}
          {module.name === 'articleInlineMedia' &&
            (!premium || (premium && !hasMounted)) && (
              <ArticleInlineMedia data={module.data} dataId={`ArticleInlineMedia-${dataCounter}`} />
            )}
          {module.name === 'articleInlineMedia' &&
            premium &&
            hasMounted && (
              <ArticleInlineMediaPremium id={id} dataId={`ArticleInlineMedia-${dataCounter}`} />
            )}
          {module.name === 'adBoxrail' && !isProUser && (
            <BoxRail dataId={`dart_wrapper_boxrail_peek_article`} />
          )}
          {module.name === 'articleBody' &&
            (!premium || (premium && !hasMounted)) && (
              <ArticleBody data={module.data} dataId={`ArticleBody-${dataCounter}`} brand={brand} />
            )}

          {module.name === 'articleBody' &&
            premium &&
            hasMounted && (
              <ArticleBodyPremium id={id} dataId={`ArticleBody-${dataCounter}`} />
            )}
          {module.name === 'relatedTags' && (
            <RelatedTags data={module.data} dataId={`RelatedTags-${dataCounter}`} />
          )}
          {module.name === 'taboola' && !premium && !isProUser && (
            <Taboola dataId={`Taboola-${dataCounter}`} isMixed={module.attributes.isMixed} isMakeit={module.attributes.makeit} />
          )}
          {module.name === 'adFlexBox' && !premium && !isProUser && (
            <BoxRail
              dataId={`dart_wrapper_boxrail_${dataCounter}`}
              brand={brand}
            />
          )}
          {module.name === 'adBoxRail' && !isProUser && (
            <BoxRail
              dataId={`dart_wrapper_boxrail_${dataCounter}`}
              brand={brand}
              placement={module.source}
            />
          )}
          {module.name === 'adMidResponsive' && !isProUser && (
            <MidResponsive
              dataId={`dart_wrapper_midresponsive_${dataCounter}`}
            />
          )}
          {module.name === 'transporterArticle' && (
            <TransporterArticle 
              data={module.data} 
              dataId={`TransporterArticle-${dataCounter}`} 
              isProUser={isProUser} 
              titleOverride={titleOverride}
              premium={premium}
              isSpecialReport={isSpecialReport}
            />
          )}
          {module.name === 'transporterSection' && (
            <TransporterSection
              brand={brand}
              data={module.data}
              title={sectionTitle}
              url={sectionUrl}
              articleId={id}
              attributes={module.attributes}
              type={type}
              dataId={`TransporterSection-${dataCounter}`}
            />
          )}
          {module.name === 'mostPopular' && (
            <MostPopular
              data={module.data}
              dataId={`MostPopular-${dataCounter}`}
              titleOverride={titleOverride}
              premium={premium}
              isSpecialReport={isSpecialReport}
            />
          )}
          {module.name === 'WildcardPage' && (
            <Wildcard brand={brand} data={module.data} dataId={`Wildcard-${dataCounter}`} />
          )}

          {module.name === 'videoGrid' && (
            <VideoGrid id={id} dataId={`VideoGrid-${dataCounter}`} offset={moduleOffset} />
          )}

          {module.name === 'videoGridDate' && (
            <VideoGridDate data={module.data} dataId={`VideoGridDate-${dataCounter}`} />
          )}

          {module.name === 'videoBreakerFeatured' && (
            <VideoBreakerFeatured
              data={module.data}
              attributes={module.attributes}
              dataId={`VideoBreakerFeatured-${dataCounter}`}
            />
          )}

          {module.name === 'storiesTwoThird' && (
            <StoriesTwoThird
              data={module.data}
              attributes={module.attributes}
              dataId={`StoriesTwoThird-${dataCounter}`}
            />
          )}

          {module.name === 'threeUp' && (
            <BuffettThreeUp
              data={module.data}
              dataId={`ThreeUp-${dataCounter}`}
              shareThrough={module.attributes.shareThrough}
              truncate={module.attributes.truncate}
            />
          )}

          {module.name === 'fourUp' && (
            <FourUp
              data={module.data}
              dataId={`FourUp-${dataCounter}`}
            />
          )}

          {module.name === 'threeUpStack' && (
            <ThreeUpStack
              data={module.data}
              dataId={`ThreeUpStack-${dataCounter}`}
              attributes={module.attributes}
            />
          )}

          {module.name === 'cardCollection' && (
            <CardCollection
              data={module.data}
              dataId={`CardCollection-${dataCounter}`}
            />
          )}

          {module.name === 'sectionIntro' && (
            <SectionIntro data={module.data} dataId={`SectionIntro-${dataCounter}`} />
          )}

          {module.name === 'sectionTiles' && (
            <SectionTiles data={module.data} dataId={`SectionTiles-${dataCounter}`} />
          )}

          {module.name === 'trendingNowBreaker' && (
            <TrendingNowBreaker
              data={module.data}
              dataId={`TrendingNowBreaker-${dataCounter}`}
            />
          )}

          {module.name === 'singleStoryHeroWithTopStoriesTitle' && (
            <SingleStoryHeroWithTopStoriesTitle
              data={module.data}
              dataId={`SingleStoryHeroWithTopStoriesTitle-${dataCounter}`}
              showEyeBrow={module.attributes.showEyeBrow}
              truncate={module.attributes.truncate}
              isProUser={isProUser}
            />
          )}

          {module.name === 'heroLedePlusThree' && (
            <HeroLedePlusThree
              data={module.data}
              dataId={`HeroLedePlusThree-${dataCounter}`}
              showEyeBrow={module.attributes.showEyeBrow}
              truncate={module.attributes.truncate}
              isProUser={isProUser}
            />
          )}

          {module.name === 'imageDenseWithoutLabels' && (
            <ImageDense
              data={module.data}
              dataId={`imageDenseWithoutLabels-${dataCounter}`}
              template={template}
            />
          )}

          {module.name === 'twoColumnImageDense' && (
            <TwoColumnImageDense
              data={module.data}
              dataId={`TwoColumnImageDense-${module.data.eyebrow}`}
              template={template}
              truncate={module.attributes.truncate}
            />
          )}

          {module.name === 'ultraDenseDefault' && (
            <UltraDense
              data={module.data}
              dataId={`UltraDenseDefault-${dataCounter}`}
              shareThrough={module.attributes.shareThrough}
              truncate={module.attributes.truncate}
            />
          )}

          {module.name === 'slideshowGrid' && (
            <SlideshowGrid
              data={module.data}
              dataId={`SlideshowGrid-${dataCounter}`}
              offset={moduleOffset}
            />
          )}

          {module.name === 'hero' &&
            brand === BUFFETT && (
              <BuffettVideoHero data={module.data} dataId={`VideoHero-${dataCounter}`} />
            )}

          {module.name === 'videoHero' &&
            brand === DEAL_OR_NO_DEAL && (
              <DondVideoHero
                data={module.data}
                dataId={`VideoHero-${dataCounter}`}
                enablePageScrollCTA={module.attributes && module.attributes.enablePageScrollCTA}
              />
            )}

          {module.name === 'slideshowHighlight' && (
            <SlideshowHighlight data={module.data} dataId={`SlideshowHighlight-${dataCounter}`} />
          )}

          {module.name === 'buffettQuote' && (
            <Pullquote data={module.data} dataId={`Pullquote-${dataCounter}`} />
          )}

          {module.name === 'buffettTimeline' && (
            <BuffettTimeline data={module.data} dataId={`BuffettTimeline-${dataCounter}`} />
          )}

          {module.name === 'buffettClip' && (
            <BuffettClips data={module.data} dataId={`BuffettClips-${dataCounter}`} />
          )}

          {module.name === 'buffettClipDark' && (
            <BuffettClipsDark data={module.data} dataId={`BuffettClipsDark-${dataCounter}`} />
          )}

          {module.name === 'buffettArticleBody' && (
            <BuffettArticleBody data={module.data} dataId={`BuffettArticleBody-${dataCounter}`} />
          )}

          {module.name === 'buffettArticleHeader' && <BuffettArticleHeader data={module.data} />}

          {module.name === 'buffettArticleHeaderEyebrow' && (
            <BuffettArticleHeaderEyebrow
              data={module.data}
              dataId={`BuffettArticleHeaderEyebrow-${dataCounter}`}
            />
          )}

          {module.name === 'search' && (
            <BuffettSearch data={module.data} dataId={`BuffettSearch-${dataCounter}`} />
          )}

          {module.name === 'slideshowIntro' && (
            <SlideshowIntro data={module.data} dataId={`SlideshowIntro-${dataCounter}`} />
          )}

          {module.name === 'adBuffettBreaker' && (
            <PromoBreaker dataId={`PromoBreaker-${dataCounter}`} />
          )}

          {module.name === 'adDONDBreaker' && (
            <PromoBreakerDOND dataId={`PromoBreakerDOND-${dataCounter}`} />
          )}

          {module.name === 'halfHalfBreaker' && (
            <PromoBreakerMOCKERY dataId={`PromoBreakerMOCKERY-${dataCounter}`} />
          )}

          {module.name === 'longFormFeaturedVideos' && (
            <LongFormFeaturedVideos
              data={module.data}
              dataId={`LongFormFeaturedVideos-${dataCounter}`}
            />
          )}

          {module.name === 'longFormSectionIntro' && (
            <LongFormSectionIntro
              data={module.data}
              dataId={`LongFormSectionIntro-${dataCounter}`}
            />
          )}

          {module.name === 'videoTranscript' && (
            <Transcript
              data={module.data}
              attributes={module.attributes}
              dataId={`Transcript-${dataCounter}`}
            />
          )}

          {module.name === 'featuredBreaker' && (
            <FeaturedBreaker data={module.data} dataId={`FeaturedBreaker-${module.data.title}`} />
          )}

          {module.name === 'optInOverlay' && (
            <OptInOverlay dataId={`OptInOverlay-${dataCounter}`} />
          )}

          {module.name === 'denseCoverage' && (
            <DenseCoverage id={id} dataId={`DenseCoverage-${dataCounter}`} />
          )}

          {module.name === 'buffettAbout' && (
            <BuffettAbout data={module.data} dataId={`BuffettAbout-${dataCounter}`} />
          )}

          {module.name === 'buffettDynamicContentFeedContainer' && (
            <BuffettDynamicContentFeedContainer
              data={module.data}
              attributes={module.attributes}
              dataId={`BuffettDynamicContentFeedContainer-${dataCounter}`}
            />
          )}

          {(module.name === 'clipPlayer' || module.name === 'longFormPlayer') && brand !== DEAL_OR_NO_DEAL && (
            <ClipPlayer data={module.data} dataId={`ClipPlayer-${dataCounter}`} attributes={module.attributes} brand={brand} />
          )}

          {module.name === 'clipPlayer' && brand === DEAL_OR_NO_DEAL && (
            <BuffettClipPlayer
              data={module.data}
              dataId={`BuffettClipPlayer-${dataCounter}`}
              attributes={module.attributes}
            />
          )}

          {module.name === 'videoIntro' && brand === DEAL_OR_NO_DEAL && (
            <BuffettVideoIntro
              brand={brand}
              data={module.data}
              dataId={`BuffettVideoIntro-${dataCounter}`}
            />
          )}

          {module.name === 'sectionVideoPlayer' && (
            <BuffettClipPlayer
              data={module.data.assets && module.data.assets.length && module.data.assets[0]}
              dataId={`BuffettClipPlayer-${dataCounter}`}
              attributes={module.attributes}
            />
          )}

          {module.name === 'sectionVideoIntro' &&
          (brand === BUFFETT || brand === DEAL_OR_NO_DEAL) && (
            <BuffettVideoIntro
              brand={brand}
              data={module.data.assets && module.data.assets.length && module.data.assets[0]}
              dataId={`BuffettVideoIntro-${dataCounter}`}
            />
          )}

          {module.name === 'relatedVideos' && (
            <RelatedVideos
              data={module.data}
              attributes={module.attributes}
              dataId={`RelatedVideos-${dataCounter}`}
              brand={brand} />
          )}

          {module.name === 'header' && (
            <Header
              subNavLinks={module.attributes.subNavLinks}
              title={module.attributes.title}
              eyebrow={module.attributes.eyebrow || null}
            />
          )}

          {module.name === 'quoteFinder' && (
            <QuoteFinder dataId={`QuoteFinder-${dataCounter}`} />
          )}

          {module.name === 'marketSummary' && (
            <MarketSummary id={module.source} dataId={`MarketSummary-${dataCounter}`} />
          )}

          {module.name === 'marketDashboardMovers' && (
            <MarketMovers webserviceId={module.source} dataId={`MarketMovers-${dataCounter}`} />
          )}

          {module.name === 'marketDashboardSecuritiesModule' && (
            <SecuritiesModule
              moduleIds={module.attributes.nodeIds}
              dataId={`SecuritiesModule-${dataCounter}`}
            />
          )}

          {module.name === 'marketDashboardRegionalMarkets' && (
            <RegionalMarketsModule
              moduleIds={module.attributes.nodeIds}
              dataId={`RegionalMarketsModule-${dataCounter}`}
            />
          )}

          {module.name === 'halfAndHalfBreaker' && (
            <HalfAndHalfBreaker
              item1={module.attributes.item1}
              item2={module.attributes.item2}
              dataId={`HalfAndHalfBreaker-${dataCounter}`}
            />
          )}

          {module.name === 'marketNews' && (
            <MarketTopicTown
              title="Market News"
              id={module.source}
              layoutType="single-lead"
              dataId={`MarketsTopicTown=${dataCounter}`}
            />
          )}

          {module.name === 'investingNews' && (
            <MarketTopicTown
              title="Investing News"
              id={module.source}
              layoutType="square-lead"
              dataId={`MarketsTopicTown=${dataCounter}`}
            />
          )}

          {module.name === 'marketSectionTable' && (
            <MarketSectionTable
              title={module.attributes.title || ''}
              id={module.attributes.id}
              dataId={`MarketSectionTable=${dataCounter}`}
            />
          )}
          {module.name === 'forYouBreaker' && (
            <ForYouBreaker
              dataId={`ForYouBreaker-${dataCounter}`}
            />
          )}
          {module.name === 'dynamicContentFeed' && (
            <DynamicContentFeedContainer
              data={module.data}
              dataId={`DynamicContentFeedContainer=${dataCounter}`}
              attributes={module.attributes}
            />
          )}

          {/* Make It Modules */}
          {module.name === 'makeItFeaturedStories' && (
            <MakeItFeaturedStories
              data={module.data}
              isCollapsible={module.attributes.isCollapsible}
              dataId={`MakeItFeaturedStories=${dataCounter}`}
            />
          )}

          {module.name === 'makeItRelatedVideo' && (
            <MakeItRelatedVideo
              data={module.data}
              dataId={`MakeItRelatedVideo=${dataCounter}`}
            />
          )}

          {module.name === 'makeItForYouBreaker' && (
            <MakeItForYouBreaker
              dataId={`MakeItForYouBreaker=${dataCounter}`}
            />
           )}

          {module.name === 'makeItFeaturedVideo' && (
            <MakeItFeaturedVideo
              dataId={`MakeItFeaturedVideo=${dataCounter}`}
            />
          )}

          {module.name === 'makeItSquareLead' && (
            <MakeItSquareLead
              dataId={`MakeItSquareLead=${dataCounter}`}
            />
          )}

          {module.name === 'makeItTrendingNowBreaker' && (
            <TrendingNowBreaker
              brand={module.attributes.brand}
              dataId={`TrendingNowBreaker=${dataCounter}`}
            />
          )}

          {module.name === 'makeItNewsletterBreaker' && (
            <MakeItNewsletterBreaker
              dataId={`MakeItNewsletterBreaker=${dataCounter}`}
            />
          )}

          {module.name === 'relatedSpecialsBreaker' && (
            <RelatedSpecialsBreaker
              dataId={`RelatedSpecialsBreaker=${dataCounter}`}
            />
          )}

          {module.name === 'makeItTwoColumn' && (
            <MakeItTwoColumn
              dataId={`MakeItTwoColumn=${dataCounter}`}
            />
          )}

          {module.name === 'makeItAbout' && (
            <MakeItAbout data={module.data} dataId={`MakeItAbout-${dataCounter}`} />
          )}

          {/* {module.name === 'IframeEmbed' && (
            <IframeEmbed
              dataId={`IframeEmbed=${dataCounter}`}
            />
          )} */}

          {module.name === 'carousel' && (
            <Carousel
              data={module.data}
              dataId={`Carousel-${dataCounter}`}
              attributes={module.attributes}
              brand={brand}
            />
          )}

          {module.name === 'featuredPerson' && (
            <FeaturedPerson data={module.data} dataId={`FeaturedPerson-${dataCounter}`} brand={brand} />
          )}

          {module.name === 'pageTitle' && (
            <PageTitle data={module.data} dataId={`PageTitle-${dataCounter}`} brand={brand} />
          )}
        </ModuleWrapper>
      );
    });
  }
}
