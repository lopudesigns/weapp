import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { Carousel } from 'antd';
import './AuthBanner.less';
import './AuthBannerSlider.less';
import Manifest from '../Manifest';

class AuthBanner extends React.Component {
  static SLIDER_CONTENTS = [
    {
      image: '/images/hero-1.svg',
      titleID: 'hero_banner_title_1',
      defaultTitle: 'Write and publish a post on WeYouMe',
      className: 'AuthBannerSlider__image',
      number: 1,
    },
    {
      image: '/images/hero-2.svg',
      titleID: 'hero_banner_title_2',
      defaultTitle: 'The community upvotes your post',
      className: 'AuthBannerSlider__image',
      number: 2,
    },
    {
      image: '/images/hero-3.svg',
      titleID: 'hero_banner_title_3',
      defaultTitle: 'Earn rewards in TME',
      className: 'AuthBannerSlider__image',
      number: 3,
    },
  ];

  static propTypes = {
    visible: PropTypes.bool,
    onCloseClick: PropTypes.func,
  };

  static defaultProps = {
    visible: true,
    onCloseClick: () => {},
  };

  render() {
    const { onCloseClick, visible } = this.props;
    if (!visible) return null;

    return (
      <div className="AuthBanner">
        {/* <a onClick={onCloseClick} role="button" tabIndex="0" className="AuthBanner__close">
          <i className="iconfont icon-close" />
        </a> */}
        <div className="AuthBanner__container">
          <div className="AuthBanner__content-container">
						<div className="AuthBanner__content-positioner">
							<div className="AuthBanner__content">
								<div className="AuthBanner__content__description">
									{/* <div className="AuthBanner__content__number">2</div> */}
									<div className="AuthBanner__content__title">
										<FormattedMessage
											id="welcome_message"
											defaultMessage="WeYouMe helps you connect and share with the people in your life."
										/>
									</div>
								</div>
								<img
									src="/images/wymNetwork.png"
									className="wymNetwork"
									alt="WeYouMe helps you connect and share with the people in your life."
								></img>
							</div>
              {/* <img
                src="/images/hero-2.svg"
                className="AuthBanner__content__image"
                alt="The community upvotes your post"
              /> */}
            </div>
            <div className="AuthBanner__content-positioner">
							<div className="AuthBanner__content">
								<div className="AuthBanner__content__description">
									<div className="AuthBanner__content__title createAnAccount">
										<FormattedMessage
											id="create_an_account"
											defaultMessage="Create an account"
										/>
									</div>
								</div>
								<div className="AuthBanner__content__description">
									<div className="AuthBanner__content__title createAnAccountSubtitle">
										<FormattedMessage
											id="prettyMuchFree"
											defaultMessage="It's pretty much free"
										/>
									</div>
								</div>
								<Manifest></Manifest>
							</div>
            </div>
          </div>
          <div className="AuthBannerSlider__container">
            {/* <Carousel effect="fade" autoplay autoplaySpeed={8000}>
              {_.map(AuthBanner.SLIDER_CONTENTS, slide => (
                <div key={slide.titleID}>
                  <div className="AuthBannerSlider">
                    <div className={slide.className}>
                      <img src={slide.image} alt={slide.titleID} />
                    </div>
                    <div className="AuthBannerSlider__content">
                      <div className="AuthBannerSlider__content__number">{slide.number}</div>
                      <div className="AuthBannerSlider__content__title">
                        <FormattedMessage id={slide.titleID} defaultMessage={slide.defaultTitle} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
						 */}
          </div>
        </div>
      </div>
    );
  }
}

export default AuthBanner;
