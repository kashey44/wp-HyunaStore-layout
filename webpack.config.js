const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const miniCss = require('mini-css-extract-plugin');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets/'
  }
const PAGES_DIR = `${PATHS.src}`; //`/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

const moduleRules = [
  {
    test: /\.(s*)css$/,
    use: [
      miniCss.loader,
      'css-loader',
      'sass-loader',
    ]
  },{
    test: /\.svg/,
    type: 'asset/resource'
  },{
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    generator: {
      filename: 'fonts/[name][ext]'
    }
  },{
    test: /\.pug$/,
    use: ['html-loader', 'pug-html-loader'] 
  }
];

const config = {
  entry: '/src/app.js',
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.html',
      assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
      rules: moduleRules
  },
  plugins: [
      ...PAGES.map(page => new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./${page.replace(/\.pug/,'.html')}`
        })),
        new miniCss({
          filename: 'style.css',
        })
  ]
};

module.exports = config;