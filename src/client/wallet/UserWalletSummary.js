import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import formatter from '../helpers/extraformatter';
import { calculateTotalDelegatedSCOREinTMEvalue, calculateEstAccountValue } from '../vendor/helpers';
import BTooltip from '../components/BTooltip';
import Loading from '../components/Icon/Loading';
import USDDisplay from '../components/Utils/USDDisplay';
import './UserWalletSummary.less';

const getFormattedTotalDelegatedSCORE = (user, totalSCORE, SCOREbackingTMEfundBalance) => {
  const totalDelegatedSCOREinTMEvalue = calculateTotalDelegatedSCOREinTMEvalue(
    user,
    totalSCORE,
    SCOREbackingTMEfundBalance,
  );

  if (totalDelegatedSCOREinTMEvalue !== 0) {
    return (
      <BTooltip
        title={
          <span>
            <FormattedMessage
              id="SCORE_in_TME_delegated_to_account_tooltip"
              defaultMessage="ePower increase from supporters"
            />
          </span>
        }
      >
        <span>
          {totalDelegatedSCOREinTMEvalue > 0 ? '(+' : '('}
          <FormattedNumber
            value={calculateTotalDelegatedSCOREinTMEvalue(user, totalSCORE, SCOREbackingTMEfundBalance)}
          />
          {' ePOWER)'}
        </span>
      </BTooltip>
    );
  }

  return null;
};

const UserWalletSummary = ({
  user,
  loading,
  totalSCORE,
  SCOREbackingTMEfundBalance,
  loadingGlobalProperties,
  TMErate,
  TSDrate,
  TMErateLoading,
}) => (
  <div className="UserWalletSummary">
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-TME UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="TME" defaultMessage="TME" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.balance)} />
            {' TME'}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-flashlight_fill UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="SCORE" defaultMessage="SCORE" />
      </div>
      <div className="UserWalletSummary__value">
        {loading || loadingGlobalProperties ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber
              value={parseFloat(
                formatter.SCOREinTMEvalue(
                  user.SCORE,
                  totalSCORE,
                  SCOREbackingTMEfundBalance,
                ),
              )}
            />
            {' ePOWER '}
            {getFormattedTotalDelegatedSCORE(user, totalSCORE, SCOREbackingTMEfundBalance)}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-Dollar UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="TSD" defaultMessage="TSD" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.TSDbalance)} />
            {' TSD'}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-savings UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="savings" defaultMessage="Savings" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.TMEsavingsBalance)} />
            {' TME, '}
            <FormattedNumber value={parseFloat(user.TSDsavingsBalance)} />
            {' TSD'}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-people_fill UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="est_account_value" defaultMessage="Est. Account Value" />
      </div>
      <div className="UserWalletSummary__value">
        {loading || loadingGlobalProperties || TMErateLoading ? (
          <Loading />
        ) : (
          <USDDisplay
            value={calculateEstAccountValue(
              user,
              totalSCORE,
              SCOREbackingTMEfundBalance,
              TMErate,
              TSDrate,
            )}
          />
        )}
      </div>
    </div>
  </div>
);

UserWalletSummary.propTypes = {
  loadingGlobalProperties: PropTypes.bool.isRequired,
  user: PropTypes.shape().isRequired,
  totalSCORE: PropTypes.string.isRequired,
  SCOREbackingTMEfundBalance: PropTypes.string.isRequired,
  TMErate: PropTypes.number,
  TSDrate: PropTypes.number,
  loading: PropTypes.bool,
  TMErateLoading: PropTypes.bool,
};

UserWalletSummary.defaultProps = {
  TMErate: 1,
  TSDrate: 1,
  loading: false,
  TMErateLoading: false,
};

export default UserWalletSummary;
