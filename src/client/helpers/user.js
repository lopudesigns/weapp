import { calculateVoteValue } from '../vendor/helpers';

export const getUserRank = SCORE => {
  let rank = 'Plankton';
  if (SCORE >=1000000000) {
    rank = 'Whale';
  } else if (SCORE >=100000000) {
    rank = 'Orca';
  } else if (SCORE >=10000000) {
    rank = 'Dolphin';
  } else if (SCORE >=1000000) {
    rank = 'Minnow';
  }
  return rank;
};

export const getUserRankKey = SCORE => {
  let rank = 'plankton';
  if (SCORE >=1000000000) {
    rank = 'whale';
  } else if (SCORE >=100000000) {
    rank = 'orca';
  } else if (SCORE >=10000000) {
    rank = 'dolphin';
  } else if (SCORE >=1000000) {
    rank = 'minnow';
  }
  return `rank_${rank}`;
};

export const getTotalSCORE = user =>
  parseFloat(user.SCORE) +
  parseFloat(user.SCOREreceived) +
  -parseFloat(user.SCOREDelegated);

export const getHasDefaultSlider = user => getTotalSCORE(user) >= 10000000;

export const getVoteValue = (user, recentClaims, rewardBalance, rate, weight = 10000) =>
  calculateVoteValue(
    getTotalSCORE(user),
    parseFloat(recentClaims),
    parseFloat(rewardBalance),
    rate,
    user.voting_power,
    weight,
  );

export default null;
