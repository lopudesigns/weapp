/**
 * Create a regular expressions for filename extensions.
 */


exports.MATCH_CSS_LESS = /.(css|less)$/i;
exports.MATCH_JS_JSX = /.(js|jsx)$/i;
require('dotenv').config()

exports.HTTP = {
	CLIENT_PORT: process.env.CLIENT_PORT || 3456,
	AUTH_SERVER_PORT: process.env.AUTH_SERVER_PORT || 3457,
	CLIENT_PROTOCOL: process.env.CLIENT_PROTOCOL || 'http://',
	AUTH_SERVER_PROTOCOL: process.env.AUTH_SERVER_PROTOCOL || 'http://'
};