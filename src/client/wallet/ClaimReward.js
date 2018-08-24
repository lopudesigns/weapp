import React from 'react';
import PropTypes from 'prop-types';
import {
  FormattedMessage,
  FormattedRelative,
  FormattedNumber,
  FormattedDate,
  FormattedTime,
} from 'react-intl';
import extraformatter from '../helpers/extraformatter';
import BTooltip from '../components/BTooltip';

const getFormattedPayout = (
  ECOreward,
  EUSDreward,
  ESCORreward,
  totalESCOR,
  ESCORbackingECOfundBalance,
) => {
  const payouts = [];
  const parsedECOreward = parseFloat(ECOreward);
  const parsedEUSDreward = parseFloat(EUSDreward);
  const parsedESCORrewardinECO = parseFloat(
    extraformatter.ESCORinECOvalue(ESCORreward, totalESCOR, ESCORbackingECOfundBalance),
  );

  if (parsedECOreward > 0) {
    payouts.push(
      <span key="ECO" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedECOreward}
          minimumFractionDigits={3}
          maximumFractionDigits={3}
        />
        {' ECO'}
      </span>,
    );
  }

  if (parsedEUSDreward > 0) {
    payouts.push(
      <span key="EUSD" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedEUSDreward}
          minimumFractionDigits={3}
          maximumFractionDigits={3}
        />
        {' EUSD'}
      </span>,
    );
  }

  if (parsedESCORrewardinECO > 0) {
    payouts.push(
      <span key="ePOWER" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedESCORrewardinECO}
          minimumFractionDigits={3}
          maximumFractionDigits={3}
        />
        {' ePOWER'}
      </span>,
    );
  }

  return payouts;
};

const ClaimReward = ({
  timestamp,
  ECOreward,
  EUSDreward,
  ESCORreward,
  totalESCOR,
  ESCORbackingECOfundBalance,
}) => (
  <div className="UserWalletTransactions__transaction">
    <div className="UserWalletTransactions__icon-container">
      <i className="iconfont icon-success_fill UserWalletTransactions__icon" />
    </div>
    <div className="UserWalletTransactions__content">
      <div className="UserWalletTransactions__content-recipient">
        <FormattedMessage id="claim_rewards" defaultMessage="Claim rewards" />
        <span className="UserWalletTransactions__payout">
          {getFormattedPayout(
            ECOreward,
            EUSDreward,
            ESCORreward,
            totalESCOR,
            ESCORbackingECOfundBalance,
          )}
        </span>
      </div>
      <span className="UserWalletTransactions__timestamp">
        <BTooltip
          title={
            <span>
              <FormattedDate value={`${timestamp}Z`} /> <FormattedTime value={`${timestamp}Z`} />
            </span>
          }
        >
          <span>
            <FormattedRelative value={`${timestamp}Z`} />
          </span>
        </BTooltip>
      </span>
    </div>
  </div>
);

ClaimReward.propTypes = {
  timestamp: PropTypes.string.isRequired,
  ECOreward: PropTypes.string.isRequired,
  EUSDreward: PropTypes.string.isRequired,
  ESCORreward: PropTypes.string.isRequired,
  totalESCOR: PropTypes.string.isRequired,
  ESCORbackingECOfundBalance: PropTypes.string.isRequired,
};

export default ClaimReward;
