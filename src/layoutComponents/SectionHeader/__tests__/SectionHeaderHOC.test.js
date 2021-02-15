import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { SectionHeader } from '../index';
import mock from '../__mocks__/SectionHeaderHOC.mock';

configure({ adapter: new Adapter() });

test('Section Header renders correctly', () => {
  const tree = shallow(<SectionHeader data={mock} />);
  expect(toJson(tree)).toMatchSnapshot();
});

test('Render the banner if data is valid.', () => {
  const wrapper = shallow(<SectionHeader data={mock} />);
  expect(wrapper.text()).toBe('<Banner />');
});
