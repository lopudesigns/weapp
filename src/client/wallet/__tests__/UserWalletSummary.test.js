import React from 'react';
import { shallow } from 'enzyme';
import UserWalletSummary from '../UserWalletSummary';

describe('(Component) UserWalletSummary', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        user: {
          balance: '100',
          ESCOR: '0',
          ECOsavingsBalance: '100 ECO',
          EUSDsavingsBalance: '1000 ECO',
        },
        estAccountValue: '100.00 ECO',
        totalESCOR: '100 ECO',
        ESCORbackingECOfundBalance: '100 ECO',
        loading: false,
      };
      const wrapper = shallow(<UserWalletSummary {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
