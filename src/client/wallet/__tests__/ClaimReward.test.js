import React from 'react';
import { shallow } from 'enzyme';
import ClaimReward from '../ClaimReward';

describe('(Component) ClaimReward', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        timestamp: '0',
        ECOreward: '0 ECO',
        EUSDreward: '0 EUSD',
        ESCORreward: '0 ePOWER',
        totalESCOR: '0',
        ESCORbackingECOfundBalance: '0',
      };
      const wrapper = shallow(<ClaimReward {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
