import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import formatter from '../helpers/extraformatter';
import { calculateTotalDelegatedESCORinECOvalue, calculateEstAccountValue } from '../vendor/helpers';
import BTooltip from '../components/BTooltip';
import Loading from '../components/Icon/Loading';
import USDDisplay from '../components/Utils/USDDisplay';
import './UserWalletSummary.less';

const getFormattedTotalDelegatedESCOR = (user, totalESCOR, ESCORbackingECOfundBalance) => {
  const totalDelegatedESCORinECOvalue = calculateTotalDelegatedESCORinECOvalue(
    user,
    totalESCOR,
    ESCORbackingECOfundBalance,
  );

  if (totalDelegatedESCORinECOvalue !== 0) {
    return (
      <BTooltip
        title={
          <span>
            <FormattedMessage
              id="ESCOR_in_ECO_delegated_to_account_tooltip"
              defaultMessage="ePower increase from supporters"
            />
          </span>
        }
      >
        <span>
          {totalDelegatedESCORinECOvalue > 0 ? '(+' : '('}
          <FormattedNumber
            value={calculateTotalDelegatedESCORinECOvalue(user, totalESCOR, ESCORbackingECOfundBalance)}
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
  totalESCOR,
  ESCORbackingECOfundBalance,
  loadingGlobalProperties,
  ECOrate,
  EUSDrate,
  ECOrateLoading,
}) => (
  <div className="UserWalletSummary">
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-eCoin UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="eCoin" defaultMessage="eCoin" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.balance)} />
            {' ECO'}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-flashlight_fill UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="ESCOR" defaultMessage="ESCOR" />
      </div>
      <div className="UserWalletSummary__value">
        {loading || loadingGlobalProperties ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber
              value={parseFloat(
                formatter.ESCORinECOvalue(
                  user.ESCOR,
                  totalESCOR,
                  ESCORbackingECOfundBalance,
                ),
              )}
            />
            {' ePOWER '}
            {getFormattedTotalDelegatedESCOR(user, totalESCOR, ESCORbackingECOfundBalance)}
          </span>
        )}
      </div>
    </div>
    <div className="UserWalletSummary__item">
      <i className="iconfont icon-Dollar UserWalletSummary__icon" />
      <div className="UserWalletSummary__label">
        <FormattedMessage id="EUSD" defaultMessage="EUSD" />
      </div>
      <div className="UserWalletSummary__value">
        {loading ? (
          <Loading />
        ) : (
          <span>
            <FormattedNumber value={parseFloat(user.EUSDbalance)} />
            {' EUSD'}
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
            <FormattedNumber value={parseFloat(user.ECOsavingsBalance)} />
            {' ECO, '}
            <FormattedNumber value={parseFloat(user.EUSDsavingsBalance)} />
            {' EUSD'}
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
        {loading || loadingGlobalProperties || ECOrateLoading ? (
          <Loading />
        ) : (
          <USDDisplay
            value={calculateEstAccountValue(
              user,
              totalESCOR,
              ESCORbackingECOfundBalance,
              ECOrate,
              EUSDrate,
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
  totalESCOR: PropTypes.string.isRequired,
  ESCORbackingECOfundBalance: PropTypes.string.isRequired,
  ECOrate: PropTypes.number,
  EUSDrate: PropTypes.number,
  loading: PropTypes.bool,
  ECOrateLoading: PropTypes.bool,
};

UserWalletSummary.defaultProps = {
  ECOrate: 1,
  EUSDrate: 1,
  loading: false,
  ECOrateLoading: false,
};

export default UserWalletSummary;
