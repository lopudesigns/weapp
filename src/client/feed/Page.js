import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import { getFeedContent } from './feedActions';
import { getIsLoaded, getIsAuthenticated } from '../reducers';
import SubFeed from './SubFeed';
import AuthBanner from '../components/AuthBanner';
import LeftSidebar from '../app/Sidebar/LeftSidebar';
import RightSidebar from '../app/Sidebar/RightSidebar';
import TopicSelector from '../components/TopicSelector';
import TrendingTagsMenu from '../components/TrendingTagsMenu';
import Affix from '../components/Utils/Affix';
import ScrollToTop from '../components/Utils/ScrollToTop';
import ScrollToTopOnMount from '../components/Utils/ScrollToTopOnMount';
import QuickPostEditor from '../components/QuickPostEditor/QuickPostEditor';
import UserWallet from '../user/UserWallet';
// import Chin from '../components/Chin/Chin'
@connect(state => ({
  authenticated: getIsAuthenticated(state),
  loaded: getIsLoaded(state),
}))
class Page extends React.Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    loaded: PropTypes.bool.isRequired,
    history: PropTypes.shape().isRequired,
    location: PropTypes.shape().isRequired,
    match: PropTypes.shape().isRequired,
  };

  static fetchData({ store, match }) {
		const { sortBy, category } = match.params;
		// if(sortBy=='new') sortBy = 'created'
    return store.dispatch(getFeedContent({ sortBy, category, limit: 10 }));
  }

  handleSortChange = key => {
		// if(key=='new') key = 'created'
    const { category } = this.props.match.params;
    if (category) {
      this.props.history.push(`/${key}/${category}`);
    } else {
      this.props.history.push(`/${key}`);
    }
  };

  handleTopicClose = () => this.props.history.push('/trending');

  render() {
    const { authenticated, loaded, location, match } = this.props;
    const { category, sortBy } = match.params;
		// if(sortBy=='new') sortBy = 'created'
    const shouldDisplaySelector = location.pathname !== '/' || (!authenticated && loaded);
    const displayTopicSelector = location.pathname === '/trending';

    const robots = location.pathname === '/' ? 'index,follow' : 'noindex,follow';

    return (
      <div>
        <Helmet>
          <title>WeYouMe</title>
          <meta name="robots" content={robots} />
        </Helmet>
        <ScrollToTop />
        <ScrollToTopOnMount />
				<AuthBanner />
				
        <div className="shifted">
          <div className="feed-layout container">
            <Affix className="leftContainer" stickPosition={77}>
              <div className="left">
                <LeftSidebar />
              </div>
            </Affix>
            <div className="center">
              {/* {displayTopicSelector && <TrendingTagsMenu />} */}
              {/* {shouldDisplaySelector && (
								<TopicSelector
								isSingle={false}
								sort={sortBy}
								topics={category ? [category] : []}
								onSortChange={this.handleSortChange}
								onTopicClose={this.handleTopicClose}
                />
							)} */}
							<TopicSelector
                  isSingle={false}
                  sort={sortBy}
                  topics={category ? [category] : []}
                  onSortChange={this.handleSortChange}
                  onTopicClose={this.handleTopicClose}
                />
              {authenticated && <QuickPostEditor />}
              <SubFeed />
							{/* <UserWallet isCurrentUser className="userWalletPage"></UserWallet> */}
            </div>
						<Affix className="rightContainer" stickPosition={77}>
							<div className="right">
								<RightSidebar />
							</div>
						</Affix>
          </div>
        </div>
				{/* <Chin/> */}
      </div>
    );
  }
}

export default Page;
