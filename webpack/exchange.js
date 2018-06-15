var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Clean = require("clean-webpack-plugin");
var git = require("git-rev-sync");
const autoprefixer = require('autoprefixer');
require("es6-promise").polyfill();
const CopyWebpackPlugin = require("copy-webpack-plugin");
var locales = require("../src/exchange/assets/locales");

/*
 * For staging builds, set the version to the latest commit hash, for
 * production set it to the package version
 */
var __VERSION__ =
  git.branch() === "staging" ?
  git.short() :
  require("../package.json").version;

// BASE APP DIR
var root_dir = path.resolve(__dirname, '..');

module.exports = function (env) {
	var config = {
		root_dir
	}
	
  // STYLE LOADERS
  var cssLoaders = [
		{
			loader: "style-loader",
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
    },
    {
			loader: "css-loader",
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
    },
    {
			loader: "postcss-loader",
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
      options: {
        ident: 'postcss',
        plugins: () => [
          autoprefixer({
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          }),
        ],
      },
      // config: { 
      // 	path: '../src/exchange/postcss.config.js' 
      // }
    }
  ];

  var scssLoaders = [{
			loader: "style-loader",
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
    },
    {
			loader: "css-loader",
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
    },
    {
			loader: "postcss-loader",
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
      options: {
        ident: 'postcss',
        plugins: () => [
          autoprefixer({
            browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          }),
        ],
      },
      // config: { 
      // 	path: '../src/exchange/postcss.config.js' 
      // }
    },
    {
			loader: "sass-loader",
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
      options: {
        outputStyle: "expanded"
      }
    }
  ];

  // COMMON plugins
  const baseUrl = env.electron ? "./" : "baseUrl" in env ? env.baseUrl : "/";

  /*
   * moment and react-intl include tons of locale files, use a regex and
   * ContextReplacementPlugin to only include certain locale files
   */
  let regexString = "";
  locales.forEach((l, i) => {
    regexString = regexString + (l + (i < locales.length - 1 ? "|" : ""));
  });
  const localeRegex = new RegExp(regexString);

  config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      APP_VERSION: JSON.stringify(__VERSION__),
      __ELECTRON__: !!env.electron,
      __HASH_HISTORY__: !!env.hash,
      __BASE_URL__: JSON.stringify(baseUrl),
      __UI_API__: JSON.stringify(
        env.apiUrl || "https://ui.bitshares.eu/api"
      ),
      __TESTNET__: !!env.testnet,
      __DEPRECATED__: !!env.deprecated,
      DEFAULT_SYMBOL: "BTS",
      __GIT_BRANCH__: JSON.stringify(git.branch())
    }),
    new webpack.ContextReplacementPlugin(
      /moment[\/\\]locale$/,
      localeRegex
    ),
    new webpack.ContextReplacementPlugin(
      /react-intl[\/\\]locale-data$/,
      localeRegex
    ),
    // new CopyWebpackPlugin([
    //     {
    //         from: path.resolve(root_dir, "charting_library"),
    //         to: "charting_library"
    //     }
    // ])
  ];
  if (env.prod) {

    // WRAP INTO CSS FILE
    const extractCSS = new ExtractTextPlugin("app.css");
    cssLoaders = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [{
					loader: "css-loader",
					// include: [
					// 	path.join(root_dir, 'src', 'exchange')
					// ]
        },
        {
					loader: "postcss-loader",
					// include: [
					// 	path.join(root_dir, 'src', 'exchange')
					// ],
          options: {
            ident: 'postcss',
            plugins: () => [
              autoprefixer({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
              }),
            ],
          },
        }
      ]
    });
    scssLoaders = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: [
				{
					loader: "css-loader",
					// include: [
					// 	path.join(root_dir, 'src', 'exchange')
					// ],
        },
        {
					loader: "postcss-loader",
					// include: [
					// 	path.join(root_dir, 'src', 'exchange')
					// ],
          options: {
            ident: 'postcss',
            plugins: () => [
              autoprefixer({
                browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
              }),
            ],
          },
          // config: { 
          // 	path: '../src/exchange/postcss.config.js' 
          // }
        },
        {
					loader: "sass-loader",
					// include: [
					// 	path.join(root_dir, 'src', 'exchange')
					// ],
          options: {
            outputStyle: "expanded"
          }
        }
      ]
    });

    // PROD PLUGINS
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: false
      })
    );
    config.plugins.push(extractCSS);
    config.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      })
    );
  } else {
    // config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("development")
        },
        __DEV__: true
      })
    );
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  // OUTPUT PATH
  var outputPath = path.join(root_dir, "assets");
  config.plugins.push(
    new CopyWebpackPlugin(
      [{
          from: path.join(
            root_dir,
            "src",
            "exchange",
            "assets",
            "locales",
            "*.json"
          ),
          to: path.join(outputPath, "[name].[ext]"),
          toType: "template"
        },
        {
          from: path.join(
            root_dir,
            "src",
            "exchange",
            "common",
            "dictionary_en.json"
          ),
          to: path.join(outputPath, "dictionary.json"),
          toType: "file"
        }
      ], {}
    )
  );

  config.rules = [
		{
      test: /\.jsx$/,
      include: [
        path.join(root_dir, 'src', 'exchange'),
        path.join(
          root_dir,
          'node_modules/react-foundation-apps'
        ),
        path.join(root_dir, 'node_modules/react-stockcharts')
      ],
      use: [{
				loader: 'babel-loader',
        options: {
          cacheDirectory: env.prod ? false : true,
          plugins: ['react-hot-loader/babel']
        }
      }]
    },
    {
      test: /\.js$/,
      include: [
        path.join(root_dir, 'src', 'exchange'),
        path.join(root_dir, 'node_modules/react-datepicker2'),
        path.join(root_dir, 'node_modules/highcharts')
      ],
      use: [{
				loader: 'babel-loader',
        options: {
          compact: false,
          cacheDirectory: env.prod ? false : true,
          plugins: ['react-hot-loader/babel']
        }
      }]
    },
    {
      test: /\.coffee$/,
			loader: 'coffee-loader',
			include: [
				path.join(root_dir, 'src', 'exchange')
			]
    },
    {
      test: /\.(coffee\.md|litcoffee)$/,
			loader: 'coffee-loader?literate',
			include: [
				path.join(root_dir, 'src', 'exchange')
			]
    },
    {
      test: /\.scss$/,
      use: scssLoaders
    },
    {
      test: /\.png$/,
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
      exclude: [
        path.join(root_dir, 'src/exchange/assets/asset-symbols'),
        path.join(
          root_dir,
          'src/exchange/assets/language-dropdown/img'
        )
      ],
      use: [{
				loader: 'url-loader',
        options: {
          limit: 100000
        }
      }]
    },
    {
      test: /\.woff$/,
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
      use: [
				{
					loader: 'url-loader',
					options: {
						limit: 100000,
						mimetype: 'application/font-woff'
					}
				}
			]
    },
    {
      test: /.*\.svg$/,
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
      use: [{
					loader: 'svg-inline-loader'
        },
        {
					loader: 'svgo-loader',
          options: {
            plugins: [{
                cleanupAttrs: true
              },
              {
                removeMetadata: true
              },
              {
                removeXMLNS: true
              },
              {
                removeViewBox: false
              }
            ]
          }
        }
      ]
    },
    {
      test: /\.md/,
			include: [
				path.join(root_dir, 'src', 'exchange')
			],
      use: [{
					loader: 'html-loader',
          options: {
            removeAttributeQuotes: false
          }
        },
        {
					loader: 'markdown-loader',
          options: {}
        }
      ]
    }
  ]
  config.resolve = {
    modules: [
      path.join(root_dir, 'src', 'exchange'),
      // path.join(root_dir, 'src', 'exchange', 'lib'),
      // path.join(root_dir, 'src', 'exchange', 'node_modules'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.coffee', '.json']
  }

  return config;
};
