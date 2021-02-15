/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';

import { ArticleHeader } from './index';
import StoryWrapper from '../../../containers/StoryWrapper';
import readme from './readme.md';

import {
  noImageHeader,
  imageHeader,
  videoHeader,
  mocks,
  imageHeaderFullAuthor,
  noImageHeaderTwoAuthors,
  noImageHeaderWithWire } from './__mocks__/header';


storiesOf('Article Header', module).add(
  'default article header',
  withReadme(readme, () => (
    <StoryWrapper>
      <ArticleHeader data={mocks} />
    </StoryWrapper>
  )),
);

storiesOf('Article Header', module).add(
  'no image header',
  withReadme(readme, () => (
    <StoryWrapper>
      <ArticleHeader data={noImageHeader} />
    </StoryWrapper>
  )),
);

storiesOf('Article Header', module).add(
  'image header',
  withReadme(readme, () => (
    <StoryWrapper>
      <ArticleHeader data={imageHeader} />
    </StoryWrapper>
  )),
);

storiesOf('Article Header', module).add(
  'video header',
  withReadme(readme, () => (
    <StoryWrapper>
      <ArticleHeader data={videoHeader} />
    </StoryWrapper>
  )),
);

// author variations
storiesOf('Article Header', module).add(
  'image header - full author ',
  withReadme(readme, () => (
    <StoryWrapper>
      <ArticleHeader data={imageHeaderFullAuthor} />
    </StoryWrapper>
  )),
);

storiesOf('Article Header', module).add(
  'no image header - two authors ',
  withReadme(readme, () => (
    <StoryWrapper>
      <ArticleHeader data={noImageHeaderTwoAuthors} />
    </StoryWrapper>
  )),
);

storiesOf('Article Header', module).add(
  'no image header - with author wire ',
  withReadme(readme, () => (
    <StoryWrapper>
      <ArticleHeader data={noImageHeaderWithWire} />
    </StoryWrapper>
  )),
);
