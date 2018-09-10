import React from 'react';
import { shallow } from 'enzyme';
import ClaimReward from '../ClaimReward';

describe('(Component) ClaimReward', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        timestamp: '0',
        TMEreward: '0 TME',
        TSDreward: '0 TSD',
        SCOREreward: '0 ePOWER',
        totalSCORE: '0',
        SCOREbackingTMEfundBalance: '0',
      };
      const wrapper = shallow(<ClaimReward {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
