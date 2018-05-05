const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV !== 'production';

const MATCH_JS = /\.js$/i;
const MATCH_CSS_LESS = /\.(css|less)$/i;
const MATCH_FONTS = /\.(eot|ttf|woff|woff2|svg)(\?.+)?$/;

require('dotenv').config()

const HTTP = {
	CLIENT_PORT: process.env.CLIENT_PORT || 3456,
	AUTH_SERVER_PORT: process.env.AUTH_SERVER_PORT || 3457,
	CLIENT_PROTOCOL: process.env.CLIENT_PROTOCOL || 'http://',
	AUTH_SERVER_PROTOCOL: process.env.AUTH_SERVER_PROTOCOL || 'http://'
};

const POSTCSS_LOADER = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
      }),
    ],
  },
};

const DEFINE_PLUGIN = new webpack.DefinePlugin({
  'process.env.NODE_ENV': isDevelopment
    ? JSON.stringify('development')
    : JSON.stringify('production'),
  'process.env.STEEMCONNECT_CLIENT_ID': JSON.stringify(
    process.env.STEEMCONNECT_CLIENT_ID || 'busy.app',
  ),
  'process.env.STEEMCONNECT_REDIRECT_URL': JSON.stringify(
    process.env.STEEMCONNECT_REDIRECT_URL || `${HTTP.CLIENT_PROTOCOL}localhost:${HTTP.CLIENT_PORT}/callback`,
  ),
  'process.env.STEEMCONNECT_HOST': JSON.stringify(
    process.env.STEEMCONNECT_HOST || 'https://steemconnect.com',
  ),
  'process.env.STEEMJS_URL': JSON.stringify(process.env.STEEMJS_URL || 'https://api.steemit.com'),
  'process.env.SIGNUP_URL': JSON.stringify(
    process.env.SIGNUP_URL || 'https://signup.steemit.com/?ref=busy',
  ),
});

module.exports = {
  MATCH_JS,
  MATCH_CSS_LESS,
  MATCH_FONTS,
  POSTCSS_LOADER,
	DEFINE_PLUGIN,
	HTTP
};
