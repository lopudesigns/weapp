import BlockchainAPI from '../blockchainAPI';
import { jsonParse } from '../helpers/formatter';
import * as accountHistoryConstants from '../../common/constants/accountHistory';

/** *
 * Get the path from URL and the API object and return the correct API call based on path
 * @param path - as in URL like 'trending'
 * @param API - the { api } from an npm package
 * @param query {Object} - the same query sending to Blockchain API
 * @param blockchainAPI - The same giving to Blockchain API
 * @returns {function}
 */
export function getDiscussionsFromAPI(sortBy, query, blockchainAPI) {
  switch (sortBy) {
    case 'feed':
    case 'hot':
    case 'created':
    case 'active':
    case 'trending':
    case 'blog':
    case 'comments':
		case 'promoted':
			console.log(`getting get_discussions_by_${sortBy}`)
			console.log(`query`, [query])
			var ret = blockchainAPI.sendAsync(`get_discussions_by_${sortBy}`, [query])
			.catch(err=>{console.error('err', err)});
			return ret
    default:
      throw new Error('There is not API endpoint defined for this sorting');
  }
}

export const getAccount = username =>
  BlockchainAPI.sendAsync('get_accounts', [[username]]).then(result => {
    if (result.length) {
      const userAccount = result[0];
      userAccount.json = jsonParse(result[0].json);
      return userAccount;
    }
    throw new Error('User Not Found');
  }).catch(err=>{console.error('err', err)});

export const getFollowingCount = username =>
  BlockchainAPI.sendAsync('call', ['follow_api', 'get_follow_count', [username]]).catch(err=>{console.error('err', err)});

export const getAccountWithFollowingCount = username =>
  Promise.all([getAccount(username), getFollowingCount(username)]).then(([account, following]) => ({
    ...account,
    following_count: following.following_count,
    follower_count: following.follower_count,
  }));

export const getFollowing = (username, startForm = '', type = 'blog', limit = 100) =>
  BlockchainAPI.sendAsync('call', [
    'follow_api',
    'get_following',
    [username, startForm, type, limit],
  ]).then(result => result.map(user => user.following)).catch(err=>{console.error('err', err)});

export const getFollowers = (username, startForm = '', type = 'blog', limit = 100) =>
  BlockchainAPI.sendAsync('call', [
    'follow_api',
    'get_followers',
    [username, startForm, type, limit],
  ]).then(result => result.map(user => user.follower)).catch(err=>{console.error('err', err)});

export const getAllFollowing = username =>
  new Promise(async resolve => {
    const following = await getFollowingCount(username);
    const chunkSize = 100;
    const limitArray = Array.fill(
      Array(Math.ceil(following.following_count / chunkSize)),
      chunkSize,
    );
    const list = limitArray.reduce(async (currentListP, value) => {
      const currentList = await currentListP;
      const startForm = currentList[currentList.length - 1] || '';
      const followers = await getFollowing(username, startForm, 'blog', value);
      return currentList.slice(0, currentList.length - 1).concat(followers);
    }, []);
    resolve(list);
  });

export const defaultAccountLimit = 500;

export const getAccountHistory = (account, from = -1, limit = defaultAccountLimit) =>
  BlockchainAPI.sendAsync('get_account_history', [account, from, limit]).catch(err=>{console.error('err', err)});

export const getDynamicGlobalProperties = () =>
  BlockchainAPI.sendAsync('get_dynamic_global_properties', []).catch(err=>{console.error('err', err)});

export const isWalletTransaction = actionType =>
  actionType === accountHistoryConstants.TRANSFER ||
  actionType === accountHistoryConstants.transferTMEtoSCOREfund ||
  actionType === accountHistoryConstants.cancelTransferFromSavings ||
  actionType === accountHistoryConstants.transferFromSavings ||
  actionType === accountHistoryConstants.transferToSavings ||
  actionType === accountHistoryConstants.delegateSCORE ||
  actionType === accountHistoryConstants.claimRewardBalance;

export const getAccountReputation = (name, limit = 20) =>
  BlockchainAPI.sendAsync('call', ['follow_api', 'get_account_reputations', [name, limit]]).catch(err=>{console.error('err', err)});

export const getAllSearchResultPages = search => {
  const promises = [];

  for (let i = 0; i <= 10; i += 1) {
    // promises.push(
    //   fetch(`https://api.asksteem.com/search?q=${search}&types=post&pg=${i}`).then(res =>
    //     res.json(),
    //   ),
    // );
  }

  return Promise.all(promises);
};

export const currentUserFollowersUser = (currentUsername, username) =>
  BlockchainAPI.sendAsync('call', [
    'follow_api',
    'get_following',
    [username, currentUsername, 'blog', 1],
  ]).catch(err=>{console.error('err', err)});
