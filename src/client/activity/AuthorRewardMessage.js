import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  injectIntl,
  FormattedMessage
} from 'react-intl';
import {
  Link
} from 'react-router-dom';
import extraformatter from '../helpers/extraformatter';

const AuthorRewardMessage = ({
  actionDetails,
  intl,
  totalESCOR,
  ESCORbackingECOfundBalance,
}) => {
  const rewards = [{
      payout: actionDetails.EUSDpayout,
      currency: 'EUSD',
      extra: ''
    },
    {
      payout: actionDetails.ECOpayout,
      currency: 'ECO',
      extra: ''
    },
    {
      payout: actionDetails.ESCORpayout,
      currency: 'ESCOR',
      extra: ''
    },
  ];

  const parsedRewards = _.reduce(
    rewards,
    (array, reward) => {
      const parsedPayout = parseFloat(reward.payout);

      if (parsedPayout > 0) {
        let rewardsStr;
        if (reward.currency === 'ESCOR') {
          const ESCORrewardInECOvalue = extraformatter.ESCORinECOvalue(
            parsedPayout,
            totalESCOR,
            ESCORbackingECOfundBalance,
          );
          rewardsStr = intl.formatNumber(ESCORrewardInECOvalue, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          });
          // reward.extra = `OR ${ Math.round((100*(reward.payout /  totalESCOR))/100)}% of eScore`
        } else {
          rewardsStr = intl.formatNumber(parsedPayout, {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          });
        }

        array.push(`${rewardsStr} ${reward.currency}${reward.extra}`);
      }

      return array;
    }, [],
  );

  return ( <
    FormattedMessage id = "authorReward_for_post"
    defaultMessage = "Author reward: {rewards} for {author} ({postLink})"
    values = {
      {
        rewards: parsedRewards.join(', '),
        author: actionDetails.author,
        postLink: ( <
          Link to = {
            `/@${actionDetails.author}/${actionDetails.permlink}`
          } > {
            actionDetails.permlink
          } <
          /Link>
        ),
      }
    }
    />
  );
};

AuthorRewardMessage.propTypes = {
  actionDetails: PropTypes.shape().isRequired,
  intl: PropTypes.shape().isRequired,
  totalESCOR: PropTypes.string.isRequired,
  ESCORbackingECOfundBalance: PropTypes.string.isRequired,
};

export default injectIntl(AuthorRewardMessage);
