const path = require('path');
const {
  MATCH_JS,
  MATCH_CSS_LESS,
  MATCH_FONTS,
  DEFINE_PLUGIN,
	POSTCSS_LOADER,
	REPLACE_RULES,
	NETWORK
} = require('./configUtils');

const baseDir = path.resolve(__dirname, '..');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve(baseDir, './src/client/index.js'),
  output: {
    filename: 'bundle.js',
    publicPath: '/js/',
  },
  plugins: [DEFINE_PLUGIN],
  module: {
    rules: [
			REPLACE_RULES,
      {
        test: MATCH_JS,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: MATCH_FONTS,
        loader: 'url-loader',
      },
      {
        test: MATCH_CSS_LESS,
        use: [
          'style-loader',
          'css-loader',
          POSTCSS_LOADER,
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: NETWORK.CLIENT_PORT,
    contentBase: [path.resolve(baseDir, 'templates'), path.resolve(baseDir, 'assets')],
    historyApiFallback: {
      disableDotRule: true,
    },
    proxy: {
      '/callback': `${NETWORK.AUTH_SERVER_PROTOCOL}localhost:${NETWORK.AUTH_SERVER_PORT}`,
      '/i/**': `${NETWORK.AUTH_SERVER_PROTOCOL}localhost:${NETWORK.AUTH_SERVER_PORT}`,
    },
  },
};
