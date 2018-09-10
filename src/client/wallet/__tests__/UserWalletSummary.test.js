import React from 'react';
import { shallow } from 'enzyme';
import UserWalletSummary from '../UserWalletSummary';

describe('(Component) UserWalletSummary', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        user: {
          balance: '100',
          SCORE: '0',
          TMEsavingsBalance: '100 TME',
          TSDsavingsBalance: '1000 TME',
        },
        estAccountValue: '100.00 TME',
        totalSCORE: '100 TME',
        SCOREbackingTMEfundBalance: '100 TME',
        loading: false,
      };
      const wrapper = shallow(<UserWalletSummary {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
