import React from 'react';
import { shallow } from 'enzyme';
import TransferTransaction from '../TransferTransaction';

describe('(Component) TransferTransaction', () => {
  describe('with default prop values', () => {
    it('renders and matches snapshot', () => {
      const props = {
        to: 'helloezira',
        memo: 'Test Transfer Transaction',
        amount: <span>{'0 ECO'}</span>,
        timestamp: '0',
      };
      const wrapper = shallow(<TransferTransaction {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
