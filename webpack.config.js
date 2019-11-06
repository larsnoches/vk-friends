const path = require('path');

module.exports = {
  entry: './front/index.js',
  output: {
    path: `${__dirname}/widestatic`,
    filename: 'app.js',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.scss'],
    modules: ['node_modules'],
    alias: {
      State: path.resolve(__dirname, 'front/state/'),
      Utilities: path.resolve(__dirname, 'front/utilities/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'front')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[a|c]ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localsConvention: 'camelCaseOnly',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: 'postcss.config.js' },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                indentWidth: 4,
                includePaths: [
                  path.resolve(__dirname, './front'),
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
