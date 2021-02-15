import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { ArticleHeader } from '../index';
import Header from '../../../components/Article/ArticleHeader';
import mock from '../__mocks__/ArticleHeaderHOC.mock';

configure({ adapter: new Adapter() });

test('Article Header renders correctly', () => {
  const tree = shallow(<ArticleHeader data={mock} />);
  expect(toJson(tree)).toMatchSnapshot();
});

test('Render the article header if data is valid.', () => {
  const wrapper = shallow(<ArticleHeader data={mock} dataId={0} />);

  expect(
    wrapper.contains(
      <Header
        data={mock}
        hasBackground={false}
        isTransporter={false}
        isSpecialReport={false}
        dataId={0}
        brand=""
      />,
    ),
  ).toBe(true);
});
