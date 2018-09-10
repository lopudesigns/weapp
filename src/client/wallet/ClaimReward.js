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
  TMEreward,
  TSDreward,
  SCOREreward,
  totalSCORE,
  SCOREbackingTMEfundBalance,
) => {
  const payouts = [];
  const parsedTMEreward = parseFloat(TMEreward);
  const parsedTSDreward = parseFloat(TSDreward);
  const parsedSCORErewardinTME = parseFloat(
    extraformatter.SCOREinTMEvalue(SCOREreward, totalSCORE, SCOREbackingTMEfundBalance),
  );

  if (parsedTMEreward > 0) {
    payouts.push(
      <span key="TME" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedTMEreward}
          minimumFractionDigits={3}
          maximumFractionDigits={3}
        />
        {' TME'}
      </span>,
    );
  }

  if (parsedTSDreward > 0) {
    payouts.push(
      <span key="TSD" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedTSDreward}
          minimumFractionDigits={3}
          maximumFractionDigits={3}
        />
        {' TSD'}
      </span>,
    );
  }

  if (parsedSCORErewardinTME > 0) {
    payouts.push(
      <span key="ePOWER" className="UserWalletTransactions__payout-rewards">
        <FormattedNumber
          value={parsedSCORErewardinTME}
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
  TMEreward,
  TSDreward,
  SCOREreward,
  totalSCORE,
  SCOREbackingTMEfundBalance,
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
            TMEreward,
            TSDreward,
            SCOREreward,
            totalSCORE,
            SCOREbackingTMEfundBalance,
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
  TMEreward: PropTypes.string.isRequired,
  TSDreward: PropTypes.string.isRequired,
  SCOREreward: PropTypes.string.isRequired,
  totalSCORE: PropTypes.string.isRequired,
  SCOREbackingTMEfundBalance: PropTypes.string.isRequired,
};

export default ClaimReward;
