import React from 'react';
import { shallow } from 'enzyme';
import UserWalletTransactions from '../UserWalletTransactions';

describe('(Component) UserWalletTransactions', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        transactions: [
          {
            timestamp: '0',
            op: [
              'transferECOtoESCORfund',
              {
                amount: '100 ECO',
              },
            ],
          },
          {
            timestamp: '0',
            op: [
              'transfer',
              {
                from: 'helloezira1',
                memo: 'transfer memo',
                amount: '100 ECO',
              },
            ],
          },
        ],
        currentUsername: 'helloezira',
        totalESCOR: '0',
        ESCORbackingECOfundBalance: '0',
      };
      const wrapper = shallow(<UserWalletTransactions {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
