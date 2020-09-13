module.exports = env => {

  //определям mode исходя из значения из package.json
  const mode = env.MODE;
  const isDev = env.MODE === 'dev';
  const isBuild = env.MODE === 'build';

  //подключаем плагины
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const {CleanWebpackPlugin} = require('clean-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  const TerserWebpackPlugin = require('terser-webpack-plugin');

  const sourceMap = (isDev) ? 'source-map' : 'none';
  const htmlCollapseWhitespace = (isDev) ? false : true;

  return {
    //точка входа
    entry: {
      //в проде нужен бабел?
      main: ['@babel/polyfill', './src/index.js'],
    },
    //выход кода в:
    output: {
      filename: 'js/[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      //объеденить дубли зависимостей, если они подключены в разных чанках
      splitChunks: {
        chunks: 'all'
      }
    },
    devServer: {
      port: 4200,
      // hot: isDev
    },
    //сорс мапа
    devtool: sourceMap,
    //инициализируем плагины
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        //прокинуть переменную в html
        templateParameters: {
          mode: mode,
        },
        minify: {
          //сжать html
          collapseWhitespace: htmlCollapseWhitespace
        }
      }),
      new CleanWebpackPlugin({
        //лог в консоль
        verbose: true,
      }),
      new MiniCssExtractPlugin({
        filename: './styles/[name].css',
      }),
      //TODO переписать с условием от mode чтобы не ставить руками
      //new OptimizeCssAssetsPlugin(), //только в прод
      //new TerserWebpackPlugin() //только в прод
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                //в дев
                // hmr: true,
                // reloadAll: true
              }
            },
            'css-loader'
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ]
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif|woff2)$/,
          exclude: /node_modules/,
          loader: 'file-loader'
        }

      ]
    }
  }
}