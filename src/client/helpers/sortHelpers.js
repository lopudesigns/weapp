import formatter from './extraformatter';

export const sortComments = (comments, sortType = 'BEST') => {
  const sortedComments = [...comments];

  const netNegative = a => a.net_rESCOR < 0;
  const totalPayout = a =>
    parseFloat(a.pending_payout_value) +
    parseFloat(a.total_payout_value) +
    parseFloat(a.curator_payout_value);
  const netRESCOR = a => a.net_rESCOR;

  switch (sortType) {
    case 'BEST':
      return sortedComments.sort((a, b) => {
        if (netNegative(a)) {
          return 1;
        } else if (netNegative(b)) {
          return -1;
        }

        const aPayout = totalPayout(a);
        const bPayout = totalPayout(b);

        if (aPayout !== bPayout) {
          return bPayout - aPayout;
        }

        return netRESCOR(b) - netRESCOR(a);
      });
    case 'NEWEST':
      return sortedComments.sort((a, b) => Date.parse(a.created) - Date.parse(b.created)).reverse();
    case 'OLDEST':
      return sortedComments.sort((a, b) => Date.parse(a.created) - Date.parse(b.created));
    case 'AUTHOR_REPUTATION':
      return sortedComments.sort(
        (a, b) =>
          formatter.reputation(b.author_reputation) - formatter.reputation(a.author_reputation),
      );
    default:
      return sortedComments;
  }
};

export const sortVotes = (a, b) => b.rESCOR - a.rESCOR;

export default null;
