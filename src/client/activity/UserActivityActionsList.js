import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserDetailsKey } from '../helpers/stateHelpers';
import {
  getUser,
  getAuthenticatedUser,
  getAuthenticatedUserName,
  getTotalSCORE,
  getSCOREbackingTMEfundBalance,
  getUsersAccountHistory,
  getLoadingMoreUsersAccountHistory,
  getUserHasMoreAccountHistory,
  getAccountHistoryFilter,
  getCurrentDisplayedActions,
  getCurrentFilteredActions,
} from '../reducers';
import { isWalletTransaction } from '../helpers/apiHelpers';
import {
  setInitialCurrentDisplayedActions,
  addMoreActionsToCurrentDisplayedActions,
  loadMoreCurrentUsersActions,
} from '../wallet/walletActions';
import ReduxInfiniteScroll from '../vendor/ReduxInfiniteScroll';
import WalletTransaction from '../wallet/WalletTransaction';
import UserAction from './UserAction';

@withRouter
@connect(
  (state, ownProps) => ({
    user: ownProps.isCurrentUser
      ? getAuthenticatedUser(state)
      : getUser(state, ownProps.match.params.name),
    totalSCORE: getTotalSCORE(state),
    SCOREbackingTMEfundBalance: getSCOREbackingTMEfundBalance(state),
    usersAccountHistory: getUsersAccountHistory(state),
    loadingMoreUsersAccountHistory: getLoadingMoreUsersAccountHistory(state),
    userHasMoreActions: getUserHasMoreAccountHistory(
      state,
      ownProps.isCurrentUser
        ? getAuthenticatedUserName(state)
        : getUser(state, ownProps.match.params.name).name,
    ),
    accountHistoryFilter: getAccountHistoryFilter(state),
    currentDisplayedActions: getCurrentDisplayedActions(state),
    currentFilteredActions: getCurrentFilteredActions(state),
  }),
  {
    setInitialCurrentDisplayedActions,
    addMoreActionsToCurrentDisplayedActions,
    loadMoreCurrentUsersActions,
  },
)
class UserActivityActionsList extends Component {
  static propTypes = {
    userHasMoreActions: PropTypes.bool.isRequired,
    loadingMoreUsersAccountHistory: PropTypes.bool.isRequired,
    setInitialCurrentDisplayedActions: PropTypes.func.isRequired,
    loadMoreCurrentUsersActions: PropTypes.func.isRequired,
    user: PropTypes.shape().isRequired,
    usersAccountHistory: PropTypes.shape().isRequired,
    totalSCORE: PropTypes.string.isRequired,
    SCOREbackingTMEfundBalance: PropTypes.string.isRequired,
    currentDisplayedActions: PropTypes.arrayOf(PropTypes.shape()),
    currentFilteredActions: PropTypes.arrayOf(PropTypes.shape()),
    accountHistoryFilter: PropTypes.arrayOf(PropTypes.string),
    isCurrentUser: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  };

  static defaultProps = {
    accountHistoryFilter: [],
    currentDisplayedActions: [],
    currentFilteredActions: [],
    isCurrentUser: false,
  };

  constructor(props) {
    super(props);
    if (_.isEmpty(props.currentDisplayedActions)) {
      this.props.setInitialCurrentDisplayedActions(props.user.name);
    }
  }

  handleLoadMore = () => {
    const { user } = this.props;
    this.props.loadMoreCurrentUsersActions(user.name);
  };

  render() {
    const {
      usersAccountHistory,
      user,
      totalSCORE,
      SCOREbackingTMEfundBalance,
      userHasMoreActions,
      loadingMoreUsersAccountHistory,
      accountHistoryFilter,
      currentDisplayedActions,
      currentFilteredActions,
    } = this.props;
    const currentUsername = user.name;
    const userKey = getUserDetailsKey(currentUsername);
    const actions = _.get(usersAccountHistory, userKey, []);
    const displayedActions = _.isEmpty(accountHistoryFilter)
      ? currentDisplayedActions
      : currentFilteredActions;
    const hasMore = userHasMoreActions || actions.length !== currentDisplayedActions.length;

    return (
      <ReduxInfiniteScroll
        loadMore={this.handleLoadMore}
        hasMore={hasMore}
        elementIsScrollable={false}
        threshold={200}
        loader={null}
        loadingMore={loadingMoreUsersAccountHistory}
      >
        <div />
        {displayedActions.map(
          action =>
            isWalletTransaction(action.op[0]) ? (
              <WalletTransaction
                key={`${action.trx_id}${action.actionCount}`}
                transaction={action}
                currentUsername={currentUsername}
                totalSCORE={totalSCORE}
                SCOREbackingTMEfundBalance={SCOREbackingTMEfundBalance}
              />
            ) : (
              <UserAction
                key={`${action.trx_id}${action.actionCount}`}
                action={action}
                totalSCORE={totalSCORE}
                SCOREbackingTMEfundBalance={SCOREbackingTMEfundBalance}
                currentUsername={currentUsername}
              />
            ),
        )}
      </ReduxInfiniteScroll>
    );
  }
}

export default UserActivityActionsList;
