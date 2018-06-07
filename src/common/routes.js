import {
	Redirect
} from "react-router/es";

import Wrapper from '../client/Wrapper';

import Bookmarks from '../client/bookmarks/Bookmarks';
import Drafts from '../client/post/Write/Drafts';
import Replies from '../client/replies/Replies';
import Activity from '../client/activity/Activity';
import Wallet from '../client/wallet/Wallet';
import Editor from '../client/post/Write/Write';
import Settings from '../client/settings/Settings';
import ProfileSettings from '../client/settings/ProfileSettings';
import Invite from '../client/invite/Invite';
import User from '../client/user/User';
import UserProfile from '../client/user/UserProfile';
import UserComments from '../client/user/UserComments';
import UserFollowers from '../client/user/UserFollowers';
import UserFollowing from '../client/user/UserFollowing';
import UserReblogs from '../client/user/UserReblogs';
import UserFeed from '../client/user/UserFeed';
import UserWallet from '../client/user/UserWallet';
import UserActivity from '../client/activity/UserActivity';
import Post from '../client/post/Post';
import Page from '../client/feed/Page';
import Discover from '../client/discover/Discover';
import Search from '../client/search/Search';
import Notifications from '../client/notifications/Notifications';
import Error404 from '../client/statics/Error404';
import ExitPage from '../client/statics/ExitPage';


// Exchange
import App from "../exchange/App.jsx";

// Components imported here for react hot loader (does not work with async route loading)
import DashboardPage from "../exchange/components/Dashboard/DashboardPage";
import DashboardAccountsOnly from "../exchange/components/Dashboard/DashboardAccountsOnly";
import Witnesses from "../exchange/components/Explorer/Witnesses";
import CommitteeMembers from "../exchange/components/Explorer/CommitteeMembers";
import FeesContainer from "../exchange/components/Explorer/FeesContainer";
import BlocksContainer from "../exchange/components/Explorer/BlocksContainer";
import AssetsContainer from "../exchange/components/Explorer/AssetsContainer";
import AccountsContainer from "../exchange/components/Explorer/AccountsContainer";
import Explorer from "components/Explorer/Explorer";
import AccountPage from "../exchange/components/Account/AccountPage";
import AccountOverview from "../exchange/components/Account/AccountOverview";
import AccountAssets from "../exchange/components/Account/AccountAssets";
import {AccountAssetCreate} from "../exchange/components/Account/AccountAssetCreate";
import AccountAssetUpdate from "../exchange/components/Account/AccountAssetUpdate";
import AccountMembership from "../exchange/components/Account/AccountMembership";
import AccountVesting from "../exchange/components/Account/AccountVesting";
import AccountDepositWithdraw from "../exchange/components/Account/AccountDepositWithdraw";
import AccountPermissions from "../exchange/components/Account/AccountPermissions";
import AccountWhitelist from "../exchange/components/Account/AccountWhitelist";
import AccountVoting from "../exchange/components/Account/AccountVoting";
import Page404 from "../exchange/components/Page404/Page404";
// import AccountOrders from "../exchange/components/Account/AccountOrders";
import AccountSignedMessages from "../exchange/components/Account/AccountSignedMessages";
import ExchangeContainer from "../exchange/components/Exchange/ExchangeContainer";
import MarketsContainer from "../exchange/components/Explorer/MarketsContainer";
import Transfer from "../exchange/components/Transfer/Transfer";
import SettingsContainer from "../exchange/components/Settings/SettingsContainer";
import BlockContainer from "../exchange/components/Blockchain/BlockContainer";
import Asset from "../exchange/components/Blockchain/Asset";
import CreateAccount from "../exchange/components/Account/CreateAccount";
import CreateAccountPassword from "../exchange/components/Account/CreateAccountPassword";
import {
    ExistingAccount,
    ExistingAccountOptions
} from "../exchange/components/Wallet/ExistingAccount";
import {
    WalletCreate,
    CreateWalletFromBrainkey
} from "../exchange/components/Wallet/WalletCreate";
import ImportKeys from "../exchange/components/Wallet/ImportKeys";
import Invoice from "../exchange/components/Transfer/Invoice";
import {BackupCreate, BackupRestore} from "../exchange/components/Wallet/Backup";
import WalletChangePassword from "../exchange/components/Wallet/WalletChangePassword";
import {
    WalletManager,
    WalletOptions,
    ChangeActiveWallet,
    WalletDelete
} from "../exchange/components/Wallet/WalletManager";
import BalanceClaimActive from "../exchange/components/Wallet/BalanceClaimActive";
import BackupBrainkey from "../exchange/components/Wallet/BackupBrainkey";
import Brainkey from "../exchange/components/Wallet/Brainkey";
import News from "../exchange/components/News";
import Help from "../exchange/components/Help";
import InitError from "../exchange/components/InitError";
import LoginSelector from "../exchange/components/LoginSelector";
import CreateWorker from "../exchange/components/Account/CreateWorker";

const routes = [
  {
    component: Wrapper,
    routes: [
      {
        path: '/bookmarks',
        exact: true,
        component: Bookmarks,
      },
      {
        path: '/drafts',
        exact: true,
        component: Drafts,
      },
      {
        path: '/replies',
        exact: true,
        component: Replies,
      },
      {
        path: '/activity',
        exact: true,
        component: Activity,
      },
      {
        path: '/wallet',
        exact: true,
        component: Wallet,
      },
      {
        path: '/editor',
        component: Editor,
      },
      {
        path: '/settings',
        exact: true,
        component: Settings,
      },
      {
        path: '/edit-profile',
        exact: true,
        component: ProfileSettings,
      },
      {
        path: '/invite',
        exact: true,
        component: Invite,
      },
      {
        path: '/notifications',
        exact: true,
        component: Notifications,
      },
      {
        path: '/@:name/(comments|followers|followed|reblogs|feed|transfers|activity)?',
        component: User,
        exact: true,
        routes: [
          {
            path: '/@:name',
            exact: true,
            component: UserProfile,
          },
          {
            path: '/@:name/comments',
            exact: true,
            component: UserComments,
          },
          {
            path: '/@:name/followers',
            exact: true,
            component: UserFollowers,
          },
          {
            path: '/@:name/followed',
            exact: true,
            component: UserFollowing,
          },
          {
            path: '/@:name/reblogs',
            exact: true,
            component: UserReblogs,
          },
          {
            path: '/@:name/feed',
            exact: true,
            component: UserFeed,
          },
          {
            path: '/@:name/transfers',
            exact: true,
            component: UserWallet,
          },
          {
            path: '/@:name/activity',
            exact: true,
            component: UserActivity,
          },
        ],
      },
      {
        path: '/discover',
        exact: true,
        component: Discover,
      },
      {
        path: '/:category?/@:author/:permlink',
        component: Post,
      },
      {
        path: '/search',
        component: Search,
      },
      {
        path: '/exit',
        component: ExitPage,
      },
      {
        path: '/:sortBy(trending|created|active|hot|promoted)/:category?',
        component: Page,
      },
      {
        path: '/',
        exact: true,
        component: Page,
			},
			// Exchange routes
			// {
			// 	path: "/exchange",
			// 	component: App,
			// },
			// {
			// 	path: "/exchange",
			// 	component: DashboardPage,
			// 	routes: [
			// 		{
			// 			path: "/exchange/auth/:data", 
			// 			component: Auth 
			// 		},
			// 		{
			// 			path: "explorer", 
			// 			component: Explorer 
			// 		},
			// 		{
			// 			path: "/exchange/explorer/fees", 
			// 			component: FeesContainer 
			// 		},
			// 		{
			// 			path: "/exchange/explorer/blocks", 
			// 			component: BlocksContainer 
			// 		},
			// 		{
			// 			path: "/exchange/explorer/assets", 
			// 			component: AssetsContainer 
			// 		},
			// 		{
			// 			path: "/exchange/explorer/accounts", 
			// 			component: AccountsContainer 
			// 		},
			// 		{
			// 			path: "/exchange/explorer/witnesses", 
			// 			component: Witnesses 
			// 		},
			// 		{
			// 			path: "/exchange/explorer/committee-members", 
			// 			component: CommitteeMembers 
			// 		},
			// 		{
			// 			path: "/exchange/wallet", 
			// 			component: WalletManager,
			// 			routes: [
			// 				{
			// 					path: "/exchange/wallet/change", 
			// 					component: ChangeActiveWallet 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/change-password", 
			// 					component: WalletChangePassword 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/import-keys", 
			// 					component: ImportKeys 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/brainkey", 
			// 					component: ExistingAccountOptions 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/create", 
			// 					component: WalletCreate 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/delete", 
			// 					component: WalletDelete 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/backup/restore", 
			// 					component: BackupRestore 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/backup/create", 
			// 					component: BackupCreate 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/backup/brainkey", 
			// 					component: BackupBrainkey 
			// 				},
			// 				{
			// 					path: "/exchange/wallet/balance-claims", 
			// 					component: BalanceClaimActive 
			// 				},
			// 			]
			// 		},
			// 		{
			// 			path: '/wallet',
			// 			component: WalletOptions
			// 		},
			// 		{
			// 			path: "/exchange/create-wallet", 
			// 			component: WalletCreate 
			// 		},
			// 		{
			// 			path: "/exchange/create-wallet-brainkey", 
			// 			component: CreateWalletFromBrainkey 
			// 		},
			// 		{
			// 			path: "/exchange/transfer", 
			// 			component: Transfer 
			// 		},
			// 		{
			// 			path: "/exchange/invoice/:data", 
			// 			component: Invoice 
			// 		},
			// 		{
			// 			path: "/exchange/explorer/markets", 
			// 			component: MarketsContainer 
			// 		},
			// 		{
			// 			path: "/exchange/market/:marketID", 
			// 			component: ExchangeContainer 
			// 		},
			// 		{
			// 			path: "/exchange/settings", 
			// 			component: SettingsContainer 
			// 		},
			// 		{
			// 			path: "/exchange/settings/:tab", 
			// 			component: SettingsContainer 
			// 		},
			// 		{
			// 			path: "/exchange/block/:height", 
			// 			component: BlockContainer 
			// 		},
			// 		{
			// 			path: "/exchange/asset/:symbol", 
			// 			component: Asset 
			// 		},
			// 		{
			// 			path: "/exchange/create-account", 
			// 			component: LoginSelector,						
			// 			routes: [
			// 				{
			// 					path: "/exchange/create-account/wallet", 
			// 					component: CreateAccount 
			// 				},
			// 				{
			// 					path: "/exchange/create-account/password", 
			// 					component: CreateAccountPassword 
			// 				},
			// 			]
			// 		},
			// 		{
			// 			path: "/exchange/existing-account", 
			// 			component: ExistingAccount,					
			// 			routes: [
			// 				{
			// 					path: "/exchange/existing-account/import-backup", 
			// 					component: ExistingAccountOptions 
			// 				},
			// 				{
			// 					path: "/exchange/existing-account/import-keys", 
			// 					component: ImportKeys 
			// 				},
			// 				{
			// 					path: "/exchange/existing-account/brainkey", 
			// 					component: Brainkey 
			// 				},
			// 				{
			// 					path: "/exchange/existing-account/balance-claim", 
			// 					component: BalanceClaimActive 
			// 				},
			// 			]
			// 		},
			// 		{
			// 			path: "/exchange/existing-account",
			// 			component: BackupRestore
			// 		},
			// 		{
			// 			path: "/exchange/accounts", 
			// 			component: DashboardAccountsOnly 
			// 		},
			// 		{
			// 			path: "/exchange/account/:account_name", 
			// 			component: AccountPage,
			// 			routes: [
			// 				{
			// 					path: "/exchange/account/:account_name/assets", 
			// 					component: AccountAssets 
			// 				},
			// 				{
			// 					path: "/exchange/account/:account_name/create-asset", 
			// 					component: AccountAssetCreate 
			// 				},
			// 				{
			// 					path: "/exchange/account/:account_name/update-asset/:asset", 
			// 					component: AccountAssetUpdate 
			// 				},
			// 				{
			// 					path: "/exchange/account/:account_name/member-stats", 
			// 					component: AccountMembership 
			// 				},
			// 				{
			// 					path: "/exchange/account/:account_name/vesting", 
			// 					component: AccountVesting 
			// 				},
			// 				{
			// 					path: "/exchange/account/:account_name/permissions", 
			// 					component: AccountPermissions 
			// 				},
			// 				{
			// 					path: "/exchange/account/:account_name/voting", 
			// 					component: AccountVoting 
			// 				},
			// 				{
			// 					path: "/exchange/account/:account_name/whitelist", 
			// 					component: AccountWhitelist 
			// 				},
			// 				{
			// 					path: "/exchange/account/:account_name/signedmessages", 
			// 					component: AccountSignedMessages 
			// 				},
			// 				{ 
			// 					path: "/exchange/account/:account_name/overview",
			// 					component: (props) => <Redirect to={"/exchange/account/"+props.match.params.account_name} />
			// 				},
			// 				{ 
			// 					path: "/exchange/account/:account_name/dashboard",
			// 					component: (props) => <Redirect to={"/exchange/account/"+props.match.params.account_name} />
			// 				},
			// 				{ 
			// 					path: "/exchange/account/:account_name/orders",
			// 					component: (props) => <Redirect to={"/exchange/account/"+props.match.params.account_name} />
			// 				},
			// 			]					
			// 		},
			// 		{
			// 			path: "/exchange/account/:account_name", 
			// 			component: AccountOverview						
			// 		},
			// 		{
			// 			path: "/exchange/deposit-withdraw", 
			// 			component: AccountDepositWithdraw 
			// 		},
			// 		{
			// 			path: "/exchange/create-worker", 
			// 			component: CreateWorker 
			// 		},
			// 		{
			// 			path: "/exchange/init-error", 
			// 			component: InitError 
			// 		},
			// 		{
			// 			path: "/exchange/news", 
			// 			component: News 
			// 		},
			// 		{
			// 			path: "/exchange/help", 
			// 			component: Help,
			// 			routes: [
			// 				{
			// 					path: "/exchange/help/:path1", 
			// 					component: Help,
			// 					routes: [
			// 						{
			// 							path: "/exchange/help/:path1/:path2", 
			// 							component: Help,								
			// 							routes: [
			// 								{
			// 									path: "/exchange/help/:path1/:path2/:path3", 
			// 									component: Help 
			// 								}
			// 							]
			// 						},
			// 					]						
			// 				},
			// 			]			
			// 		},
			// 		{
			// 			path: "/exchange/*", 
			// 			component: Page404 
			// 		},
			// 	]
			// },
      {
        path: '*',
        component: Error404,
      }
    ]
  }
];

export default routes;
