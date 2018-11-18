import React from 'react';
import PropTypes from 'prop-types';
import './Avatar.less';
import { connect } from 'react-redux';
import { getAccount } from '../user/usersActions';
const s = require('smarts')()
// import {
// 	getAuthenticatedUser,
// 	getUser
// } from '../reducers';

@connect((state, ownProps) => ({
	// test: 'hmm',
	// testStateValue: state.users,
	// state: state,
	profilePicture: s.getsmart(state, `users.users.${ownProps.username}.json.profile.profile_image`, s.getsmart(state, `users.users.${ownProps.username}`, false) ? 'unset' : undefined),
	// profilePicture: state[`users.${ownProps.username}.json.profile.profile_image`],
	// users: state.users,
	s,
}),{
	getAccount
})
class Avatar extends React.Component {
	
	constructor(props){
		super(props)
		this.getProfilePicture = this.getProfilePicture.bind(this)
	}

	static propTypes = {
		username: PropTypes.any,
		size: PropTypes.number,
		// authenticatedUser: PropTypes.shape(),
	};
	
	static defaultProps = {
		size: 100,
	};

	componentDidMount(){
		if(!this.props.profilePicture && this.props.profilePicture != 'unset'){
			this.props.getAccount(`${this.props.username}`)
		}
	}

	componentDidUpdate(){
		// this.getProfilePicture();
	};

	getProfilePicture = () => {
	};

  render(){
		let { username, size, profilePicture } = this.props;

		let style = {
			minWidth: `${size}px`,
			width: `${size}px`,
			height: `${size}px`,
		};

		const url = getAvatarURL(profilePicture, size);
		
		if (username) {
			style = {
				...style,
				backgroundImage: `url(${url})`,
			};
		}
		return (
			<div className="Avatar" style={style} />
		)
	} 
};
	
export default Avatar;

export function getAvatarURL(profilePicture, size = 100) {

	return (profilePicture && profilePicture !== 'unset') ? ( size > 64
			? `https://steemitimages.com/128x128/${profilePicture}`
			: `https://steemitimages.com/64x64/${profilePicture}`
		) : ( size > 64
			? `https://steemitimages.com/128x128/https://steemitimages.com/DQmb2HNSGKN3pakguJ4ChCRjgkVuDN9WniFRPmrxoJ4sjR4`
			: `https://steemitimages.com/64x64/https://steemitimages.com/DQmb2HNSGKN3pakguJ4ChCRjgkVuDN9WniFRPmrxoJ4sjR4`
		)
}