import { connect } from 'react-redux';
import AuthBanner from './AuthBanner';
import { getIsAuthenticated, getIsLoaded, getIsBannerClosed } from '../../reducers';
import { closeBanner } from '../../app/appActions';

export default connect(
  state => ({
    visible: !getIsAuthenticated(state) && getIsLoaded(state) && !getIsBannerClosed(state),
  }),
  dispatch => ({
    onCloseClick: () => dispatch(closeBanner()),
  }),
)(AuthBanner);
