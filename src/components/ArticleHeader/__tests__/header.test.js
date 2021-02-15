import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { MAKE_IT } from 'utilities/Constants';
import { ArticleHeader } from '../index';
import { imageHeader } from '../__mocks__/header';
import {
  imageHeaderHighTouch,
  featuredVideoHeader, } from '../__mocks__/makeitHeader';


configure({ adapter: new Adapter() });

test.skip('renders correctly', () => {
  const tree = shallow(<ArticleHeader data={imageHeader} />);

  expect(toJson(tree)).toMatchSnapshot();
});

test.skip('renders make it header correctly', () => {
  const tree = shallow(<ArticleHeader data={imageHeader} brand={MAKE_IT} />);

  expect(toJson(tree)).toMatchSnapshot();
});

test.skip('renders make it featuredVideoHeader correctly', () => {
  const tree = shallow(<ArticleHeader data={featuredVideoHeader} hasBackground brand={MAKE_IT} />);

  expect(toJson(tree)).toMatchSnapshot();
});

test.skip('renders make it imageHeaderHighTouch correctly', () => {
  const tree = shallow(<ArticleHeader data={imageHeaderHighTouch} hasBackground brand={MAKE_IT} />);

  expect(toJson(tree)).toMatchSnapshot();
});
