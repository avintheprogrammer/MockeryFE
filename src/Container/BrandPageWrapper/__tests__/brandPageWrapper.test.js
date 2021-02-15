import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { BrandPageWrapper } from '../index';
import mock from '../__mocks__/brandPageWrapper';

const cookies = {
  region: 'USA',
  gig_hasGmid: 'ver2',
  c_to: 'no',
  trc_cookie_storage: 'taboola%20global%3Auser-id=3199c161-a482-4efe-8c7c-43e19a1e5588-tuct12d6f30',
  __pat: '-14400000',
  __pvi: '{"id":"v-2018-03-20-22-55-41-322-yW4kk5VIQiUyXWEM-c51fd33a748d343542801d975f4cf679","domain":"localhost","time":1521601246440}',
  __tbc: '{jzx}VV0YkSa-h0cwF7PC5nm6AO5yswVzDDaTGJ7KzBOkiFQUwU2TDq0NNnyzYu_i8uBQW-V4z0gX-vcv2gKMRgxcVCtpWhy4QUgrOJsVC-LRDbankh7CEgzWjqo1mOh6y2rrn_Xa6BR1dc7DFWsIMsV7UA',
  xbc: '{jzx}YeQsdp1oaH4ZfHnAC6ykvLY9AHEokDirBsTHgrK7BbV8f3NuNfg5kUvbHQooE_SClF2vYGHVR-InklRWbuDS6dlCbLBoeAYQt3KVtnJMC41-2SFnTjfH38UUwBoUftML73xLQmQGm4Em4tIqCijDqASF6IK1nEZ9_rbPnWhikQaiC6SAILK3nfHo7Ckx5yHDuTLfV7bRS_bW_88wxIzu2bAIn2TTBN2pJPoqpd68zyI',
  selectedRegion: 'World',
};

cookies.get = (name) => (cookies[name]);

configure({ adapter: new Adapter() });

test('Global Wrapper renders correctly', () => {


  const tree = shallow(<BrandPageWrapper data={mock} cookies={cookies} />);
  expect(toJson(tree)).toMatchSnapshot();
});

describe('Global Wrapper shows proper states based on data', () => {
  test('check to make sure the global nav and footer are rendered', () => {
    const wrapper = shallow(<BrandPageWrapper data={mock} cookies={cookies} />);
    expect(wrapper.text()).toBe(
      '<JumpLink /><Connect(GlobalNavigation) /><MobileAdhesion /><Footer />',
    );
  });
});

describe('Should render the proper children that are wrapped inside', () => {
  test('make sure page builder is rendered with all the proper props', () => {
    const wrapper = shallow(
      <BrandPageWrapper data={mock} cookies={cookies}>
        <h1>hello</h1>
      </BrandPageWrapper>,
    );
    expect(wrapper.contains(<h1>hello</h1>)).toBe(true);
  });
});
