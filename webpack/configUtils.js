const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const paths = require('../scripts/paths');

require('dotenv').config()

const IS_DEV = process.env.NODE_ENV !== 'production';

const SERVER_PORT = process.env.SSR_PORT;
const CONTENT_PORT = IS_DEV ? (parseInt(SERVER_PORT) + 1) : SERVER_PORT;
const MATCH_JS = /\.js$/i;
const MATCH_CSS_LESS = /\.(css|less)$/i;
const MATCH_FONTS = /\.(eot|ttf|woff|woff2|svg)(\?.+)?$/;

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
  'process.env.NODE_ENV': IS_DEV ? JSON.stringify('development') : JSON.stringify('production'),
  'process.env.AUTH_API_CLIENT_ID': JSON.stringify(
    process.env.AUTH_API_CLIENT_ID,
  ),
  'process.env.AUTH_API_REDIRECT_URL': JSON.stringify(
    process.env.AUTH_API_REDIRECT_URL,
  ),
  'process.env.AUTH_URL': JSON.stringify(
    process.env.AUTH_URL,
  ),
  'process.env.API_URL': JSON.stringify(process.env.API_URL),
  'process.env.SIGNUP_URL': JSON.stringify(
    process.env.SIGNUP_URL,
  ),
	'process.env.WSS_API_URL': JSON.stringify(process.env.WSS_API_URL),
	'process.env.MANIFEST_PATH': JSON.stringify(paths.assets),
});

module.exports = {
  SERVER_PORT,
  CONTENT_PORT,
  MATCH_JS,
  MATCH_CSS_LESS,
  MATCH_FONTS,
  POSTCSS_LOADER,
  DEFINE_PLUGIN,
};
