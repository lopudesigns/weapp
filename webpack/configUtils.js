const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
const path = require('path');

const MATCH_JS = /\.js$/i;
const MATCH_CSS_LESS = /\.(css|less)$/i;
const MATCH_FONTS = /\.(eot|ttf|woff|woff2|svg)(\?.+)?$/;

require('dotenv').config()
const baseDir = path.resolve(__dirname, '..');

const NETWORK = {
	CLIENT_PORT: process.env.CLIENT_PORT || 3456,
	AUTH_SERVER_PORT: process.env.AUTH_SERVER_PORT || 3457,
	CLIENT_PROTOCOL: process.env.CLIENT_PROTOCOL || 'http://',
	AUTH_SERVER_PROTOCOL: process.env.AUTH_SERVER_PROTOCOL || 'http://'
};

const BRAND = {
	BRAND_NAME: 'ezira',
	BRAND_NAME_CAPITALIZED: 'Ezira',
	BRAND_COLOR: 'red'
}

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
    process.env.STEEMCONNECT_CLIENT_ID || 'ezira-app',
  ),
  'process.env.STEEMCONNECT_REDIRECT_URL': JSON.stringify(
    process.env.STEEMCONNECT_REDIRECT_URL || `'http://ezira.src/callback`,
  ),
  'process.env.STEEMCONNECT_HOST': JSON.stringify(
    process.env.STEEMCONNECT_HOST || 'https://v2.steemconnect.com',
  ),
  'process.env.STEEMJS_URL': JSON.stringify(process.env.STEEMJS_URL || 'https://api.steemit.com'),
  'process.env.SIGNUP_URL': JSON.stringify(
    process.env.SIGNUP_URL || 'https://signup.steemit.com/?ref=ezira',
	)
});

const REPLACE_RULES = {
	test: /.*\.(js|css|less|html)$/,
	include: [/src/, /templates/],
	loader: 'string-replace-loader',
	options: {
		multiple: [
			// {
			// 	search: 'CLIENT_PORT',
			// 	replace: NETWORK.CLIENT_PORT,
			// 	flags: 'g'
			// },
			// {
			// 	search: 'CLIENT_PROTOCOL',
			// 	replace: NETWORK.CLIENT_PROTOCOL,
			// 	flags: 'g'
			// },
			// {
			// 	search: 'AUTH_SERVER_PORT',
			// 	replace: NETWORK.AUTH_SERVER_PORT,
			// 	flags: 'g'
			// },
			// {
			// 	search: 'AUTH_SERVER_PROTOCOL',
			// 	replace: NETWORK.AUTH_SERVER_PROTOCOL,
			// 	flags: 'g'
			// },
			{
				search: 'BRAND_NAME_CAPITALIZED',
				replace: BRAND.BRAND_NAME_CAPITALIZED,
				flags: 'g'
			},
			{
				search: 'BRAND_NAME',
				replace: BRAND.BRAND_NAME,
				flags: 'g'
			},
			{
				search: 'BRAND_ICON_CLASS_PREFIX',
				replace: 'ez',
				flags: 'g'
			},
			// {
			// 	search: 'BRAND_COLOR',
			// 	replace: '#ff2020',
			// 	flags: 'g'
			// }
		]
	}
}

module.exports = {
  MATCH_JS,
  MATCH_CSS_LESS,
  MATCH_FONTS,
  POSTCSS_LOADER,
	DEFINE_PLUGIN,
	REPLACE_RULES,
	NETWORK
};
