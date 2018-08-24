export const accountCreate = 'accountCreate';
export const accountCreateWithDelegation = 'accountCreateWithDelegation';
export const VOTE = 'vote';
export const accountUpdate = 'accountUpdate';
export const COMMENT = 'comment';
export const deleteComment = 'deleteComment';
export const customJson = 'customJson';
export const FOLLOW = 'follow';
export const REBLOG = 'reblog';
export const curationReward = 'curationReward';
export const authorReward = 'authorReward';
export const accountWitnessVote = 'accountWitnessVote';
export const fillESCORWithdraw = 'fillESCORWithdraw';

// Wallet Action Types
export const TRANSFER = 'transfer';
export const transferECOtoESCORfund = 'transferECOtoESCORfund';
export const cancelTransferFromSavings = 'cancelTransferFromSavings';
export const transferFromSavings = 'transferFromSavings';
export const transferToSavings = 'transferToSavings';
export const delegateESCOR = 'delegateESCOR';
export const claimRewardBalance = 'claimRewardBalance';

// Filter Types - General
export const DOWNVOTED = 'downvoted';
export const UPVOTED = 'upvoted';
export const UNVOTED = 'unvoted';
export const FOLLOWED = 'followed';
export const UNFOLLOWED = 'unfollowed';
export const REPLIED = 'replied';
export const REBLOGGED = 'reblogged';

// Filter Types - Finance
export const POWERED_UP = 'powered_up';
export const RECEIVED = 'received';
export const TRANSFERRED = 'transferred';
export const SAVINGS = 'savings';
export const CLAIM_REWARDS = 'claim_rewards';

export const PARSED_PROPERTIES = [
  accountCreate,
  accountCreateWithDelegation,
  VOTE,
  COMMENT,
  customJson,
  curationReward,
  authorReward,
  TRANSFER,
  transferECOtoESCORfund,
  cancelTransferFromSavings,
  transferFromSavings,
  transferToSavings,
  delegateESCOR,
  claimRewardBalance,
  accountWitnessVote,
  fillESCORWithdraw,
];
