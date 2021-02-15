import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { ArticleTicker } from '../index';
import { mock } from '../__mocks__/ArticleTickerHOC.mock';

configure({ adapter: new Adapter() });

test('Article Ticker renders correctly', () => {
  const tree = shallow(<ArticleTicker data={mock} />);
  expect(toJson(tree)).toMatchSnapshot();
});

test('Render the article header if data is valid.', () => {
  const wrapper = shallow(<ArticleTicker data={mock} />);
  expect(wrapper.text()).toBe('<Connect(Apollo(ArticleTicker)) />');
});
