import { calculateVoteValue } from '../vendor/helpers';

export const getUserRank = ESCOR => {
  let rank = 'Plankton';
  if (ESCOR >=1000000000) {
    rank = 'Whale';
  } else if (ESCOR >=100000000) {
    rank = 'Orca';
  } else if (ESCOR >=10000000) {
    rank = 'Dolphin';
  } else if (ESCOR >=1000000) {
    rank = 'Minnow';
  }
  return rank;
};

export const getUserRankKey = ESCOR => {
  let rank = 'plankton';
  if (ESCOR >=1000000000) {
    rank = 'whale';
  } else if (ESCOR >=100000000) {
    rank = 'orca';
  } else if (ESCOR >=10000000) {
    rank = 'dolphin';
  } else if (ESCOR >=1000000) {
    rank = 'minnow';
  }
  return `rank_${rank}`;
};

export const getTotalESCOR = user =>
  parseFloat(user.ESCOR) +
  parseFloat(user.ESCORreceived) +
  -parseFloat(user.ESCORDelegated);

export const getHasDefaultSlider = user => getTotalESCOR(user) >= 10000000;

export const getVoteValue = (user, recentClaims, rewardBalance, rate, weight = 10000) =>
  calculateVoteValue(
    getTotalESCOR(user),
    parseFloat(recentClaims),
    parseFloat(rewardBalance),
    rate,
    user.voting_power,
    weight,
  );

export default null;
